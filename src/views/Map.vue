<template>
  <div>
    <div ref="map" style="height: 600px; width: auto"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: "",
    }
  },
  mounted() {
    let timer = setInterval(() => {
      if (window.google) {
        clearInterval(timer)
        this.map = new window.google.maps.Map(this.$refs.map, {
          center: { lat: 35.6803997, lng: 139.7690174 },
          zoom: 12,
        })
      }
    }, 500)
  },
}
</script>
