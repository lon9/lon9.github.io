'use client'

import { useGitHubData } from '@/hooks/useGitHubData'
import {
  computeLanguageStats,
  totalStars,
  totalForks,
  topRepos,
  pagesRepos,
} from '@/lib/utils'
import Hero from '@/components/Hero'
import StatsGrid from '@/components/StatsGrid'
import LanguageSection from '@/components/LanguageSection'
import TopRepos from '@/components/TopRepos'
import ActivityFeed from '@/components/ActivityFeed'
import PagesSection from '@/components/PagesSection'
import AllRepos from '@/components/AllRepos'
import StarredSection from '@/components/StarredSection'
import {
  HeroSkeleton,
  StatsSkeleton,
  ChartSkeleton,
  RepoGridSkeleton,
} from '@/components/LoadingSkeleton'

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'lon9'

export default function Home() {
  const { user, repos, starred, events, languageColors, loading, error } =
    useGitHubData(USERNAME)

  const langStats = computeLanguageStats(repos, languageColors)
  const stars = totalStars(repos)
  const forks = totalForks(repos)
  const top6 = topRepos(repos, 6)
  const pages = user ? pagesRepos(repos, user.login) : []

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border mb-4"
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
              color: '#616161',
              backgroundColor: '#0d0d0d',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: '#c9a96e' }}
            />
            GitHub Portfolio · {USERNAME}
          </div>
        </div>

        {error && (
          <div
            className="rounded-xl border px-6 py-4 text-sm font-mono"
            style={{
              borderColor: 'rgba(201,169,110,0.3)',
              backgroundColor: 'rgba(201,169,110,0.05)',
              color: '#c9a96e',
            }}
          >
            ⚠ {error}
          </div>
        )}

        {loading ? <HeroSkeleton /> : user && <Hero user={user} />}

        {loading ? (
          <StatsSkeleton />
        ) : (
          user && (
            <StatsGrid
              repos={user.public_repos}
              stars={stars}
              forks={forks}
              followers={user.followers}
            />
          )
        )}

        {loading ? (
          <ChartSkeleton />
        ) : (
          langStats.length > 0 && <LanguageSection stats={langStats} />
        )}

        {loading ? (
          <RepoGridSkeleton />
        ) : (
          top6.length > 0 && <TopRepos repos={top6} colors={languageColors} />
        )}

        {!loading && events.length > 0 && <ActivityFeed events={events} />}

        {!loading && pages.length > 0 && (
          <PagesSection repos={pages} colors={languageColors} />
        )}

        {loading ? (
          <RepoGridSkeleton />
        ) : (
          repos.length > 0 && <AllRepos repos={repos} colors={languageColors} />
        )}

        {!loading && starred.length > 0 && (
          <StarredSection repos={starred} colors={languageColors} />
        )}

        <footer
          className="text-center text-xs font-mono pt-8 pb-4"
          style={{
            color: '#616161',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p>Built with Next.js · Data from GitHub API</p>
          <p className="mt-1">
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#c9a96e' }}
            >
              github.com/{USERNAME}
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}
