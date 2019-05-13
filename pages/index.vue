<template>
  <div>
    <section v-if="Object.keys(user).length != 0" id="profile">
      <Profile :user="user" />
    </section>
    <section v-if="hasPageRepos.length != 0" id="pages">
      <GithubPages :repos="hasPageRepos" />
    </section>
    <section v-if="repos.length != 0" id="repos">
      <Repositories
        title="Public repositories"
        :repos="repos"
        :languages="languages"
      />
    </section>
    <section v-if="stars.length != 0" id="stars">
      <Repositories
        title="Starred repositories"
        :repos="stars"
        :languages="languages"
      />
    </section>
  </div>
</template>

<script>
import Profile from '~/components/Profile'
import Repositories from '~/components/Repositories'
import GithubPages from '~/components/GithubPages'

export default {
  components: {
    Profile,
    Repositories,
    GithubPages
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    repos() {
      return this.$store.state.repos
    },
    stars() {
      return this.$store.state.stars
    },
    hasPageRepos() {
      return this.$store.state.repos.filter(repo => {
        return repo.has_pages && repo.name !== `${this.user.login}.github.io`
      })
    },
    languages() {
      return this.$store.state.languages
    }
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('setUserAction', process.env.userName),
      store.dispatch('setReposAction', process.env.userName),
      store.dispatch('setStarsAction', process.env.userName)
    ])
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch('setUserAction', process.env.userName),
      this.$store.dispatch('setReposAction', process.env.userName),
      this.$store.dispatch('setStarsAction', process.env.userName)
    ])
  }
}
</script>
