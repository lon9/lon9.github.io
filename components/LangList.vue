<template>
  <div>
    <h4>Used languages (in public repos)</h4>
    <table>
      <thead>
        <tr>
          <th>
            name
          </th>
          <th>
            num
          </th>
          <th>
            rate
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lang in langs" :key="lang.name">
          <td>
            <font
              :color="
                languages[lang.name] != undefined
                  ? languages[lang.name].color
                  : '#000000'
              "
            >
              <span v-if="!lang.name">
                Doc
              </span>
              <span v-else>
                {{ lang.name }}
              </span>
            </font>
          </td>
          <td>
            {{ lang.num }}
          </td>
          <td>
            {{ lang.rate }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    langs: {
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
