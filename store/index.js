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
  setUser(context, userEtag, user){
    context.commit('setUserEtag', userEtag)
    context.commit('setUser', user)
  },
  setRepos(context, reposEtag, repos){
    context.commit('setReposEtag', reposEtag)
    context.commit('setRepos', repos)
  },
  setStars(context, starsEtag, stars){
    context.commit('setStarsEtag', starsEtag)
    context.commit('setStars', stars)
  }
}