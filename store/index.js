export const state = () => ({
  userETag: '',
  reposETag: '',
  starsETag: '',
  user: null,
  repos: [],
  stars: [],
  languages: null
})

export const mutations = {
  setUserETag(state, etag) {
    state.userETag = etag
  },
  setReposETag(state, etag) {
    state.reposETag = etag
  },
  setStarsETag(state, etag) {
    state.starsETag = etag
  },
  setUser(state, user) {
    state.user = user
  },
  setRepos(state, repos) {
    state.repos = repos
  },
  setStars(state, stars) {
    state.stars = stars
  },
  setLanguages(state, languages) {
    state.languages = languages
  }
}

const PER_PAGE = 100

export const actions = {
  async nuxtServerInit({ commit }) {
    const res = await this.$http.$get(
      'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json'
    )
    commit('setLanguages', res)
  },
  async setUserAction({ commit, state }, userName) {
    const res = await this.$http.get(`users/${userName}`, {
      headers: {
        'If-None-Match': state.userETag
      }
    })
    if (res.status === 200) {
      commit('setUser', await res.json())
      commit('setUserETag', res.headers.get('etag'))
    }
  },
  async setReposAction({ commit, state }, userName) {
    let page = 1
    let repos = []
    let firstResponse
    for (;;) {
      const res = await this.$http.get(
        `users/${userName}/repos?per_page=${PER_PAGE}&page=${page}`,
        {
          headers: {
            'If-None-Match': state.reposETag
          }
        }
      )
      if (page === 1) firstResponse = res
      if (res.status === 200) {
        const data = await res.json()
        repos = repos.concat(data)
        if (data.length === PER_PAGE) {
          page++
          continue
        }
      }
      break
    }
    commit('setRepos', repos)
    commit('setReposETag', firstResponse.headers.get('etag'))
  },
  async setStarsAction({ commit, state }, userName) {
    let page = 1
    let repos = []
    let firstResponse
    for (;;) {
      const res = await this.$http.get(
        `users/${userName}/starred?per_page=${PER_PAGE}&page=${page}`,
        {
          headers: {
            'If-None-Match': state.starsETag
          }
        }
      )
      if (page === 1) firstResponse = res
      if (res.status === 200) {
        const data = await res.json()
        repos = repos.concat(data)
        if (data.length === PER_PAGE) {
          page++
          continue
        }
      }
      break
    }
    commit('setStars', repos)
    commit('setStarsETag', firstResponse.headers.get('etag'))
  }
}
