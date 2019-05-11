<template>
  <div>
    <h4>{{ title }} ({{ repos.length }})</h4>
    <ul>
      <li v-for="repo in repos" :key="repo.id">
        <a target="_blank" :href="repo.html_url">{{ repo.name }}</a
        ><span v-if="repo.language || repo.description"> - </span
        ><font
          :color="
            languages[repo.language] != undefined
              ? languages[repo.language].color
              : '#000000'
          "
        >
          {{ repo.language }}
        </font>
        {{ repo.description }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    repos: {
      type: Array,
      default: () => {
        return []
      }
    },
    languages: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
