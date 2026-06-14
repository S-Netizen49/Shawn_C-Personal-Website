'use client'
import { useState, useEffect, useRef } from 'react'

const EXPERIENCE = [
  {
    role: 'Software Developer Intern',
    company: 'Genetec',
    period: 'Jan 2024 – May 2024',
    location: 'Montreal, QC',
    color: '#60a5fa',
    glyph: '⬡',
    type: 'internship',
    tags: ['C#', 'SQL Server', 'AngularJS', 'WPF', 'Microservices', 'BlackDuck'],
    summary: 'Worked on enterprise security software used by thousands of organizations worldwide.',
    bullets: [
      'Engineered a centralized date/time localization service adopted by enterprise clients across multiple software platforms.',
      'Resolved 30+ full-stack contributions using C#, SQL Server, AngularJS, and WPF.',
      'Developed components within a microservices-based distributed system ensuring high availability.',
      'Hardened application security by remediating third-party vulnerabilities flagged by BlackDuck.',
    ],
  },
  {
    role: 'Web Developer Intern',
    company: 'Consoltec',
    period: 'May 2023 – Sep 2023',
    location: 'Montreal, QC',
    color: '#a78bfa',
    glyph: '◈',
    type: 'internship',
    tags: ['ReactJS', 'AngularJS', 'C#', 'SQL', 'XUnit', 'Azure DevOps'],
    summary: 'Built and maintained multi-tenant web portals serving thousands of client users.',
    bullets: [
      'Developed front-end modules in ReactJS and AngularJS integrated with C# backend and SQL databases.',
      'Delivered features and fixed defects for multi-tenant FlowFit portals.',
      'Improved code reliability with XUnit and Moq unit tests, strengthening backend validation.',
    ],
  },
  {
    role: 'Software Consultant',
    company: 'Big Bang 360',
    period: 'Sep 2022 – May 2023',
    location: 'Montreal, QC',
    color: '#4ade80',
    glyph: '◎',
    type: 'contract',
    tags: ['JavaScript', 'Java', 'SuiteScript', 'REST', 'XML', 'SFTP'],
    summary: 'Delivered custom enterprise solutions for client-facing projects as part-time contractor.',
    bullets: [
      'Built enterprise solutions using JavaScript, Java, SuiteScript, REST, XML, and SFTP.',
      'Optimized system performance by debugging and revising implementations, reducing PROD escalations.',
    ],
  },
]

// ── PANEL 0: Genetec — Distributed microservices node graph ─────────────
function GenetecPanel({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    const W = canvas.width = canvas.offsetWidth
    const H = canvas.height = canvas.offsetHeight

    const NODES = [
      { label: 'API Gateway',    x: W*.5,  y: H*.15, r: 22, services: [] as number[] },
      { label: 'Auth',           x: W*.2,  y: H*.38, r: 16, services: [] },
      { label: 'Localization',   x: W*.5,  y: H*.38, r: 20, services: [] },
      { label: 'Security',       x: W*.8,  y: H*.38, r: 16, services: [] },
      { label: 'SQL Server',     x: W*.25, y: H*.65, r: 14, services: [] },
      { label: 'WPF Client',     x: W*.5,  y: H*.72, r: 14, services: [] },
      { label: 'AngularJS',      x: W*.75, y: H*.65, r: 14, services: [] },
    ]
    const EDGES = [[0,1],[0,2],[0,3],[1,4],[2,4],[2,5],[3,6],[2,6]]

    type Packet = { from: number; to: number; t: number; speed: number; active: boolean }
    const packets: Packet[] = EDGES.map(([f,t]) => ({
      from: f, to: t, t: Math.random(), speed: 0.003 + Math.random()*0.004, active: true
    }))

    let pulseT = 0
    function draw() {
      ctx.clearRect(0,0,W,H)
      pulseT += 0.018

      // edges
      EDGES.forEach(([f,t]) => {
        const a = NODES[f], b = NODES[t]
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y)
        ctx.strokeStyle = `${color}22`; ctx.lineWidth = 1; ctx.stroke()
      })

      // packets
      packets.forEach(p => {
        p.t += p.speed; if(p.t > 1) p.t = 0
        const a = NODES[p.from], b = NODES[p.to]
        const x = a.x + (b.x-a.x)*p.t, y = a.y + (b.y-a.y)*p.t
        ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2)
        ctx.fillStyle = color; ctx.fill()
        // tail
        for(let i=1;i<=4;i++){
          const tt = Math.max(0,p.t-i*0.025)
          const tx = a.x+(b.x-a.x)*tt, ty = a.y+(b.y-a.y)*tt
          ctx.beginPath(); ctx.arc(tx,ty,3-i*0.5,0,Math.PI*2)
          ctx.fillStyle = `${color}${Math.floor((4-i)/4*80).toString(16).padStart(2,'0')}`; ctx.fill()
        }
      })

      // nodes
      NODES.forEach((n, i) => {
        const pulse = 1 + Math.sin(pulseT + i) * 0.08
        // glow
        const g = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*2)
        g.addColorStop(0,`${color}33`); g.addColorStop(1,`${color}00`)
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r*2,0,Math.PI*2); ctx.fillStyle=g; ctx.fill()
        // ring
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r*pulse,0,Math.PI*2)
        ctx.strokeStyle=`${color}88`; ctx.lineWidth=1.5; ctx.stroke()
        // fill
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r*pulse,0,Math.PI*2)
        ctx.fillStyle='#03030a'; ctx.fill()
        // label
        ctx.fillStyle = color
        ctx.font = `10px monospace`; ctx.textAlign='center'; ctx.textBaseline='middle'
        ctx.fillText(n.label, n.x, n.y)
      })

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [color])

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: `${color}99`, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
        microservices architecture
      </p>
      <canvas ref={canvasRef} style={{ flex: 1, width: '100%', borderRadius: '8px' }} />
    </div>
  )
}

// ── PANEL 1: Consoltec — React component tree ───────────────────────────
function ConsoltecPanel({ color }: { color: string }) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1200)
    return () => clearInterval(id)
  }, [])

  const TREE = [
    { id: 0, label: '<FlowFit />', depth: 0, parent: -1 },
    { id: 1, label: '<Router />',  depth: 1, parent: 0  },
    { id: 2, label: '<Auth />',    depth: 1, parent: 0  },
    { id: 3, label: '<Dashboard />',depth: 2, parent: 1 },
    { id: 4, label: '<Reports />', depth: 2, parent: 1  },
    { id: 5, label: '<UserCtx />', depth: 2, parent: 2  },
    { id: 6, label: '<Table />',   depth: 3, parent: 3  },
    { id: 7, label: '<Chart />',   depth: 3, parent: 3  },
    { id: 8, label: '<Filter />', depth: 3, parent: 4   },
  ]

  const activeNode = tick % TREE.length

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '10px', color: `${color}99`, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
          component tree
        </p>
        <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#555' }}>re-rendering...</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        {TREE.map((node) => {
          const isActive = node.id === activeNode
          const isParent = TREE.find(n => n.parent === node.id && n.id === activeNode)
          return (
            <div key={node.id} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              paddingLeft: `${node.depth * 20}px`,
              transition: 'all 0.3s',
            }}>
              {node.depth > 0 && <span style={{ color: '#333', fontSize: '10px' }}>{'└─'}</span>}
              <div style={{
                fontFamily: 'monospace', fontSize: '12px', padding: '5px 10px', borderRadius: '5px',
                border: `1px solid ${isActive ? color : isParent ? `${color}44` : 'rgba(255,255,255,0.06)'}`,
                color: isActive ? '#fff' : isParent ? color : '#666',
                background: isActive ? `${color}18` : 'transparent',
                transition: 'all 0.3s',
                boxShadow: isActive ? `0 0 12px ${color}33` : 'none',
              }}>
                {node.label}
              </div>
              {isActive && (
                <span style={{ fontFamily: 'monospace', fontSize: '9px', color: color, animation: 'none' }}>
                  ● render
                </span>
              )}
            </div>
          )
        })}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#555', margin: 0 }}>
          <span style={{ color }}>XUnit</span> · 94% coverage · <span style={{ color: '#4ade80' }}>✓ passing</span>
        </p>
      </div>
    </div>
  )
}

// ── PANEL 2: Big Bang 360 — REST API visualizer ─────────────────────────
function BigBangPanel({ color }: { color: string }) {
  const [logs, setLogs] = useState<{method:string;path:string;status:number;time:number;id:number}[]>([])
  const idRef = useRef(0)

  const CALLS = [
    { method: 'GET',    path: '/api/clients',        status: 200 },
    { method: 'POST',   path: '/api/netsuite/sync',  status: 201 },
    { method: 'PUT',    path: '/api/records/4821',   status: 200 },
    { method: 'GET',    path: '/sftp/export.xml',    status: 200 },
    { method: 'DELETE', path: '/api/cache/flush',    status: 204 },
    { method: 'POST',   path: '/api/suitescript/run',status: 200 },
    { method: 'GET',    path: '/api/clients/887',    status: 404 },
    { method: 'PATCH',  path: '/api/config/locale',  status: 200 },
  ]

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      const call = CALLS[i % CALLS.length]
      setLogs(prev => [{
        ...call,
        time: Math.floor(Math.random()*180+20),
        id: idRef.current++
      }, ...prev].slice(0, 8))
      i++
    }, 900)
    return () => clearInterval(id)
  }, [])

  const METHOD_COLOR: Record<string, string> = {
    GET: '#60a5fa', POST: '#4ade80', PUT: '#f59e0b',
    DELETE: '#f87171', PATCH: '#a78bfa', OPTIONS: '#888',
  }
  const STATUS_COLOR = (s: number) => s < 300 ? '#4ade80' : s < 400 ? '#f59e0b' : '#f87171'

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '10px', color: `${color}99`, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
          api request log
        </p>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'monospace', fontSize: '9px', color: '#4ade80' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
          live
        </span>
      </div>

      {/* header row */}
      <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 48px 54px', gap: '8px', padding: '0 0 6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {['method','endpoint','ms','status'].map(h => (
          <span key={h} style={{ fontFamily: 'monospace', fontSize: '8px', color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
        ))}
      </div>

      {/* log rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', overflowY: 'hidden' }}>
        {logs.map((log, i) => (
          <div key={log.id} style={{
            display: 'grid', gridTemplateColumns: '52px 1fr 48px 54px', gap: '8px',
            padding: '5px 0',
            borderBottom: '1px solid rgba(255,255,255,0.03)',
            opacity: Math.max(0.2, 1 - i * 0.1),
            transition: 'opacity 0.3s',
          }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: METHOD_COLOR[log.method] ?? '#888', fontWeight: 600 }}>
              {log.method}
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#777', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {log.path}
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: log.time > 150 ? '#f59e0b' : '#555' }}>
              {log.time}ms
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: STATUS_COLOR(log.status) }}>
              {log.status}
            </span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px', display: 'flex', gap: '16px' }}>
        {['REST','XML','JSON','SFTP','SuiteScript'].map(t => (
          <span key={t} style={{ fontFamily: 'monospace', fontSize: '9px', color: `${color}88`, letterSpacing: '0.08em' }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

const PANELS = [GenetecPanel, ConsoltecPanel, BigBangPanel]

// ── Main page ────────────────────────────────────────────────────────────
export default function ExperiencePage() {
  const [active, setActive] = useState<number | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)

  const Panel = active !== null ? PANELS[active] : null
  const activeExp = active !== null ? EXPERIENCE[active] : null

  return (
    <div style={{ padding: '100px 40px 80px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '48px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#666', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '12px', marginTop: 0 }}>
          work history
        </p>
        <h1 style={{ fontFamily: 'system-ui, sans-serif', fontSize: '42px', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 12px 0' }}>
          Experience
        </h1>
        <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#777', lineHeight: 1.7, margin: 0 }}>
          Three internships across Montreal's tech scene.{' '}
          <span style={{ color: '#555' }}>Click a card to explore.</span>
        </p>
      </div>

      {/* split layout */}
      <div style={{ display: 'grid', gridTemplateColumns: active !== null ? '1fr 1fr' : '600px 1fr', gap: '24px', alignItems: 'start', transition: 'grid-template-columns 0.4s ease' }}>

        {/* LEFT — cards */}
        <div style={{ position: 'relative' }}>
          {/* timeline */}
          <div style={{
            position: 'absolute', left: '19px', top: '40px', bottom: '40px', width: '1px',
            background: 'linear-gradient(to bottom, #60a5fa44, #a78bfa44, #4ade8044)',
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {EXPERIENCE.map((exp, i) => {
              const isActive = active === i
              const isExpanded = expanded === i
              return (
                <div key={exp.company} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '10px', height: '10px', borderRadius: '50%', background: exp.color,
                    flexShrink: 0, marginTop: '34px', transition: 'box-shadow 0.3s',
                    boxShadow: isActive ? `0 0 16px ${exp.color}cc` : `0 0 8px ${exp.color}55`,
                  }} />
                  <div
                    style={{
                      flex: 1, border: `1px solid ${isActive ? exp.color + '88' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '12px', overflow: 'hidden',
                      background: isActive ? `${exp.color}08` : 'rgba(3,3,10,0.6)',
                      cursor: 'pointer', transition: 'border-color 0.25s, background 0.25s, transform 0.2s',
                      transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                    }}
                    onClick={() => {
                      setActive(active === i ? null : i)
                      setExpanded(expanded === i ? null : i)
                    }}
                  >
                    {/* accent bar */}
                    <div style={{ height: '2px', background: exp.color, width: isActive ? '100%' : '0%', transition: 'width 0.4s ease' }} />

                    <div style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                          <div style={{
                            fontSize: '24px', color: exp.color, lineHeight: 1, flexShrink: 0,
                            transition: 'transform 0.3s',
                            transform: isActive ? 'scale(1.2) rotate(15deg)' : 'scale(1)',
                          }}>{exp.glyph}</div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                              <p style={{ fontFamily: 'monospace', fontSize: '14px', color: '#fff', margin: 0, fontWeight: 600 }}>{exp.role}</p>
                              <span style={{ fontFamily: 'monospace', fontSize: '8px', padding: '2px 7px', border: `1px solid ${exp.color}44`, borderRadius: '20px', color: exp.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{exp.type}</span>
                            </div>
                            <p style={{ fontFamily: 'monospace', fontSize: '12px', color: exp.color, margin: '0 0 4px 0' }}>{exp.company}</p>
                            <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#555', margin: 0 }}>{exp.location}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#666', whiteSpace: 'nowrap' }}>{exp.period}</span>
                          <span style={{ fontFamily: 'monospace', fontSize: '16px', color: isActive ? exp.color : '#444', transition: 'transform 0.3s, color 0.2s', transform: isActive ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                        </div>
                      </div>

                      <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#777', lineHeight: 1.7, margin: '14px 0 0 38px' }}>{exp.summary}</p>

                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '12px', marginLeft: '38px' }}>
                        {exp.tags.map(tag => (
                          <span key={tag} style={{
                            fontFamily: 'monospace', fontSize: '9px', padding: '2px 7px',
                            border: `1px solid ${isActive ? exp.color + '44' : 'rgba(255,255,255,0.07)'}`,
                            borderRadius: '4px', color: isActive ? exp.color : '#555',
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            transition: 'color 0.2s, border-color 0.2s',
                          }}>{tag}</span>
                        ))}
                      </div>

                      {/* expandable bullets */}
                      <div style={{ maxHeight: isExpanded ? '400px' : '0px', overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                        <div style={{ borderTop: `1px solid ${exp.color}22`, marginTop: '16px', paddingTop: '16px', marginLeft: '38px' }}>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {exp.bullets.map((b, bi) => (
                              <li key={bi} style={{ fontFamily: 'monospace', fontSize: '11px', color: '#888', lineHeight: 1.7, display: 'flex', gap: '10px' }}>
                                <span style={{ color: exp.color, flexShrink: 0 }}>→</span>{b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* education */}
          <div style={{ marginTop: '24px', marginLeft: '30px', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ fontSize: '22px', color: '#f59e0b' }}>◑</div>
              <div>
                <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#ddd', margin: '0 0 3px 0', fontWeight: 600 }}>Concordia University</p>
                <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#f59e0b', margin: '0 0 2px 0' }}>B.Sc. Computer Science, CO-OP</p>
                <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#555', margin: 0 }}>Montreal, QC</p>
              </div>
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#555' }}>Sep 2021 – Jun 2025</span>
          </div>
        </div>

        {/* RIGHT — dynamic panel */}
        <div style={{
          position: 'sticky', top: '100px',
          height: '520px',
          border: `1px solid ${activeExp ? activeExp.color + '33' : 'rgba(255,255,255,0.05)'}`,
          borderRadius: '12px',
          padding: '28px',
          background: activeExp ? `${activeExp.color}04` : 'rgba(255,255,255,0.01)',
          transition: 'border-color 0.4s, background 0.4s',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {Panel && activeExp ? (
            <Panel color={activeExp.color} />
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <div style={{ fontSize: '32px', opacity: 0.15 }}>◎</div>
              <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#333', textAlign: 'center', lineHeight: 1.7, margin: 0 }}>
                click an experience<br />to see it come alive
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}