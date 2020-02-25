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
            <span v-if="!lang.name">
              Document
            </span>
            <font
              v-else
              :color="
                languages[lang.name] != undefined
                  ? languages[lang.name].color
                  : '#000000'
              "
            >
              {{ lang.name }}
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
