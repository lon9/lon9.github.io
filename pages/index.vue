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
  <h4>Starred repositories ({{ data.stars.length }})</h4>
  <ul>
    <li v-for="star in data.stars" :key="star.id">
      <a target="_blank" :href="star.html_url">{{ star.name }}</a> - {{ star.language }} {{ star.description }}
    </li>
  </ul>
</div>
</template>

<script>
import axios from 'axios'

async function getRepos(url, reposData, page, options){
  const res = await axios.get(url+ `?per_page=100?page=${page}`, options)
  if(res.status == 200){
    if(reposData.length != 0 && page == 1)
      reposData = []
    Array.prototype.push.apply(reposData, res.data)
    if(res.data.length == 100){
      getRepos(url, reposData, page++, options)
    }
  }
  return res
}

export default {
  async asyncData({store}){
    let ret = {}
    let userData = store.state.user
    let reposData = store.state.repos
    let starsData = store.state.stars
    
    let fn1, fn2, fn3;
    // Get user info
    if(store.state.userEtag != ''){
      fn1 =  axios.get(`https://api.github.com/users/${process.env.userName}`, {
        headers: {
          'If-None-Match': store.state.userEtag
        }
      })
    }else{
      fn1 = axios.get(`https://api.github.com/users/${process.env.userName}`)
    }

    // Get repositories
    let url = `https://api.github.com/users/${process.env.userName}/repos`
    if(store.state.reposEtag != ''){
      fn2 = getRepos(url, reposData, 1, {
        headers: {
          'If-None-Match': store.state.reposEtag
        }
      })
    }else{
      fn2 = getRepos(url, reposData, 1)
    }

    // Get stars
    url = `https://api.github.com/users/${process.env.userName}/starred`
    if(store.state.starsEtag != ''){
      fn3 = getRepos(url, starsData, 1, {
        headers: {
          'If-None-Match': store.state.starsEtag
        }
      })
    }else{
      fn3 = getRepos(url, starsData, 1)
    }

    const [r1, r2, r3] = await Promise.all([fn1, fn2, fn3])
    if(r1.status == 200)
      userData = r1.data

    ret.name = userData.name
    ret.img = userData.avatar_url
    ret.url = userData.html_url
    ret.bio = userData.bio
    ret.location = userData.location
    ret.repositories = reposData
    ret.stars = starsData
    console.log(reposData)

    store.dispatch('setUser', r1.headers['ETag'], userData)
    store.dispatch('setRepos', r2.headers['Etag'], reposData)
    store.dispatch('setStars', r3.headers['Etag'], starsData)
    return {
      data: ret
    }
  }
}

</script>