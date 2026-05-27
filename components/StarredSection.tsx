'use client'

import { useState } from 'react'
import type { GitHubRepo, LanguageColors } from '@/lib/types'
import RepoCard from './RepoCard'

const DISPLAY_LIMIT = 6

interface StarredSectionProps {
  repos: GitHubRepo[]
  colors: LanguageColors
}

export default function StarredSection({ repos, colors }: StarredSectionProps) {
  const [showAll, setShowAll] = useState(false)

  if (repos.length === 0) return null

  const visible = showAll ? repos : repos.slice(0, DISPLAY_LIMIT)

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
        // Starred Repositories
        <span
          style={{
            color: '#2a3a4a',
            fontWeight: 400,
            letterSpacing: 0,
            textTransform: 'none',
            fontSize: '0.7rem',
            marginLeft: '0.5rem',
          }}
        >
          ({repos.length})
        </span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((repo) => (
          <RepoCard key={repo.id} repo={repo} colors={colors} />
        ))}
      </div>
      {repos.length > DISPLAY_LIMIT && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              padding: '8px 24px',
              borderRadius: '2px',
              fontSize: '0.75rem',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.08em',
              backgroundColor: 'transparent',
              border: '1px solid rgba(0, 200, 255, 0.2)',
              color: '#00c8ff',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 200, 255, 0.5)'
              e.currentTarget.style.backgroundColor = 'rgba(0, 200, 255, 0.05)'
              e.currentTarget.style.boxShadow =
                '0 0 12px rgba(0, 200, 255, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 200, 255, 0.2)'
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {showAll ? '[ SHOW LESS ]' : `[ SHOW ALL ${repos.length} STARRED ]`}
          </button>
        </div>
      )}
    </section>
  )
}
