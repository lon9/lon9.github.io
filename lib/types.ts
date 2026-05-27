export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  bio: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  fork: boolean
  language: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  open_issues_count: number
  has_pages: boolean
  topics: string[]
  homepage: string | null
  created_at: string
  updated_at: string
  pushed_at: string
}

export interface GitHubEvent {
  id: string
  type:
    | 'PushEvent'
    | 'PullRequestEvent'
    | 'IssuesEvent'
    | 'CreateEvent'
    | 'DeleteEvent'
    | 'WatchEvent'
    | 'ForkEvent'
    | 'IssueCommentEvent'
    | 'ReleaseEvent'
    | string
  actor: { login: string; avatar_url: string }
  repo: { id: number; name: string; url: string }
  payload: {
    action?: string
    ref?: string
    ref_type?: string
    commits?: Array<{ message: string }>
    pull_request?: { title: string; html_url: string }
    issue?: { title: string; html_url: string }
    release?: { tag_name: string; html_url: string }
  }
  created_at: string
}

export interface LanguageColor {
  color: string | null
  url: string
}

export type LanguageColors = Record<string, LanguageColor>

export interface LanguageStat {
  name: string
  count: number
  rate: number
  color: string
}

export interface GitHubData {
  user: GitHubUser | null
  repos: GitHubRepo[]
  starred: GitHubRepo[]
  events: GitHubEvent[]
  languageColors: LanguageColors
  loading: boolean
  error: string | null
}
