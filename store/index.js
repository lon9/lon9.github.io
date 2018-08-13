export const state = () => ({
  userEtag: "",
  reposEtag: "",
  starsEtag: "",
  user: {},
  repos: [],
  stars: []
})

export const mutations = {
  setUserEtag(state, etag){
    state.userEtag = etag
  },
  setReposEtag(state, etag){
    state.reposEtag = etag
  },
  setStarsEtag(state, etag){
    state.starsEtag = etag
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

export const actions = {
  
}