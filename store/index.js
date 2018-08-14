export const state = () => ({
  userETag: "",
  reposETag: "",
  starsETag: "",
  user: {},
  repos: [],
  stars: []
})

export const mutations = {
  setUserETag(state, etag){
    state.userETag = etag
  },
  setReposETag(state, etag){
    state.reposETag = etag
  },
  setStarsETag(state, etag){
    state.starsETag = etag
  },
  setUser(state, user){
    state.user = user
  },
  setRepos(state, repos){
    state.repos = repos
  },
  setStars(state, stars){
    state.stars = stars
  }
}