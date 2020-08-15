export const state = () => ({
  user: null,
  repos: [],
  stars: [],
  languages: null,
})

export const mutations = {
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
  },
}

const PER_PAGE = 100

export const actions = {
  async nuxtServerInit({ commit }) {
    try {
      const res = await this.$http.$get(
        'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json'
      )
      commit('setLanguages', res)
    } catch (err) {}
  },
  async setUserAction({ commit }, userName) {
    const res = await this.$http.$get(`users/${userName}`)
    commit('setUser', res)
  },
  async setReposAction({ commit }, userName) {
    let page = 1
    let repos = []
    let res
    while (!res || res.length === PER_PAGE) {
      res = await this.$http.$get(
        `users/${userName}/repos?per_page=${PER_PAGE}&page=${page}`
      )
      repos = repos.concat(res)
      page++
    }
    commit('setRepos', repos)
  },
  async setStarsAction({ commit }, userName) {
    let page = 1
    let repos = []
    let res
    while (!res || res.length === PER_PAGE) {
      res = await this.$http.$get(
        `users/${userName}/starred?per_page=${PER_PAGE}&page=${page}`
      )
      repos = repos.concat(res)
      page++
    }
    commit('setStars', repos)
  },
}
