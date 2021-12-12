<template>
  <div class="main">
    <div v-for="postData in postDatas" v-bind:key="postData.id">
      <div v-if="$route.params.id === postData.id">
        <div class="date">
          投稿日：{{ postData.time.toDate().getFullYear() }}年{{
            postData.time.toDate().getMonth() + 1
          }}月{{ postData.time.toDate().getDate() }}日
        </div>
        <h1 class="facility">スポット名: {{ postData.facility }}</h1>
        <h2 class="stars">{{ postData.checkValue }}</h2>

        <i
          v-if="postData.likes"
          class="fas fa-heart unlike-btn"
          @click="like(postData.id, postData.likes)"
        ></i>

        <i
          v-else
          class="fas fa-heart like-btn"
          @click="like(postData.id, postData.likes)"
        ></i>
        {{ postData.likes }}
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
            <div class="tab">
              <ul class="tabMenu">
                <li>Image</li>
              </ul>
            </div>
            <div class="tabContents">
              <div v-if="isActive === '1'">
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
              <div v-else-if="isActive === '2'">マップが表示されるよ～</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      postDatas: [],
      isActive: "1",
    }
  },
  methods: {
    isSelect: function (num) {
      this.isActive = num
    },
    like(docId, likeCount) {
      const count = likeCount + 1
      console.log(" した")
      firebase.firestore().collection("post").doc(docId).update({
        likes: count,
      })
      location.reload()
    },
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
.facility {
  text-decoration: underline #5bc8ad91;
}
.stars {
  font-size: 30px;
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
.tab {
  width: 100%;
  margin: 0 auto;
}
.tab .tabMenu {
  display: flex;
  justify-content: center;
  margin: 0;
}
.tab li {
  width: auto;
  padding: 10px 20px;
  width: 160px;
  color: #7c7c7c;
  list-style: none;
  background-color: #5bc8ad91;
  cursor: pointer;
  border-radius: 0.75em;
  font-weight: bold;
}
.tab .secondChild {
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
  height: 300px;
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
  font-weight: bold;
}
.addres:hover {
  color: #5bc8ad91;
  background: #7c7c7c;
  border: 1px solid #5bc8ad91;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}
</style>
