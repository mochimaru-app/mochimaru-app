<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
// import firebase from "firebase"
export default {
  created() {
    console.log(this.user.uid)
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
}
</script>
