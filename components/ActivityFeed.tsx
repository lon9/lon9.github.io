import type { GitHubEvent } from '@/lib/types'
import { eventLabel, eventIcon, eventColor, formatDate } from '@/lib/utils'

interface ActivityFeedProps {
  events: GitHubEvent[]
}

export default function ActivityFeed({ events }: ActivityFeedProps) {
  const visible = events.slice(0, 15)
  if (visible.length === 0) return null

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
        // Recent Activity
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
      <div
        style={{
          overflow: 'hidden',
          border: '1px solid rgba(0, 200, 255, 0.12)',
          backgroundColor: '#0a0a1e',
          borderRadius: '2px',
        }}
      >
        {visible.map((event, i) => {
          const color = eventColor(event.type)
          const icon = eventIcon(event.type)
          const label = eventLabel(event)
          const repoName = event.repo.name
          const repoUrl = `https://github.com/${repoName}`

          return (
            <div
              key={event.id}
              className="flex items-start gap-4 px-5 py-3 transition-colors"
              style={{
                borderTop:
                  i > 0 ? '1px solid rgba(0, 200, 255, 0.05)' : undefined,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  'rgba(0, 200, 255, 0.03)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <div
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono mt-0.5"
                style={{ backgroundColor: `${color}18`, color }}
              >
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontSize: '0.8rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#5a7a90',
                  }}
                >
                  <span style={{ color: '#2a3a4a' }}>{label} </span>
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: '#00c8ff',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {repoName}
                  </a>
                </p>
                {event.type === 'PushEvent' && event.payload.commits?.[0] && (
                  <p
                    style={{
                      fontSize: '0.7rem',
                      marginTop: '2px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#1e2e3a',
                    }}
                  >
                    {event.payload.commits[0].message}
                  </p>
                )}
              </div>
              <span
                style={{
                  flexShrink: 0,
                  fontSize: '0.68rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#1e2e3a',
                }}
              >
                {formatDate(event.created_at)}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
