import type {
  GitHubUser,
  GitHubRepo,
  GitHubEvent,
  LanguageColors,
} from './types'

const BASE_URL = 'https://api.github.com'
const PER_PAGE = 100

async function githubFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${url}`)
  }
  return res.json() as Promise<T>
}

export async function fetchUser(username: string): Promise<GitHubUser> {
  return githubFetch<GitHubUser>(`${BASE_URL}/users/${username}`)
}

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  let page = 1
  let all: GitHubRepo[] = []
  let batch: GitHubRepo[]
  do {
    batch = await githubFetch<GitHubRepo[]>(
      `${BASE_URL}/users/${username}/repos?per_page=${PER_PAGE}&page=${page}&sort=updated`,
    )
    all = all.concat(batch)
    page++
  } while (batch.length === PER_PAGE)
  return all
}

export async function fetchStarred(username: string): Promise<GitHubRepo[]> {
  let page = 1
  let all: GitHubRepo[] = []
  let batch: GitHubRepo[]
  do {
    batch = await githubFetch<GitHubRepo[]>(
      `${BASE_URL}/users/${username}/starred?per_page=${PER_PAGE}&page=${page}`,
    )
    all = all.concat(batch)
    page++
  } while (batch.length === PER_PAGE)
  return all
}

export async function fetchEvents(username: string): Promise<GitHubEvent[]> {
  return githubFetch<GitHubEvent[]>(
    `${BASE_URL}/users/${username}/events/public?per_page=30`,
  )
}

export async function fetchLanguageColors(): Promise<LanguageColors> {
  const res = await fetch(
    'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json',
  )
  if (!res.ok) return {}
  return res.json() as Promise<LanguageColors>
}
