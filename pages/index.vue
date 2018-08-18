<template>
  <div>
    <div v-if="loading">
      loading...
    </div>
    <div v-else>
      <section v-if="Object.keys(user).length != 0" id="profile">
        <Profile
          v-bind:user="user"
        ></Profile>
      </section>
      <section v-if="hasPageRepos.length != 0" id="pages">
        <GithubPages
          v-bind:repos="hasPageRepos"
        ></GithubPages>
      </section>
      <section v-if="repos.length != 0" id="repos">
        <Repositories
          title="Public repositories"
          v-bind:repos="repos"
          v-bind:languages="languages"
        ></Repositories>
      </section>
      <section v-if="stars.length != 0" id="stars">
        <Repositories
          title="Starred repositories"
          v-bind:repos="stars"
          v-bind:languages="languages"
        ></Repositories>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Profile from '~/components/Profile'
import Repositories from '~/components/Repositories'
import GithubPages from '~/components/GithubPages'

const PER_PAGE = 100

const getRepos = async (url, reposData, options) => {

  let page = 1
  let firstResponse

  while (true) {
    const res = await axios.get(url+ `?per_page=${PER_PAGE}&page=${page}`, options)
    if(page == 1)
      firstResponse = res
    if(res.status == 200){
      if(reposData.length != 0 && page == 1)
        reposData.splice(0, reposData.length)
      Array.prototype.push.apply(reposData, res.data)
      if(res.data.length == PER_PAGE){
        page++
        continue
      }
    }
    break
  }
  return firstResponse
}

const getReposFn = (url, reposData, etag) => {
  let fn
  if(etag){
    fn = getRepos(url, reposData, {
      headers: {
        'If-None-Match': etag
      },
      validateStatus: (status) => {
        return status < 500
      }
    })
  }else{
    fn = getRepos(url, reposData, {
      validateStatus: (status) => {
        return status < 500
      }
    })
  }
  return fn
}

const getUserFn = (url, etag) => {
  let fn
  if(etag){
    fn =  axios.get(url, {
      headers: {
        'If-None-Match': etag
      },
      validateStatus: (status) => {
        return status < 500
      }
    })
  }else{
    fn = axios.get(url, {
      validateStatus: (status) => {
        return status < 500
      }
    })
  }
  return fn
}

export default {
  data(){
    return {
      user: {},
      repos: [],
      hasPageRepos: [],
      stars: [],
      loading: true
    }
  },
  async asyncData(){
    const { data } = await axios.get('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json')
    return { languages: data }
  },
  async created(){
    // Get user info
    const fn1 = getUserFn(`https://api.github.com/users/${process.env.userName}`, 
      this.$store.state.userETag)

    // Get repositories
    const fn2 = getReposFn(`https://api.github.com/users/${process.env.userName}/repos`, 
      this.repos, this.$store.state.reposETag)

    // Get stars
    const fn3 = getReposFn(`https://api.github.com/users/${process.env.userName}/starred`, 
      this.stars, this.$store.state.starsETag)

    const [r1, r2, r3] = await Promise.all([fn1, fn2, fn3])
    
    if(r1.status == 200)
      this.user = r1.data
    else
      this.user = this.$store.state.user
    if(r2.status != 200)
      this.repos = this.$store.state.repos
    if(r3.status != 200)
      this.stars = this.$store.state.stars

    this.hasPageRepos = this.repos.filter((repo) => {
      return repo.has_pages && repo.name != `${this.user.login}.github.io`
    })

    this.loading = false

    // Store to store
    this.$store.commit('setUserETag', r1.headers['etag'])
    this.$store.commit('setReposETag', r2.headers['etag'])
    this.$store.commit('setStarsETag', r3.headers['etag'])
    this.$store.commit('setUser', this.user)
    this.$store.commit('setRepos', this.repos)
    this.$store.commit('setStars', this.stars)
  },
  components: {
    Profile,
    Repositories,
    GithubPages
  }
}

</script>
