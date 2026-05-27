function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        borderRadius: '2px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        border: '1px solid rgba(0, 200, 255, 0.12)',
        backgroundColor: '#0a0a1e',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(0,200,255,0.2), transparent)',
        }}
      />
      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '2rem',
          fontWeight: 700,
          color: '#00c8ff',
          letterSpacing: '-0.02em',
          textShadow: '0 0 20px rgba(0, 200, 255, 0.4)',
        }}
      >
        {value.toLocaleString()}
      </div>
      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#2a3a4a',
        }}
      >
        {label}
      </div>
    </div>
  )
}

interface StatsGridProps {
  repos: number
  stars: number
  forks: number
  followers: number
}

export default function StatsGrid({
  repos,
  stars,
  forks,
  followers,
}: StatsGridProps) {
  return (
    <section>
      <h2
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          color: '#00c8ff',
          letterSpacing: '0.15em',
          fontSize: '0.7rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          textShadow: '0 0 10px rgba(0, 200, 255, 0.4)',
        }}
      >
        // Overview
        <span
          style={{
            display: 'block',
            marginTop: '6px',
            width: '2rem',
            height: '1px',
            backgroundColor: '#00c8ff',
            boxShadow: '0 0 6px rgba(0, 200, 255, 0.6)',
          }}
        />
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Public Repositories" value={repos} />
        <StatCard label="Total Stars Received" value={stars} />
        <StatCard label="Total Forks" value={forks} />
        <StatCard label="Followers" value={followers} />
      </div>
    </section>
  )
}
