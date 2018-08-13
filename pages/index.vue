<template>
<div>
  <h4>Profile</h4>
  <a target="_blank" :href="data.url"><img :src="data.img"></a>
  <p>
    {{ data.name }}<br>
    {{ data.bio }}<br>
    {{ data.location }}<br>
  </p>
  <h4>Public repositories ({{ data.repositories.length }})</h4>
  <ul>
    <li v-for="repo in data.repositories" :key="repo.id">
      <a target="_blank" :href="repo.html_url">{{ repo.name }}</a> - {{ repo.language }} {{ repo.description }}
    </li>
  </ul>
</div>
</template>

<script>
import axios from 'axios'

async function getRepos(url, reposData, page, options){
  const res = await axios.get(url+ `?per_page=100?page=${page}`, options)
  if(res.status == 200){
    if(reposData.length != 0)
      reposData = []
    reposData.concat(res.data)
    if(res.data.length == 100){
      getRepos(reposData, page++, count, options)
    }
  }
}

export default {
  async asyncData({store}){
    let ret = {}
    let userData = store.state.user
    let reposData = store.state.repos
    let starsData = store.state.stars
    
    // Get user info
    if(store.state.userEtag != ''){
      const res = await axios.get(`https://api.github.com/users/${process.env.userName}`, {
        headers: {
          'If-None-Match': store.state.userEtag
        }
      })
      if(res.status == 200)
        userData = res.data
    }else{
      const res = await axios.get(`https://api.github.com/users/${process.env.userName}`)
      if(res.status == 200)
        userData = res.data
    }

    // Get repositories
    let url = `https://api.github.com/users/${process.env.userName}/repos`
    if(store.state.reposEtag != ''){
      getRepos(url, reposData, 1, {
        headers: {
          'If-None-Match': store.state.reposEtag
        }
      })
    }else{
      getRepos(url, reposData, 1)
    }

    // Get stars
    url = `https://api.github.com/users/${process.env.userName}/starred`
    if(store.state.starsEtag != ''){
      getRepos(url, starsData, 1, {
        headers: {
          'If-None-Match': store.state.starsEtag
        }
      })
    }else{
      getRepos(url, starsData, 1)
    }
    ret.name = userData.name
    ret.img = userData.avatar_url
    ret.url = userData.html_url
    ret.bio = userData.bio
    ret.location = userData.location
    ret.repositories = reposData
    return {
      data: ret
    }
  }
}

</script>