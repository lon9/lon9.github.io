<template>
  <div>
    <section v-if="Object.keys(user).length !== 0" id="profile">
      <Profile :user="user" />
    </section>
    <section v-if="repos.length !== 0">
      <LangList :langs="usedLanguages" :languages="languages" />
    </section>
    <section v-if="hasPageRepos.length !== 0" id="pages">
      <GithubPages :repos="hasPageRepos" />
    </section>
    <section v-if="repos.length !== 0" id="repos">
      <Repositories
        title="Public repositories"
        :repos="repos"
        :languages="languages"
      />
    </section>
    <section v-if="stars.length !== 0" id="stars">
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
import LangList from '~/components/LangList'

export default {
  components: {
    Profile,
    Repositories,
    GithubPages,
    LangList
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
    },
    usedLanguages() {
      let langs = {}
      this.$store.state.repos.forEach(repo => {
        if (!langs[repo.language])
          langs[repo.language] = { name: repo.language, num: 1, rate: 100 }
        else langs[repo.language].num++
      })
      for (const key in langs) {
        langs[key].rate =
          Math.round((langs[key].num / this.$store.state.repos.length) * 1000) /
          10
      }
      langs = Object.entries(langs).map(([key, value]) => value)
      langs.sort((a, b) => {
        if (a.num < b.num) {
          return 1
        }
        if (a.num > b.num) {
          return -1
        }
        return 0
      })
      return langs
    }
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('setUserAction', process.env.userName),
      store.dispatch('setReposAction', process.env.userName),
      store.dispatch('setStarsAction', process.env.userName)
    ])
  }
}
</script>
