<template>
  <div id="app">
    <div class="title-field">
      <h1 class="title">Mypage</h1>
      <h2 class="sub-title">自分の投稿一覧</h2>
      <p class="intro">自分の投稿を確認し、編集、削除できます</p>
    </div>
    <div id="feas-sort-menu">
      <div class="feas-sort-star">
        <p class="midashi">投稿順に並び替え</p>
        <button @click="sort(2)" class="feas-sl-1-up">
          <i class="fas fa-chevron-up"></i>
        </button>
        <button @click="sort(3)" class="feas-sl-1-down">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
      <div class="feas-sort-date">
        <p class="midashi">評価順に並び替え</p>
        <button @click="sort(4)" class="feas-sl-1-up">
          <i class="fas fa-chevron-up"></i>
        </button>
        <button @click="sort(5)" class="feas-sl-1-down">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
    </div>

    <div v-if="currentuser">
      <div v-for="(postData, index) in postDatas" v-bind:key="index">
        <!-- == this.currentUser -->
        <div style="margin: 10px 8%">
          <div
            class="l-border l-p-t l-p-r l-p-b l-p-l"
            style="
              margin: 10px 5px;
              padding: 15px;
              word-break: break-all;
              color: #333;
              box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
              background-color: #5bc8ac;
              border-radius: 10px;
            "
          >
            <div
              style="
                background: rgba(255, 255, 255, 0.85);
                padding: 5px;
                border-radius: 5px;
              "
            >
              <div
                style="
                  border: 2px dashed #5bc8ac;
                  border-radius: 5px;
                  padding: 10px;
                "
              >
                <h3>
                  {{ postData.time.toDate().getFullYear() }}年{{
                    postData.time.toDate().getMonth() + 1
                  }}月{{ postData.time.toDate().getDate() }}日
                </h3>
                <h1 class="facility">スポット名: {{ postData.facility }}</h1>
                <h1 class="stars">{{ postData.checkValue }}</h1>
                <!-- {{postData.likeUsers}} -->

                <!-- postData.likeUsers.includes(postData.id) -->
                <i v-if="postData.likes > 0" class="fas fa-heart unlike-btn">{{
                  postData.likes
                }}</i>
                <i v-else class="fas fa-heart like-btn"></i>

                <div class="sub-main">
                  <div class="left">
                    <div class="left-item">
                      <h3>所在地:</h3>
                      <router-link
                        :to="{
                          name: 'Map',
                          params: {
                            lng: postData.lng,
                            lat: postData.lat,
                          },
                        }"
                        style="text-decoration: none"
                      >
                        <p class="addres">{{ postData.address }}</p>
                      </router-link>
                    </div>

                    <div class="left-item">
                      <h3>金額:</h3>
                      <p>{{ postData.money }}</p>
                    </div>

                    <div class="item">
                      <h3>オススメポイント:</h3>
                      <p>{{ postData.recommend }}</p>
                    </div>
                  </div>
                  <div class="right">
                    <div id="tab">
                      <ul class="tabMenu">
                        <li>Image</li>
                      </ul>
                    </div>
                    <div class="tabContents">
                      <div class="out">
                        <img src="" alt="" class="back" />
                        <div class="in">
                          <div
                            v-for="(avatar, index) in postData.avatars"
                            :key="index"
                          >
                            <div v-if="index === 0">
                              <label>
                                <input type="radio" name="slide" checked />
                                <span></span>
                                <a href="#0">
                                  <img :src="avatar" alt="画像・地図" />
                                </a>
                              </label>
                            </div>
                            <div v-else>
                              <label>
                                <input type="radio" name="slide" />
                                <span></span>
                                <a href="#index">
                                  <img :src="avatar" alt="画像・地図" />
                                </a>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="button-items">
                  <a
                    class="delete_button"
                    @click="deleteButton(index, postData.id)"
                  >
                    Delete
                  </a>
                  <router-link
                    :to="{
                      name: 'Edit',
                      params: {
                        postId: postData.id,
                      },
                    }"
                    style="text-decoration :none;"
                  >
                    <a class="edit_button" @click="editButton(index)" style=""> Edit </a>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>ログインして投稿しよう！</h3>
    </div>
  </div>
</template>

<script>
/* global google */
import firebase from "firebase"

export default {
  data() {
    return {
      isliked: [],
      currentuser: "",
      add: "",
      login: "false",
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
      map: null,
      marker: null,
      geocoder: null,
      mapAddress: "",
      aft: false,
      postDatas: [],
    }
  },
  mounted() {
    this.map = new google.maps.Map(document.getElementsByClassName("map"), {
      center: { lat: 35.6803997, lng: 139.7690174 },
      zoom: 12,
    })
    this.geocoder = new google.maps.Geocoder()
  },
  methods: {
    like(docId, index) {
      console.log(" した")
      firebase
        .firestore()
        .collection("post")
        .doc(docId)
        .collection("like")
        .doc(this.currentuser)
        .set({ isliked: true })
      this.isliked[index] = !this.isliked[index]
    },
    unlike(docId, index) {
      console.log("外した")
      firebase
        .firestore()
        .collection("post")
        .doc(docId)
        .collection("like")
        .doc(this.currentuser)
        .delete()
      firebase
        .firestore()
        .collection("post")
        .doc(docId)
        .collection("like")
        .doc(this.currentuser)
        .set({ isliked: false })
      this.isliked[index] = !this.isliked[index]
    },
    sort(index) {
      switch (index) {
        case 2:
          this.postDatas.sort(function (a, b) {
            if (a.time.seconds < b.time.seconds) return -1
            if (a.time.seconds > b.time.seconds) return 1
            return 0
          })
          break
        case 3:
          this.postDatas.sort(function (a, b) {
            if (a.time.seconds < b.time.seconds) return 1
            if (a.time.seconds > b.time.seconds) return -1
            return 0
          })
          break
        case 4:
          this.postDatas.sort(function (a, b) {
            if (a.checkValue < b.checkValue) return 1
            if (a.checkValue > b.checkValue) return -1
            return 0
          })
          break
        case 5:
          this.postDatas.sort(function (a, b) {
            if (a.checkValue < b.checkValue) return -1
            if (a.checkValue > b.checkValue) return 1
            return 0
          })
          break
        default:
      }
    },
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
            // console.log(results[0])
            this.marker = new google.maps.Marker({
              map: this.map,
              position: results[0].geometry.location,
              draggable: true,
            })
            this.lat = results[0].geometry.location.lat()
            this.lng = results[0].geometry.location.lng()
            // this.add = results[0].geometry.formatted_address
            // console.log(results[0].formatted_address)
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
                // console.log(ev)
              }.bind(this)
            )
          }
        }
      )
    },
    post: function () {
      // console.log(this.user.uid)
      // console.log(this.$auth.currentUser.uid)
      const time = new Date()
      const newDoc = firebase.firestore().collection("post").doc().id
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
        this.recommend !== ""
        // this.lat !== "" &&
        // this.lng !== ""
      ) {
        firebase.firestore().collection("post").doc(newDoc).set(comment)
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
        // history.back()
      } else {
        alert("必須項目を埋めてね。")
      }
    },

    deleteButton: function (index, postId) {
      if (confirm("削除します。よろしいですか？")) {
        // const getId = this.postDatas[index].id
        firebase.firestore().collection("post").doc(postId).delete()
        this.postDatas.splice(index, 1)
      }
    },
  },

  created() {
    firebase
      .firestore()
      .collection("post")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc, i) => {
          let postData = {}
          if (doc.data().postUser === this.user.uid) {
            this.login = "true"
            postData = { ...doc.data() }
            firebase
              .firestore()
              .collection("post")
              .doc(doc.id)
              .collection("like")
              .get()
              .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                  if (doc.id === this.currentuser && doc.data().isliked) {
                    this.isliked.push(true)
                  } else {
                    if (this.isliked[i]) {
                      this.isliked[i] = false
                    } else {
                      this.isliked.push(false)
                    }
                  }
                  console.log(postData)
                })
              })
            this.postDatas.push(postData)
          }
        })
      })
    this.currentuser = this.user.uid
    console.log(this.isliked)
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
}
</script>

<style scoped>
button {
  position: relative;
  float: center;
  margin: 10px;
  border-radius: 3px;
  font-size: 20px;
  color: #fff;
  text-decoration: none;
  background-color: #5bc8ac;
  border: none;
  border-bottom: 5px solid #47a08a;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;
}
button:hover,
button:active {
  -webkit-transform: translate(0px, 5px);
  -ms-transform: translate(0px, 5px);
  transform: translate(0px, 5px);
  border-bottom: 1px solid #2ecc71;
}
.title-field {
  background-image: url(../../public/back-img.png);
  background-repeat: repeat;
  background-color: rgba(255, 255, 255, 0.7);
  background-blend-mode: lighten;
}
.title {
  padding-top: 1.5rem;
}
.sub-title {
  margin-bottom: 0;
}
.intro {
  margin-top: 0;
  padding-bottom: 1.5rem;
}
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
.map {
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
  background: #5bc8ad91;
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
  background: #5bc8ad91;
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
  text-decoration: underline #5bc8ad91;
}
.stars {
  font-size: 40px;
  color: #5bc8ad91;
  -webkit-text-stroke: 0.5px #353535;
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
.item {
  border-top: 1px solid #ddd;
  padding-top: 24px;
  padding-bottom: 24px;
  width: 100%;
  align-items: center;
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
  width: 160px;
  color: #353535;
  list-style: none;
  background-color: #5bc8ad91;
  cursor: pointer;
  border-radius: 0.75em;
  font-weight: bold;
}
#tab .secondChild {
  border-right: none;
  margin-left: 20%;
}
.tabContents {
  width: 100%;
  padding: 20px;
}
.out {
  position: relative;
  margin-top: 50px;
}
.back {
  height: 250px;
}
.in {
  display: flex;
  justify-content: center;
}
.in img {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: 0.3s;
}
img {
  display: block;
  margin: 0 10%;
  width: 80%;
  height: 100%;
}
input {
  display: none;
}
label span {
  display: block;
  width: 15px;
  height: 15px;
  padding: 7px;
  margin: -40px 0 0 0;
  border-radius: 100%;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
label span::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: #00ffbf;
  opacity: 0.5;
  border-radius: 100%;
}

label input:checked + span::before {
  background: #000;
  opacity: 1;
}

label input:checked ~ img,
label input:checked ~ a img {
  opacity: 1;
  z-index: 1;
}
.button-items {
  display: flex;
  justify-content: center;
}
.delete_button {
  display: block;
  position: relative;
  margin-right: 10px;
  width: 160px;
  padding: 0.8em;
  text-align: center;
  text-decoration: none;
  background: #5bc8ad91;
  color: #353535;
  border-radius: 10px;
  font-weight: bold;
}
.delete_button:hover {
  color: #5bc8ad91;
  background: #7c7c7c;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}

.edit_button {
  display: block;
  position: relative;
  margin-right: 10px;
  width: 160px;
  padding: 0.8em;
  text-align: center;
  text-decoration: none;
  background: #5bc8ad91;
  color: #353535;
  border-radius: 10px;
  font-weight: bold;
}
.edit_button:hover {
  color: #5bc8ad91;
  background: #7c7c7c;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}
.like-btn {
  width: 25px;
  height: 30px;
  font-size: 25px;
  color: #808080;
  margin-left: 20px;
}

.unlike-btn {
  width: 25px;
  height: 30px;
  font-size: 25px;
  color: #e54747;
  margin-left: 20px;
}

.addres {
  display: block;
  margin: 0 auto;
  position: relative;
  width: 160px;
  padding: 0.8em;
  text-align: center;
  text-decoration: none;
  background: #5bc8ad91;
  color: #7c7c7c;
  border-radius: 10px;
}
.addres:hover {
  color: #5bc8ad91;
  background: #7c7c7c;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}
.slide {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

@keyframes slideshow {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  28% {
    opacity: 1;
  }
  38% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

.slide img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
  opacity: 0;
  animation: slideshow 8s linear infinite;
}

.slide img:nth-child(2) {
  animation-delay: 8s;
}

.slide img:last-child {
  animation-delay: 8s;
}
</style>
