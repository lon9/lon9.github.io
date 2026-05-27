import type {
  GitHubRepo,
  LanguageColors,
  LanguageStat,
  GitHubEvent,
} from './types'
import { formatDistanceToNow } from 'date-fns'

export function computeLanguageStats(
  repos: GitHubRepo[],
  colors: LanguageColors,
): LanguageStat[] {
  const counts: Record<string, number> = {}
  for (const repo of repos) {
    if (!repo.language) continue
    counts[repo.language] = (counts[repo.language] ?? 0) + 1
  }
  const total = repos.filter((r) => r.language).length || 1
  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      rate: Math.round((count / total) * 1000) / 10,
      color: colors[name]?.color ?? '#888888',
    }))
    .sort((a, b) => b.count - a.count)
}

export function totalStars(repos: GitHubRepo[]): number {
  return repos.reduce((sum, r) => sum + r.stargazers_count, 0)
}

export function totalForks(repos: GitHubRepo[]): number {
  return repos.reduce((sum, r) => sum + r.forks_count, 0)
}

export function topRepos(repos: GitHubRepo[], n = 6): GitHubRepo[] {
  return [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, n)
}

export function pagesRepos(
  repos: GitHubRepo[],
  username: string,
): GitHubRepo[] {
  return repos.filter((r) => r.has_pages && r.name !== `${username}.github.io`)
}

export function formatDate(dateStr: string): string {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true })
  } catch {
    return dateStr
  }
}

export function eventLabel(event: GitHubEvent): string {
  switch (event.type) {
    case 'PushEvent': {
      const count = event.payload.commits?.length ?? 0
      return `Pushed ${count} commit${count !== 1 ? 's' : ''} to`
    }
    case 'PullRequestEvent':
      return `${capitalize(event.payload.action ?? 'Updated')} PR in`
    case 'IssuesEvent':
      return `${capitalize(event.payload.action ?? 'Updated')} issue in`
    case 'IssueCommentEvent':
      return 'Commented on issue in'
    case 'CreateEvent':
      return `Created ${event.payload.ref_type ?? 'branch'} in`
    case 'DeleteEvent':
      return `Deleted ${event.payload.ref_type ?? 'branch'} in`
    case 'WatchEvent':
      return 'Starred'
    case 'ForkEvent':
      return 'Forked'
    case 'ReleaseEvent':
      return `Released ${event.payload.release?.tag_name ?? ''} in`
    default:
      return `Activity in`
  }
}

export function eventIcon(type: string): string {
  switch (type) {
    case 'PushEvent':
      return '↑'
    case 'PullRequestEvent':
      return '⤢'
    case 'IssuesEvent':
      return '!'
    case 'IssueCommentEvent':
      return '›'
    case 'CreateEvent':
      return '+'
    case 'DeleteEvent':
      return '−'
    case 'WatchEvent':
      return '★'
    case 'ForkEvent':
      return '⑂'
    case 'ReleaseEvent':
      return '▶'
    default:
      return '·'
  }
}

export function eventColor(type: string): string {
  switch (type) {
    case 'PushEvent':
      return '#7dada6'
    case 'PullRequestEvent':
      return '#9b8afb'
    case 'IssuesEvent':
      return '#c9a96e'
    case 'IssueCommentEvent':
      return '#6b6b6b'
    case 'CreateEvent':
      return '#c9a96e'
    case 'WatchEvent':
      return '#c9a96e'
    case 'ForkEvent':
      return '#7dada6'
    case 'ReleaseEvent':
      return '#7dada6'
    default:
      return '#6b6b6b'
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function repoPageUrl(repo: GitHubRepo): string {
  const owner = repo.full_name.split('/')[0]
  return `https://${owner}.github.io/${repo.name}`
}
