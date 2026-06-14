'use client'
import { useState } from 'react'

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
      'Engineered a centralized date/time localization service adopted by enterprise clients, streamlining temporal data visualization across multiple software platforms.',
      'Enhanced system stability by resolving 30+ technical contributions across the full stack, utilizing C# and SQL Server for backend logic and AngularJS and WPF for frontend interfaces.',
      'Developed and optimized components within a microservices-based, distributed system, ensuring high availability and data consistency.',
      'Hardened application security in an Agile/SCRUM environment by identifying and remediating third-party vulnerabilities flagged by BlackDuck.',
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
      'Developed front-end modules using ReactJS, AngularJS, and JavaScript, integrated with C# backend services and MMSM SQL databases, in an Agile environment within Azure DevOps.',
      'Delivered new features and resolved defects for multi-tenant FlowFit portals serving thousands of client users.',
      'Improved code reliability by implementing unit tests with XUnit and Moq, strengthening backend validation and maintainability.',
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
      'Developed and customized enterprise solutions using JavaScript, Java, HTML, CSS, SuiteScript, REST, XML, JSON, and SFTP for client-facing projects.',
      'Optimized system performance by troubleshooting, debugging, and revising implementations, reducing support escalations on PROD.',
    ],
  },
]

function ExperienceCard({ exp, index }: { exp: typeof EXPERIENCE[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        border: `1px solid ${hovered || expanded ? exp.color + '55' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'border-color 0.25s, transform 0.25s',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        background: expanded ? `${exp.color}06` : 'rgba(3,3,10,0.6)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(e => !e)}
    >
      {/* top accent bar */}
      <div style={{
        height: '2px',
        background: exp.color,
        width: hovered || expanded ? '100%' : '0%',
        transition: 'width 0.4s ease',
      }} />

      {/* card header */}
      <div style={{ padding: '24px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
            {/* glyph */}
            <div style={{
              fontSize: '28px', color: exp.color, lineHeight: 1,
              marginTop: '2px', flexShrink: 0,
              transition: 'transform 0.3s',
              transform: expanded ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
            }}>
              {exp.glyph}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <p style={{ fontFamily: 'monospace', fontSize: '15px', color: '#fff', margin: 0, fontWeight: 600 }}>
                  {exp.role}
                </p>
                <span style={{
                  fontFamily: 'monospace', fontSize: '9px', padding: '2px 8px',
                  border: `1px solid ${exp.color}44`, borderRadius: '20px',
                  color: exp.color, letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  {exp.type}
                </span>
              </div>
              <p style={{ fontFamily: 'monospace', fontSize: '13px', color: exp.color, margin: '0 0 6px 0' }}>
                {exp.company}
              </p>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#555', margin: 0 }}>
                {exp.location}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#666', whiteSpace: 'nowrap' }}>
              {exp.period}
            </span>
            <span style={{
              fontFamily: 'monospace', fontSize: '18px', color: expanded ? exp.color : '#444',
              transition: 'transform 0.3s, color 0.2s',
              transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)',
              display: 'block',
            }}>+</span>
          </div>
        </div>

        {/* summary — always visible */}
        <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#777', lineHeight: 1.7, margin: '16px 0 0 46px' }}>
          {exp.summary}
        </p>

        {/* tags */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '14px', marginLeft: '46px' }}>
          {exp.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'monospace', fontSize: '9px', padding: '3px 9px',
              border: `1px solid ${expanded ? exp.color + '44' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '4px', color: expanded ? exp.color : '#666',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              transition: 'color 0.2s, border-color 0.2s',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* expanded bullets */}
      <div style={{
        maxHeight: expanded ? '600px' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{
          padding: '0 28px 24px 28px',
          borderTop: `1px solid ${exp.color}22`,
          marginTop: '0',
        }}>
          <p style={{ fontFamily: 'monospace', fontSize: '9px', color: exp.color, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '20px 0 14px 46px' }}>
            what I did
          </p>
          <ul style={{ listStyle: 'none', padding: '0 0 0 46px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {exp.bullets.map((b, i) => (
              <li key={i} style={{ fontFamily: 'monospace', fontSize: '12px', color: '#999', lineHeight: 1.75, display: 'flex', gap: '12px' }}>
                <span style={{ color: exp.color, flexShrink: 0, marginTop: '1px' }}>→</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function ExperiencePage() {
  return (
    <div style={{ padding: '100px 40px 80px', maxWidth: '800px' }}>
      <div style={{ marginBottom: '48px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#666', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '12px', marginTop: 0 }}>
          work history
        </p>
        <h1 style={{ fontFamily: 'system-ui, sans-serif', fontSize: '42px', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 12px 0' }}>
          Experience
        </h1>
        <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#777', lineHeight: 1.7, margin: 0 }}>
          Three internships across Montreal's tech scene. Click any card to expand.
        </p>
      </div>

      {/* timeline line + cards */}
      <div style={{ position: 'relative' }}>
        {/* vertical timeline */}
        <div style={{
          position: 'absolute', left: '19px', top: '40px', bottom: '40px',
          width: '1px', background: 'linear-gradient(to bottom, #60a5fa44, #a78bfa44, #4ade8044)',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '0' }}>
          {EXPERIENCE.map((exp, i) => (
            <div key={exp.company} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              {/* timeline dot */}
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: exp.color, flexShrink: 0, marginTop: '34px',
                boxShadow: `0 0 10px ${exp.color}88`,
              }} />
              <div style={{ flex: 1 }}>
                <ExperienceCard exp={exp} index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* education card at bottom */}
      <div style={{ marginTop: '48px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '40px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#666', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '16px', marginTop: 0 }}>
          education
        </p>
        <div style={{
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px 28px',
          background: 'rgba(245,158,11,0.03)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            <div style={{ fontSize: '28px', color: '#f59e0b' }}>◑</div>
            <div>
              <p style={{ fontFamily: 'monospace', fontSize: '15px', color: '#fff', margin: '0 0 4px 0', fontWeight: 600 }}>
                Concordia University
              </p>
              <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#f59e0b', margin: '0 0 4px 0' }}>
                B.Sc. Computer Science, CO-OP
              </p>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#555', margin: 0 }}>
                Montreal, QC
              </p>
            </div>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#555', whiteSpace: 'nowrap' }}>
            Sep 2021 – Jun 2025
          </span>
        </div>
      </div>
    </div>
  )
}