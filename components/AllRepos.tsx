'use client'

import { useState, useMemo } from 'react'
import type { GitHubRepo, LanguageColors } from '@/lib/types'
import RepoCard from './RepoCard'

interface AllReposProps {
  repos: GitHubRepo[]
  colors: LanguageColors
}

export default function AllRepos({ repos, colors }: AllReposProps) {
  const [search, setSearch] = useState('')
  const [selectedLang, setSelectedLang] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const languages = useMemo(() => {
    const seen = new Set<string>()
    for (const r of repos) {
      if (r.language) seen.add(r.language)
    }
    return Array.from(seen).sort()
  }, [repos])

  const filtered = useMemo(() => {
    return repos.filter((r) => {
      const matchLang = !selectedLang || r.language === selectedLang
      const matchSearch =
        !search ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        (r.description ?? '').toLowerCase().includes(search.toLowerCase())
      return matchLang && matchSearch
    })
  }, [repos, search, selectedLang])

  const visible = showAll ? filtered : filtered.slice(0, 12)

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
        // All Repositories
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
          ({filtered.length})
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

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Search repositories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 16px',
            borderRadius: '2px',
            fontSize: '0.8rem',
            fontFamily: 'JetBrains Mono, monospace',
            outline: 'none',
            backgroundColor: '#0a0a1e',
            border: '1px solid rgba(0, 200, 255, 0.15)',
            color: '#a0b8cc',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 200, 255, 0.5)'
            e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 200, 255, 0.06)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 200, 255, 0.15)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setSelectedLang(null)}
          style={{
            fontSize: '0.7rem',
            padding: '4px 12px',
            borderRadius: '2px',
            fontFamily: 'JetBrains Mono, monospace',
            cursor: 'pointer',
            transition: 'all 0.15s',
            backgroundColor:
              selectedLang === null ? 'rgba(0, 200, 255, 0.08)' : 'transparent',
            color: selectedLang === null ? '#00c8ff' : '#2a3a4a',
            border: `1px solid ${selectedLang === null ? 'rgba(0, 200, 255, 0.4)' : 'rgba(0, 200, 255, 0.1)'}`,
          }}
        >
          All
        </button>
        {languages.map((lang) => {
          const color = colors[lang]?.color ?? '#888'
          const active = selectedLang === lang
          return (
            <button
              key={lang}
              onClick={() => setSelectedLang(active ? null : lang)}
              style={{
                fontSize: '0.7rem',
                padding: '4px 12px',
                borderRadius: '2px',
                fontFamily: 'JetBrains Mono, monospace',
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: active ? `${color}18` : 'transparent',
                color: active ? color : '#2a3a4a',
                border: `1px solid ${active ? `${color}55` : 'rgba(0, 200, 255, 0.08)'}`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              {lang}
            </button>
          )
        })}
      </div>

      {visible.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((repo) => (
              <RepoCard key={repo.id} repo={repo} colors={colors} />
            ))}
          </div>
          {filtered.length > 12 && (
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
                  e.currentTarget.style.backgroundColor =
                    'rgba(0, 200, 255, 0.05)'
                  e.currentTarget.style.boxShadow =
                    '0 0 12px rgba(0, 200, 255, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 200, 255, 0.2)'
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {showAll
                  ? '[ SHOW LESS ]'
                  : `[ SHOW ALL ${filtered.length} REPOS ]`}
              </button>
            </div>
          )}
        </>
      ) : (
        <p
          style={{
            fontSize: '0.8rem',
            fontFamily: 'JetBrains Mono, monospace',
            color: '#2a3a4a',
          }}
        >
          {'> '} No repositories match your search.
        </p>
      )}
    </section>
  )
}
