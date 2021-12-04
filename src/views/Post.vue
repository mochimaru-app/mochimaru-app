<template>
  <div>
    <h1>Post page</h1>
    <h3>皆のオススメを投稿して共有しよう！</h3>
    <div>
      <h4>施設名</h4>
      <input v-model="postData.facility" />
    </div>
    <div>
      <h4>住所</h4>
      <input v-model="postData.address" />
    </div>
    <div>
      <h4>金額</h4>
      <input v-model="postData.money" />
    </div>
    <div>
      <h4>おすすめポイント</h4>
      <textarea v-model="postData.recommend"></textarea>
    </div>
    <div>
      <h4>評価</h4>
      <div class="stars">
        <input id="review01" type="radio" name="review" /><label
          for="review01"
          @click="setCheckValue(5)"
          >★</label
        >
        <input id="review02" type="radio" name="review" /><label
          for="review02"
          @click="setCheckValue(4)"
          >★</label
        >
        <input id="review03" type="radio" name="review" /><label
          for="review03"
          @click="setCheckValue(3)"
          >★</label
        >
        <input id="review04" type="radio" name="review" /><label
          for="review04"
          @click="setCheckValue(2)"
          >★</label
        >
        <input id="review05" type="radio" name="review" /><label
          for="review05"
          @click="setCheckValue(1)"
          >★</label
        >
      </div>
    </div>
    <div>
      <h4>map</h4>
      <input type="text" v-model="mapAddress" />
      <button type="button" @click="mapSearch">検索</button>
      <div>
        緯度：<input type="text" v-model="postData.lat" ref="lat" />
        経度：<input type="text" v-model="postData.lng" ref="lng" />
      </div>
      <div id="map" style="height: 400px; width: 500px"></div>
    </div>
    <button v-on:click="post">投稿！</button>
  </div>
</template>

<script>
/* global google */
export default {
  data() {
    return {
      postData: {
        facility: "",
        address: "",
        money: "",
        recommend: "",
        checkValue: "",
        lat: 0,
        lng: 0,
      },
      map: null,
      marker: null,
      geocoder: null,
      mapAddress: "",
      aft: false,
    }
  },
  mounted() {
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 35.6803997, lng: 139.7690174 },
      zoom: 12,
    })
    this.geocoder = new google.maps.Geocoder()
  },
  methods: {
    setCheckValue: function (value) {
      this.postData.checkValue = value
    },
    mapSearch() {
      this.geocoder.geocode(
        {
          address: this.mapAddress,
        },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (this.aft === true) {
              this.marker.setMap(null)
            }
            this.map.setCenter(results[0].geometry.location)
            this.marker = new google.maps.Marker({
              map: this.map,
              position: results[0].geometry.location,
              draggable: true,
            })
            this.postData.lat = results[0].geometry.location.lat()
            this.postData.lng = results[0].geometry.location.lng()
            this.aft = true
            // マーカーのドロップ（ドラッグ終了）時のイベント
            google.maps.event.addListener(
              this.marker,
              "dragend",
              function (ev) {
                console.log(ev.latLng.lat())
                console.log(ev.latLng.lng())
                const lat = ev.latLng.lat()
                const lng = ev.latLng.lng()
                // イベントの引数evの、プロパティ.latLngが緯度経度
                console.log(lat)
                console.log(lng)
                this.$ref.lat.value = lat
                this.$ref.lng.value = lng
                // this.postData.lat = lat
                // this.postData.lng = lng
              }
            )
          }
        }
      )
    },
    post: function () {
      console.log(this.postData)
    },
  },
}
</script>

<style scoped>
.stars {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
}
.stars input[type="radio"] {
  display: none;
}
.stars label {
  color: #d2d2d2;
  font-size: 30px;
  padding: 0 5px;
  cursor: pointer;
}
.stars label:hover,
.stars label:hover ~ label,
.stars input[type="radio"]:checked ~ label {
  color: #f8c601;
}
#map {
  margin: 0px auto;
}
</style>
