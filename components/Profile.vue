<template>
  <div>
    <a target="_blank" :href="user.html_url"
      ><img :src="user.avatar_url" width="128" height="128" alt="avatar"
    /></a>

    <p>
      <span v-if="user.name">Name: {{ user.name }}<br /></span>
      <span v-if="user.bio">Bio: {{ user.bio }}<br /></span>
      <span v-if="user.location">Location: {{ user.location }}<br /></span>
      <span v-if="user.email">Email: {{ user.email }}<br /></span>
      <span v-if="user.company">Company: {{ user.company }}<br /></span>
      <span v-if="user.blog"
        >URL: <a target="_blank" :href="user.blog">{{ user.blog }}</a></span
      >
    </p>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script>
