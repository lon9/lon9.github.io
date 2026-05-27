import type { GitHubRepo, LanguageColors } from '@/lib/types'
import RepoCard from './RepoCard'

interface TopReposProps {
  repos: GitHubRepo[]
  colors: LanguageColors
}

export default function TopRepos({ repos, colors }: TopReposProps) {
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
        // Top Repositories
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
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} colors={colors} />
        ))}
      </div>
    </section>
  )
}
