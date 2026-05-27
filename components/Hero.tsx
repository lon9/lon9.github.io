import type { GitHubUser } from '@/lib/types'

interface HeroProps {
  user: GitHubUser
}

export default function Hero({ user }: HeroProps) {
  const joinYear = new Date(user.created_at).getFullYear()

  const meta: { label: string; href?: string }[] = []
  if (user.location) meta.push({ label: user.location })
  if (user.company) meta.push({ label: user.company })
  if (user.blog)
    meta.push({
      label: user.blog,
      href: user.blog.startsWith('http') ? user.blog : `https://${user.blog}`,
    })
  if (user.email) meta.push({ label: user.email, href: `mailto:${user.email}` })
  meta.push({ label: `EST. ${joinYear}` })

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0a0a1e',
        border: '1px solid rgba(0, 200, 255, 0.2)',
        borderTopColor: 'rgba(0, 200, 255, 0.6)',
        borderRadius: '2px',
        boxShadow:
          '0 0 40px rgba(0, 200, 255, 0.04), inset 0 0 80px rgba(0, 0, 30, 0.5)',
      }}
    >
      {/* Corner brackets */}
      <div
        style={{
          position: 'absolute',
          top: -1,
          left: -1,
          width: 14,
          height: 14,
          borderTop: '2px solid #00c8ff',
          borderLeft: '2px solid #00c8ff',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -1,
          right: -1,
          width: 14,
          height: 14,
          borderTop: '2px solid #00c8ff',
          borderRight: '2px solid #00c8ff',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -1,
          left: -1,
          width: 14,
          height: 14,
          borderBottom: '2px solid #00c8ff',
          borderLeft: '2px solid #00c8ff',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -1,
          right: -1,
          width: 14,
          height: 14,
          borderBottom: '2px solid #00c8ff',
          borderRight: '2px solid #00c8ff',
        }}
      />

      {/* Terminal header bar */}
      <div
        style={{
          padding: '5px 16px',
          borderBottom: '1px solid rgba(0, 200, 255, 0.1)',
          backgroundColor: 'rgba(0, 200, 255, 0.03)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#ff0080',
            boxShadow: '0 0 4px #ff0080',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#00c8ff',
            boxShadow: '0 0 4px #00c8ff',
            opacity: 0.5,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#00ff88',
            boxShadow: '0 0 4px #00ff88',
            opacity: 0.5,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            color: 'rgba(0, 200, 255, 0.5)',
            letterSpacing: '0.15em',
            marginLeft: 8,
          }}
        >
          // PROFILE.SYS :: LOADING USER_DATA_STREAM...
        </span>
      </div>

      <div
        style={{
          position: 'relative',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'row',
          gap: '2rem',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* Avatar */}
        <div style={{ flexShrink: 0 }}>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-block', position: 'relative' }}
          >
            <img
              src={user.avatar_url}
              alt={`${user.name ?? user.login} profile photo`}
              width={120}
              height={120}
              style={{
                borderRadius: '2px',
                border: '2px solid rgba(0, 200, 255, 0.5)',
                boxShadow:
                  '0 0 20px rgba(0, 200, 255, 0.25), 0 0 60px rgba(0, 200, 255, 0.08)',
                filter: 'saturate(0.75) contrast(1.1) brightness(0.95)',
                display: 'block',
              }}
            />
            {/* Scan line across avatar */}
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                left: -6,
                right: -6,
                height: '1px',
                backgroundColor: 'rgba(0, 200, 255, 0.7)',
                boxShadow: '0 0 8px rgba(0, 200, 255, 0.8)',
              }}
            />
          </a>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              gap: '12px',
              marginBottom: '10px',
            }}
          >
            <h1
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#00c8ff',
                letterSpacing: '0.04em',
                textShadow:
                  '0 0 20px rgba(0, 200, 255, 0.5), 0 0 40px rgba(0, 200, 255, 0.2)',
              }}
            >
              {user.name ?? user.login}
            </h1>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                color: '#304050',
                letterSpacing: '0.05em',
              }}
            >
              @{user.login}
            </a>
          </div>

          {user.bio && (
            <p
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.78rem',
                color: '#5a7a90',
                marginBottom: '1.2rem',
                lineHeight: 1.9,
                letterSpacing: '0.02em',
              }}
            >
              <span style={{ color: '#1a3040' }}>{'> '}</span>
              {user.bio}
            </p>
          )}

          {meta.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: '1.2rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.72rem',
                color: '#304050',
              }}
            >
              {meta.map((item, i) => (
                <span key={item.label}>
                  {i > 0 && (
                    <span style={{ color: '#1a2535', margin: '0 8px' }}>|</span>
                  )}
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith('mailto') ? undefined : '_blank'
                      }
                      rel="noreferrer"
                      style={{ color: '#4a6a80' }}
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <StatBadge label="Followers" value={user.followers} />
            <StatBadge label="Following" value={user.following} />
            <StatBadge label="Repos" value={user.public_repos} />
            {user.public_gists > 0 && (
              <StatBadge label="Gists" value={user.public_gists} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function StatBadge({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '5px 12px',
        backgroundColor: 'rgba(0, 200, 255, 0.04)',
        border: '1px solid rgba(0, 200, 255, 0.2)',
        borderRadius: '2px',
        fontFamily: 'JetBrains Mono, monospace',
      }}
    >
      <span
        style={{
          fontWeight: 700,
          color: '#00c8ff',
          fontSize: '0.9rem',
          textShadow: '0 0 10px rgba(0, 200, 255, 0.5)',
        }}
      >
        {value.toLocaleString()}
      </span>
      <span
        style={{
          fontSize: '0.65rem',
          color: '#304050',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </span>
    </div>
  )
}
