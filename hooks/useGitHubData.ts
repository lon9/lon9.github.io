'use client'

import { useState, useEffect } from 'react'
import type { GitHubData } from '@/lib/types'
import {
  fetchUser,
  fetchRepos,
  fetchStarred,
  fetchEvents,
  fetchLanguageColors,
} from '@/lib/github'

const CACHE_KEY = 'github_portfolio_cache'
const CACHE_TTL_MS = 30 * 60 * 1000

interface CacheEntry {
  data: Omit<GitHubData, 'loading' | 'error'>
  timestamp: number
}

function readCache(username: string): CacheEntry | null {
  try {
    const raw = localStorage.getItem(`${CACHE_KEY}_${username}`)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) return null
    return entry
  } catch {
    return null
  }
}

function writeCache(username: string, data: Omit<GitHubData, 'loading' | 'error'>): void {
  try {
    const entry: CacheEntry = { data, timestamp: Date.now() }
    localStorage.setItem(`${CACHE_KEY}_${username}`, JSON.stringify(entry))
  } catch {
    // localStorage unavailable
  }
}

export function useGitHubData(username: string): GitHubData {
  const [state, setState] = useState<GitHubData>({
    user: null,
    repos: [],
    starred: [],
    events: [],
    languageColors: {},
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!username) return

    const cached = readCache(username)
    if (cached) {
      setState({ ...cached.data, loading: false, error: null })
      return
    }

    let cancelled = false

    async function load() {
      try {
        const [user, repos, starred, events, languageColors] = await Promise.all([
          fetchUser(username),
          fetchRepos(username),
          fetchStarred(username),
          fetchEvents(username),
          fetchLanguageColors(),
        ])

        if (cancelled) return

        const data = { user, repos, starred, events, languageColors }
        writeCache(username, data)
        setState({ ...data, loading: false, error: null })
      } catch (err) {
        if (cancelled) return
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to load GitHub data',
        }))
      }
    }

    load()
    return () => { cancelled = true }
  }, [username])

  return state
}
