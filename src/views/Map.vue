<template>
  <div>
    <div ref="map" style="height: 100vh; width: auto"></div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      map: "",
      myLatLng: { lat: 35.6803997, lng: 139.7690174 },
      postDatas: [],
    }
  },
  mounted() {
    let timer = setInterval(() => {
      if (window.google) {
        clearInterval(timer)
        this.map = new window.google.maps.Map(this.$refs.map, {
          center: this.myLatLng,
          zoom: 12,
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
            "<p>施設名:" +
            this.postDatas[i].facility +
            "</p>" +
            "<p>住所:" +
            this.postDatas[i].adress +
            "</p>" +
            "<p>評価:" +
            this.postDatas[i].checkValue +
            "</p>" +
            '<p>詳細: <a href="../detail/' + this.postDatas[i].id + '">' +
            "投稿詳細へ</a> " +
            "</p>"
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
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.postDatas.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });
  }
}
</script>
