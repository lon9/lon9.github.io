<template>
  <div>
    <h4>Contents</h4>
    <ul>
      <li v-for="repo in repos" :key="repo.id">
        <a
          target="_blank"
          :href="`https://${repo.owner.login}.github.io/${repo.name}`"
          >{{ repo.name }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    repos: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}
</script>
