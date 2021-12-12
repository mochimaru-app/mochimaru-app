<template>
  <div>
    <div class="title-field">
      <h1 class="title">Map</h1>
      <p class="intro">
        Map上のピンにマウスをかざすと投稿内容が見られます<br />
        気になるスポットを探して詳細を見てみよう！
      </p>
    </div>
    <div ref="map" style="height: 100vh; width: auto" class="map"></div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  props: {
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
  },
  data() {
    return {
      map: "",
      myLatLng: { lat: 35.6803997, lng: 139.7690174 },
      postDatas: [],
    }
  },
  mounted() {
    let timer = setInterval(() => {
      console.log(this.lat)
      if (window.google) {
        clearInterval(timer)
        this.map = new window.google.maps.Map(this.$refs.map, {
          center: { lat: Number(this.lat), lng: Number(this.lng) },
          zoom: 9,
        })

        let markers = new Array()
        for (let i = 0; i < this.postDatas.length; i++) {
          markers[i] = new window.google.maps.Marker({
            position: {
              lat: Number(this.postDatas[i].lat),
              lng: Number(this.postDatas[i].lng),
            },
            map: this.map,
          })
          let contentString =
            "<p>スポット名:" +
            this.postDatas[i].facility +
            "</p>" +
            "<p>住所:" +
            this.postDatas[i].address +
            "</p>" +
            "<p>評価:" +
            this.postDatas[i].checkValue +
            "</p>" +
            ' <a href="../../detail/' +
            this.postDatas[i].id +
            '">' +
            "投稿詳細へ</a> "

          markerInfo(markers[i], contentString)
        }
      }
    }, 500)
    function markerInfo(marker, contentString) {
      window.google.maps.event.addListener(marker, "mouseover", function () {
        new window.google.maps.InfoWindow({
          content: contentString,
        }).open(marker.getMap(), marker)
      })
    }
  },
  created() {
    firebase
      .firestore()
      .collection("post")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.postDatas.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
  },
}
</script>

<style scoped>
.title-field {
  background-image: url(../../public/back-img.png);
  background-repeat: repeat;
  background-color: rgba(255, 255, 255, 0.7);
  background-blend-mode: lighten;
}
.title {
  padding-top: 1.5rem;
}
.intro {
  padding-bottom: 1.5rem;
}
.map {
  margin-top: 5rem;
}
</style>