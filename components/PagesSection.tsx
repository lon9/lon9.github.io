import type { GitHubRepo, LanguageColors } from '@/lib/types'
import { repoPageUrl } from '@/lib/utils'

interface PagesSectionProps {
  repos: GitHubRepo[]
  colors: LanguageColors
}

export default function PagesSection({ repos, colors }: PagesSectionProps) {
  if (repos.length === 0) return null

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
        // GitHub Pages Projects
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {repos.map((repo) => {
          const langColor = repo.language
            ? (colors[repo.language]?.color ?? '#888')
            : null
          const pageUrl = repoPageUrl(repo)

          return (
            <div
              key={repo.id}
              style={{
                overflow: 'hidden',
                border: '1px solid rgba(0, 200, 255, 0.12)',
                backgroundColor: '#0a0a1e',
                borderRadius: '2px',
              }}
            >
              <div
                style={{
                  height: '2px',
                  backgroundColor: langColor ?? 'rgba(0, 200, 255, 0.2)',
                  boxShadow: langColor ? `0 0 6px ${langColor}88` : 'none',
                }}
              />
              <div style={{ padding: '1rem' }}>
                <h3
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    marginBottom: '4px',
                    color: '#a0b8cc',
                    letterSpacing: '0.03em',
                  }}
                >
                  {repo.name}
                </h3>
                {repo.description && (
                  <p
                    style={{
                      fontSize: '0.72rem',
                      marginBottom: '12px',
                      color: '#3a5060',
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {repo.description}
                  </p>
                )}
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginTop: '12px',
                  }}
                >
                  <a
                    href={pageUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: '0.72rem',
                      padding: '5px 12px',
                      borderRadius: '2px',
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#050510',
                      backgroundColor: '#00c8ff',
                      letterSpacing: '0.05em',
                      textDecoration: 'none',
                    }}
                  >
                    VISIT SITE →
                  </a>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: '0.72rem',
                      padding: '5px 12px',
                      borderRadius: '2px',
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#2a3a4a',
                      border: '1px solid rgba(0, 200, 255, 0.15)',
                      backgroundColor: 'transparent',
                      letterSpacing: '0.05em',
                      textDecoration: 'none',
                    }}
                  >
                    SOURCE
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
