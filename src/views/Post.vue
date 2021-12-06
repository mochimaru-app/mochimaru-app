<template>
  <div>
    <h1>Post page</h1>
    <h3>皆のオススメを投稿して共有しよう！</h3>
    <div class="Form">
      <div class="Form-Item">
        <p class="Form-Item-Label">
          <span class="Form-Item-Label-Required">必須</span>施設名
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
          <span class="Form-Item-Label-Required">必須</span>住所
        </p>
        <input
          type="text"
          class="Form-Item-Input"
          placeholder="例）"
          v-model="address"
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
        <input
          type="text"
          class="Form-Item-Input"
          placeholder="例）"
          v-model="recommend"
        />
      </div>
    </div>

    <div>
      <h2>画像</h2>
      <!-- <input type="file" /> -->
      <p id="error" v-show="error">{{ error }}</p>
      <label>
        <div v-if="avatar">
          <img :src="avatar" alt="Avatar" class="image" />
        </div>
        <div>
          <input
            type="file"
            id="avatar_name"
            accept="image/jpeg, image/png"
            @change="onImageChange"
          />
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
    <div>
      <h4>map</h4>
      <input class="search-input" type="text" v-model="mapAddress" />
      <button type="button" @click="mapSearch">検索</button>
      <div>
        緯度：<input type="text" v-model="lat" ref="lat" /> 経度：<input
          type="text"
          v-model="lng"
          ref="lng"
        />
      </div>
      <div id="map" style="height: 400px; width: 500px"></div>
    </div>

    <button v-on:click="post">投稿！</button>

    <h2><br /><br />一覧</h2>
    <div v-for="(postData, index) in postDatas" v-bind:key="index">
      <span class="answer">施設名</span>{{ postData.facility }}<br />
      <span class="answer">住所</span>{{ postData.address }} <br />
      <span class="answer">金額</span>{{ postData.money }}<br />
      <span class="answer">おすすめポイント</span>{{ postData.recommend }}<br />
      <!-- <span class="answer">画像</span>url({{ postData.avatar }})<br /> -->
      <img v-bind:src="postData.avatar" />
      <span class="answer"><br />評価</span>
      <div class="stars_eva">
        <div v-if="postData.checkValue == 5">★★★★★</div>
        <div v-else-if="postData.checkValue == 4">★★★★</div>
        <div v-else-if="postData.checkValue == 3">★★★</div>
        <div v-else-if="postData.checkValue == 2">★★</div>
        <div v-else-if="postData.checkValue == 1">★</div>
        <div v-else class="nostar">★</div>
      </div>

      <!-- <div class="border"></div> -->
      <button class="delete__button" @click="deleteButton(index)">削除</button>
      <br /><br /><br />
    </div>
  </div>
</template>

<script>
/* global google */
import firebase from "firebase"

export default {
  data() {
    return {
      avatar: "",
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
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 35.6803997, lng: 139.7690174 },
      zoom: 12,
    })
    this.geocoder = new google.maps.Geocoder()
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
      this.getBase64(images[0])
        .then((image) => (this.avatar = image))
        .catch((error) =>
          this.setError(error, "画像のアップロードに失敗しました。")
        )
    },
    setCheckValue1: function() {
      this.checkValue = "★★★★★"
    },
    setCheckValue2: function() {
      this.checkValue = "★★★★☆"
    },
    setCheckValue3: function() {
      this.checkValue = "★★★☆☆"
    },
    setCheckValue4: function() {
      this.checkValue = "★★☆☆☆"
    },
    setCheckValue5: function() {
      this.checkValue = "★☆☆☆☆"

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
            this.lat = results[0].geometry.location.lat()
            this.lng = results[0].geometry.location.lng()
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
              }.bind(this)
            )
          }
        }
      )
    },
    post: function () {
      console.log(this.facility)
      const newDoc = firebase.firestore().collection("post").doc().id
      const comment = {
        facility: this.facility,
        address: this.address,
        money: this.money,
        recommend: this.recommend,
        checkValue: this.checkValue,
        avatar: this.avatar,
        lat: this.lat,
        lng: this.lng,

        // checkValue: this.checkValue,
        id: newDoc,
        // numberRate: this.changedRate,
        // password: this.lock__password,
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
        firebase.firestore().collection("post").doc(newDoc).set(comment)
        this.id += 1
        this.postDatas.push(comment)
        this.facility = ""
        this.address = ""
        this.money = ""
        this.recommend = ""
        this.checkValue = ""
        this.avatar = ""
        this.lat = ""
        this.lng = ""
      }
    },
    deleteButton: function (index) {
      const getId = this.postDatas[index].id
      // const getPassword = this.thoughts[index].password
      firebase.firestore().collection("post").doc(getId).delete()
      this.postDatas.splice(index, 1)
      // this.unlock__password.splice(index, 1)
    },
  },

  created() {
    firebase
      .firestore()
      .collection("post")
      .get()
      .then((snapshot) => {
        for (let i = 0; i < snapshot.docs.length; i++) {
          this.postDatas.push(snapshot.docs[i].data())
        }
      })
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
}
@media screen and (max-width: 480px) {
  .Form-Item-Input {
    margin-left: 0;
    margin-top: 18px;
    height: 40px;
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
</style>
