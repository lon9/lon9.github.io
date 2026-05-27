import type { GitHubRepo, LanguageColors } from '@/lib/types'
import { formatDate } from '@/lib/utils'

interface RepoCardProps {
  repo: GitHubRepo
  colors: LanguageColors
}

export default function RepoCard({ repo, colors }: RepoCardProps) {
  const langColor = repo.language
    ? (colors[repo.language]?.color ?? '#888')
    : null

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="block no-underline group"
      style={{
        padding: '1rem',
        backgroundColor: '#0a0a1e',
        border: '1px solid rgba(0, 200, 255, 0.12)',
        borderRadius: '2px',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 200, 255, 0.45)'
        e.currentTarget.style.boxShadow =
          '0 0 20px rgba(0, 200, 255, 0.08), inset 0 0 20px rgba(0, 0, 40, 0.4)'
        e.currentTarget.style.backgroundColor = '#0d0d28'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 200, 255, 0.12)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.backgroundColor = '#0a0a1e'
      }}
    >
      {/* Top accent line on hover */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(0,200,255,0.5), transparent)',
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
        className="group-hover:opacity-100"
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '8px',
          marginBottom: '8px',
        }}
      >
        <h3
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 600,
            fontSize: '0.85rem',
            color: '#00c8ff',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            letterSpacing: '0.03em',
          }}
        >
          {repo.name}
        </h3>
        {repo.has_pages && (
          <span
            style={{
              flexShrink: 0,
              fontSize: '0.6rem',
              padding: '2px 6px',
              color: '#ff0080',
              backgroundColor: 'rgba(255, 0, 128, 0.06)',
              border: '1px solid rgba(255, 0, 128, 0.25)',
              borderRadius: '2px',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.08em',
            }}
          >
            LIVE
          </span>
        )}
      </div>

      {repo.description && (
        <p
          style={{
            fontSize: '0.72rem',
            marginBottom: '12px',
            color: '#3a5060',
            lineHeight: 1.7,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {repo.description}
        </p>
      )}

      {repo.topics && repo.topics.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            marginBottom: '12px',
          }}
        >
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              style={{
                fontSize: '0.62rem',
                padding: '2px 7px',
                color: '#00c8ff',
                backgroundColor: 'rgba(0, 200, 255, 0.04)',
                border: '1px solid rgba(0, 200, 255, 0.15)',
                borderRadius: '2px',
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '0.04em',
              }}
            >
              #{topic}
            </span>
          ))}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          fontSize: '0.68rem',
          fontFamily: 'JetBrains Mono, monospace',
          color: '#2a3a4a',
          marginTop: 'auto',
        }}
      >
        {langColor && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: langColor,
                boxShadow: `0 0 5px ${langColor}88`,
                flexShrink: 0,
              }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span style={{ color: 'rgba(0, 200, 255, 0.6)' }}>
            ★ {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && <span>⑂ {repo.forks_count}</span>}
        <span style={{ marginLeft: 'auto' }}>
          {formatDate(repo.updated_at)}
        </span>
      </div>
    </a>
  )
}
