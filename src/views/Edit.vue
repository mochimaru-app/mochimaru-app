<template>
  <div id="app">
    <div>
      <div class="Form">
        <div class="Form-Item">
          <p class="Form-Item-Label">
            <span class="Form-Item-Label-Required">必須</span>スポット名
          </p>
          <input
            type="text"
            class="Form-Item-Input"
            placeholder="例）"
            v-model="facility"
          />
        </div>

        <div class="Form-Item">
          <p class="Form-Item-Label">
            <span class="Form-Item-Label-Required">必須</span>金額
          </p>
          <input
            type="text"
            class="Form-Item-Input"
            placeholder="例）"
            v-model="money"
          />
        </div>

        <div class="Form-Item">
          <p class="Form-Item-Label">
            <span class="Form-Item-Label-Required">必須</span>おすすめポイント
          </p>
          <textarea
            type="text"
            class="Form-Item-Textarea"
            placeholder="例）"
            v-model="recommend"
          />
        </div>

        <div>
          <h2>画像</h2>
          <!-- <input type="file" /> -->
          <p id="error" v-show="error">{{ error }}</p>
          <label>
            <div>
              <input
                type="file"
                multiple
                id="avatar_name"
                accept=".jpg, .jpeg, .png, .svg, .gif"
                @change="onImageChange"
              />
            </div>
            <div v-if="avatars">
              <div v-for="(avatar, index) in avatars" v-bind:key="index">
                <img :src="avatar" alt="Avatar" class="image" />
              </div>
            </div>
          </label>
        </div>
        <div>
          <h2>評価</h2>
          <div class="stars">
            <input id="review01" type="radio" name="review" /><label
              for="review01"
              @click="setCheckValue1"
              >★</label
            >
            <input id="review02" type="radio" name="review" /><label
              for="review02"
              @click="setCheckValue2"
              >★</label
            >
            <input id="review03" type="radio" name="review" /><label
              for="review03"
              @click="setCheckValue3"
              >★</label
            >
            <input id="review04" type="radio" name="review" /><label
              for="review04"
              @click="setCheckValue4"
              >★</label
            >
            <input id="review05" type="radio" name="review" /><label
              for="review05"
              @click="setCheckValue5"
              >★</label
            >
          </div>
        </div>
        <div><span class="Form-Item-Label-Required">必須</span>
          <h2>map</h2>
          <input class="search-input" type="text" v-model="mapAddress" />
          <button type="button" @click="mapSearch">検索</button>
          <div>
            緯度：<input type="text" v-model="lat" ref="lat" /> 経度：<input
              type="text"
              v-model="lng"
              ref="lng"
            />
          </div>
          <div ref="map" id="map" style="height: 400px; width: 500px"></div>
        </div>
        <router-link to="/mypage">
        <button @click="editFirebase" >編集！</button>
        </router-link>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
/* global google */
import firebase from "firebase"

export default {
  props: {
    postId: {
      type: String,
    },
  },
  data() {
    return {
      add: "",
      // time: "",
      login: "false",
      edit: "false",
      // currentUser:"",
      postUser: "",
      avatars: [],
      message: "",
      error: "",
      facility: "",
      address: "",
      money: "",
      recommend: "",
      checkValue: "",
      picture: "",
      lat: 0,
      lng: 0,
      map: "",
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
    let timer = setInterval(() => {
      if (window.google) {
        clearInterval(timer)

        let markers = new Array()
        markers = new window.google.maps.Marker({
          position: {
            lat: Number(this.lat),
            lng: Number(this.lng),
          },
          map: this.map,
        })

        markerInfo(markers)
      }
    }, 500)
    function markerInfo(marker) {
      window.google.maps.event.addListener(marker, "mouseover", function () {
        new window.google.maps.InfoWindow({}).open(marker.getMap(), marker)
      })
    }
  },
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    onImageChange(e) {
      const images = e.target.files || e.dataTransfer.files
      for (let i = 0; i < images.length; i++) {
        this.getBase64(images[i])
          .then((image) => (this.avatars[i] = image))
          .catch((error) =>
            this.setError(error, "画像のアップロードに失敗しました。")
          )
      }
    },
    setCheckValue1: function () {
      this.checkValue = "★★★★★"
    },
    setCheckValue2: function () {
      this.checkValue = "★★★★"
    },
    setCheckValue3: function () {
      this.checkValue = "★★★"
    },
    setCheckValue4: function () {
      this.checkValue = "★★"
    },
    setCheckValue5: function () {
      this.checkValue = "★"
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
            console.log(results[0])
            this.marker = new google.maps.Marker({
              map: this.map,
              position: results[0].geometry.location,
              draggable: true,
            })
            // this.add = results[0].geometry.formatted_address
            console.log(results[0].formatted_address)
            this.aft = true
            // マーカーのドロップ（ドラッグ終了）時のイベント
            google.maps.event.addListener(
              this.marker,
              "dragend",
              function (ev) {
                const lat = ev.latLng.lat()
                const lng = ev.latLng.lng()
                this.lat = lat
                this.lng = lng
                console.log(ev)
              }.bind(this)
            )
          }
        }
      )
    },
    mounted() {},
    editFirebase: function () {
      if (confirm("投稿を編集します。よろしいですか？")) {
        // console.log(this.user.uid)
        // console.log(this.$auth.currentUser.uid)
        const time = new Date()
        const newDoc = this.postId
        const comment = {
          facility: this.facility,
          address: this.address,
          money: this.money,
          recommend: this.recommend,
          checkValue: this.checkValue,
          avatars: this.avatars,
          postUser: this.user.uid,
          edit: this.edit,
          lat: this.lat,
          lng: this.lng,
          id: newDoc,
          time: time,
        }
        if (
          this.facility !== "" &&
          this.address !== "" &&
          this.money !== "" &&
          this.recommend !== "" &&
          this.lat !== "" &&
          this.lng !== ""
          // this.checkValue !== ""
        ) {
          firebase.firestore().collection("post").doc(this.postId).set(comment)
          this.id += 1
          this.postDatas.push(comment)
          this.postUser = ""
          this.facility = ""
          this.address = ""
          this.money = ""
          this.recommend = ""
          this.checkValue = ""
          this.avatars = []
          this.lat = ""
          this.lng = ""
          firebase.firestore().collection("post").doc(this.postId).delete()
          this.router.push("/mypage")
        } else {
          alert("必須項目を埋めてね。")
        }
      }
    },
  },

  created() {
    firebase
      .firestore()
      .collection("post")
      .doc(this.postId)
      .get()
      .then((doc) => {
        console.log(this.postId)
        console.log(doc.data())
        this.facility = doc.data().facility
        this.address = doc.data().address
        this.money = doc.data().money
        this.recommend = doc.data().recommend
        this.avatars = doc.data().avatars
        this.checkValue = doc.data().checkValue
        this.lat = doc.data().lat
        this.lng = doc.data().lng
        this.likeUsers = doc.data().likeUsers

        console.log(this.lat)
      })
  },
  computed: {
    user() {
      return this.$auth.currentUser
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
.search-input {
  width: 400px;
  margin-bottom: 20px;
}
#map {
  margin: 0px auto;
  margin-top: 20px;
  margin-bottom: 60px;
}
.stars_eva {
  color: #f8c601;
}

.nostar {
  color: #d2d2d2;
}

.Form {
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;
}
@media screen and (max-width: 480px) {
  .Form {
    margin-top: 40px;
  }
}
.Form-Item {
  border-top: 1px solid #ddd;
  padding-top: 24px;
  padding-bottom: 24px;
  width: 100%;
  display: flex;
  align-items: center;
}
@media screen and (max-width: 480px) {
  .Form-Item {
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 16px;
    padding-bottom: 16px;
    flex-wrap: wrap;
  }
}
.Form-Item:nth-child(5) {
  border-bottom: 1px solid #ddd;
}
.Form-Item-Label {
  width: 100%;
  max-width: 248px;
  letter-spacing: 0.05em;
  font-weight: bold;
  font-size: 18px;
}
@media screen and (max-width: 480px) {
  .Form-Item-Label {
    max-width: inherit;
    display: flex;
    align-items: center;
    font-size: 15px;
  }
}
.Form-Item-Label.isMsg {
  margin-top: 8px;
  margin-bottom: auto;
}
@media screen and (max-width: 480px) {
  .Form-Item-Label.isMsg {
    margin-top: 0;
  }
}
.Form-Item-Label-Required {
  border-radius: 6px;
  margin-right: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 48px;
  display: inline-block;
  text-align: center;
  background: #5bc8ac;
  color: #fff;
  font-size: 14px;
}
@media screen and (max-width: 480px) {
  .Form-Item-Label-Required {
    border-radius: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
    width: 32px;
    font-size: 10px;
  }
}
.Form-Item-Input {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-left: 40px;
  padding-left: 1em;
  padding-right: 1em;
  height: 48px;
  flex: 1;
  width: 100%;
  max-width: 410px;
  background: #eaedf2;
  font-size: 18px;
  border: 7px solid #59c98f;
}
@media screen and (max-width: 480px) {
  .Form-Item-Input {
    margin-left: 0;
    margin-top: 18px;
    height: 40px;
    flex: inherit;
    font-size: 15px;
  }
  .Form-Item-Textarea {
    margin-left: 0;
    margin-top: 18px;
    height: 100px;
    flex: inherit;
    font-size: 15px;
  }
}
.Form-Item-Textarea {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-left: 40px;
  padding-left: 1em;
  padding-right: 1em;
  height: 216px;
  flex: 1;
  width: 100%;
  max-width: 410px;
  background: #eaedf2;
  font-size: 18px;
  border: 7px solid #59c98f;
}
@media screen and (max-width: 480px) {
  .Form-Item-Textarea {
    margin-top: 18px;
    margin-left: 0;
    height: 200px;
    flex: inherit;
    font-size: 15px;
  }
}
.Form-Btn {
  border-radius: 6px;
  margin-top: 32px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 280px;
  display: block;
  letter-spacing: 0.05em;
  background: #5bc8ac;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}
@media screen and (max-width: 480px) {
  .Form-Btn {
    margin-top: 24px;
    padding-top: 8px;
    padding-bottom: 8px;
    width: 160px;
    font-size: 16px;
  }
}
#feas-sort-menu {
  text-align: center;
  margin: 1em auto;
  padding: 1em 0;
}
/* id=feas-sort-menu内のすべてのdivタグに適用 */
#feas-sort-menu div {
  display: inline-block;
  width: 20%;
  text-align: center;
  border-left: 1px solid #dadee6;
}
/* その最初のdivタグのみに適用 */
#feas-sort-menu div:first-child {
  border-left: none;
}
/* 見出しに適用 */
#feas-sort-menu p.midashi {
  display: block;
  font-weight: bold;
  color: #5d5d5d;
  margin-bottom: 0.5em;
  line-height: 1;
}
/* すべてのソートボタンに適用 */
#feas-sort-menu span {
  color: white;
  display: inline-block;
  width: 3em;
  height: 2em;
  background-color: #54bee6;
  border-radius: 3px;
  margin: 0 3px;
}

.facility {
  text-decoration: underline #5bc8ac;
}
.stars {
  font-size: 30px;
  color: #5bc8ac;
}
.sub-main {
  display: flex;
  justify-content: center;
}
.left {
  width: 35%;
  padding-left: 15%;
  padding-top: 50px;
}
.left-item {
  border-top: 1px solid #ddd;
  padding-top: 24px;
  padding-bottom: 24px;
  width: 100%;
  display: flex;
  align-items: center;
}
.left-item:nth-child(3) {
  border-bottom: 1px solid #ddd;
}
.left-item h3 {
  width: 40%;
}
.right {
  width: 35%;
  padding-right: 15%;
}
#tab {
  width: 100%;
  margin: 0 auto;
}
#tab .tabMenu {
  display: flex;
  justify-content: center;
  margin: 0;
}
#tab li {
  width: auto;
  padding: 10px 20px;
  color: white;
  list-style: none;
  background-color: #5bc8ac;
  cursor: pointer;
  border-radius: 0.75em;
}
#tab .secondChild {
  border-right: none;
  margin-left: 20%;
}
.tabContents {
  width: 100%;
  padding: 20px;
}
.img {
  width: 80%;
  height: 80%;
  padding: 10%;
}
</style>
