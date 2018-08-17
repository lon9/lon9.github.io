<template>
<div>
  <div v-if="loading">
    loading...
  </div>
  <div v-else>
    <section v-if="Object.keys(user).length != 0" id="profile">
      <h4>Profile</h4>
      <a target="_blank" :href="user.html_url"><img :src="user.avatar_url" width="128" height="128"></a>
      <p>
        <span v-if="user.name">Name: {{ user.name }}<br></span>
        <span v-if="user.bio">Bio: {{ user.bio }}<br></span>
        <span v-if="user.location">Location: {{ user.location }}<br></span>
        <span v-if="user.email">Email: {{ user.email }}<br></span>
        <span v-if="user.company">Company: {{ user.company }}<br></span>
        <span v-if="user.blog">URL: {{ user.blog }}</span>
      </p>
    </section>
    <section v-if="repos.length != 0" id="repos">
      <h4>Public repositories ({{ repos.length }})</h4>
      <ul>
        <li v-for="repo in repos" :key="repo.id">
          <a target="_blank" :href="repo.html_url">{{ repo.name }}</a><span v-if="repo.language || repo.description"> - </span><font :color="languages[repo.language] != undefined ? languages[repo.language].color : '#000000'">{{ repo.language }}</font> {{ repo.description }}
        </li>
      </ul>
    </section>
    <section v-if="stars.length != 0" id="stars">
      <h4>Starred repositories ({{ stars.length }})</h4>
      <ul>
        <li v-for="star in stars" :key="star.id">
          <a target="_blank" :href="star.html_url">{{ star.name }}</a><span v-if="star.language || star.description"> - </span><font :color="languages[star.language] != undefined ? languages[star.language].color : '#000000'">{{ star.language }}</font> {{ star.description }}
        </li>
      </ul>
    </section>
  </div>
</div>
</template>

<script>
import axios from 'axios'

const PER_PAGE = 100

async function getRepos(url, reposData, options){

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

export default {
  data(){
    return {
      user: {},
      repos: [],
      stars: [],
      loading: true
    }
  },
  async asyncData(){
    let { data } = await axios.get('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json')
    return { languages: data }
  },
  async created(){
    
    let fn1, fn2, fn3;
    // Get user info
    let url = `https://api.github.com/users/${process.env.userName}`
    if(this.$store.state.userETag != ''){
      fn1 =  axios.get(url, {
        headers: {
          'If-None-Match': this.$store.state.userETag
        },
        validateStatus: (status) => {
          return status < 500
        }
      })
    }else{
      fn1 = axios.get(url, {
        validateStatus: (status) => {
          return status < 500
        }
      })
    }

    // Get repositories
    url = `https://api.github.com/users/${process.env.userName}/repos`
    if(this.$store.state.reposETag != ''){
      fn2 = getRepos(url, this.repos, {
        headers: {
          'If-None-Match': this.$store.state.reposETag
        },
        validateStatus: (status) => {
          return status < 500
        }
      })
    }else{
      fn2 = getRepos(url, this.repos, {
        validateStatus: (status) => {
          return status < 500
        }
      })
    }

    // Get stars
    url = `https://api.github.com/users/${process.env.userName}/starred`
    if(this.$store.state.starsETag != ''){
      fn3 = getRepos(url, this.stars, {
        headers: {
          'If-None-Match': this.$store.state.starsETag
        },
        validateStatus: (status) => {
          return status < 500
        }
      })
    }else{
      fn3 = getRepos(url, this.stars, {
        validateStatus: (status) => {
          return status < 500
        }
      })
    }

    const [r1, r2, r3] = await Promise.all([fn1, fn2, fn3])
    if(r1.status == 200)
      this.user = r1.data
    else
      this.user = this.$store.state.user
    if(r2.status != 200)
      this.repos = this.$store.state.repos
    if(r3.status != 200)
      this.stars = this.$store.state.stars
    this.loading = false

    this.$store.commit('setUserETag', r1.headers['etag'])
    this.$store.commit('setReposETag', r2.headers['etag'])
    this.$store.commit('setStarsETag', r3.headers['etag'])
    this.$store.commit('setUser', this.user)
    this.$store.commit('setRepos', this.repos)
    this.$store.commit('setStars', this.stars)
  }
}

</script>
