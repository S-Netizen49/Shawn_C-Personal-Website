'use client'

const SKILLS = [
  { label: 'Languages',          value: 'Java, Python, C#, C++, JavaScript, TypeScript, SQL' },
  { label: 'Frameworks & Tools', value: 'ReactJS, React Native, AngularJS, Spring Boot, .NET, Node.js, REST APIs' },
  { label: 'Cloud & Platforms',  value: 'AWS EC2, AWS IAM, Amazon S3, Azure DevOps, GitHub' },
  { label: 'Databases',          value: 'PostgreSQL, MongoDB, SQL Server' },
  { label: 'Testing',            value: 'XUnit, Moq, Postman, BlackDuck' },
  { label: 'Spoken Languages',   value: 'English, French' },
]

const LINKS = [
  { label: 'github',   href: 'https://github.com/S-Netizen49',             value: 'S-Netizen49' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/shawnn-cui/',    value: 'shawnn-cui' },
  { label: 'email',    href: 'mailto:zhzhang2002@gmail.com',               value: 'zhzhang2002@gmail.com' },
  { label: 'phone',    href: 'tel:+14389211520',                           value: '+1 438-921-1520' },
]

export default function AboutPage() {
  return (
    <div style={{ padding: '100px 40px 60px', maxWidth: '680px', color: '#d4d4d4' }}>
      <h1 style={{ fontFamily: 'system-ui, sans-serif', fontSize: '42px', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: '8px', marginTop: 0 }}>
        Shawn Cui
      </h1>
      <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#4ade80', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '32px', marginTop: 0 }}>
        Software Engineer · Montréal, QC
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#aaa', lineHeight: 1.8, margin: 0 }}>
          Full-stack software engineer based in Montréal. I build distributed systems, mobile apps, and anything in between. Recently graduated with a B.Sc. in Computer Science (CO-OP) from Concordia University.
        </p>
        <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#aaa', lineHeight: 1.8, margin: 0 }}>
          I've interned at <span style={{ color: '#60a5fa' }}>Genetec</span> working on enterprise localization services and security hardening,
          at <span style={{ color: '#a78bfa' }}>Consoltec</span> building multi-tenant web portals, and at{' '}
          <span style={{ color: '#4ade80' }}>Big Bang 360</span> as a software consultant.
        </p>
        <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#aaa', lineHeight: 1.8, margin: 0 }}>
          Outside of code: building side projects that actually ship, exploring Montréal, and automating things that shouldn't need to be manual.
        </p>
      </div>

      {/* Skills */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px', marginBottom: '40px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#666', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '20px', marginTop: 0 }}>
          technical skills
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {SKILLS.map(s => (
            <div key={s.label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '16px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#555' }}>{s.label}</span>
              <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#aaa', lineHeight: 1.6 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px', marginBottom: '40px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#666', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '20px', marginTop: 0 }}>
          education
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#ddd', margin: '0 0 4px 0' }}>Concordia University</p>
            <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#f59e0b', margin: '0 0 4px 0' }}>B.Sc. Computer Science, CO-OP</p>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#555', margin: 0 }}>Montréal, QC</p>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#555' }}>Sep 2021 – Jun 2025</span>
        </div>
      </div>

      {/* Contact */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#666', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '20px', marginTop: 0 }}>
          find me
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {LINKS.map(l => (
            <a key={l.label} href={l.href}
              style={{ fontFamily: 'monospace', fontSize: '13px', color: '#aaa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', transition: 'color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#aaa' }}
            >
              <span style={{ color: '#444', fontSize: '11px', width: '60px', flexShrink: 0 }}>{l.label}</span>
              {l.value}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}