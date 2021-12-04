<template>
  <div id="app">
    <upload v-model="picture" />
    <img :src="picture" />
  </div>
</template>

<script>
import Upload from "../views/Post.vue"

export default {
  name: "app",
  components: { Upload },
  data() {
    return {
      picture: null,
    }
  },
}
</script>
