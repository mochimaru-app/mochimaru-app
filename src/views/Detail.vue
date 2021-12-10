<template>
  <div class="main">
    <div v-for="postData in postDatas" v-bind:key="postData.id">
      <div v-if="$route.params.id === postData.id">
        <h1 class="facility">施設名: {{ postData.facility }}</h1>
        <h2 class="stars">{{ postData.checkValue }}</h2>

        <div class="sub-main">
          <div class="left">
            <div class="left-item">
              <h3>所在地:</h3>
              <p>{{ postData.adress }}</p>
            </div>

            <div class="left-item">
              <h3>金額:</h3>
              <p>{{ postData.money }}</p>
            </div>

            <div class="left-item">
              <h3>オススメポイント:</h3>
              <p>{{ postData.recommend }}</p>
            </div>
          </div>
          <div class="right">
            <div id="tab">
              <ul class="tabMenu">
                <li @click="isSelect('1')">Image</li>
                <li class="secondChild" @click="isSelect('2')">Map</li>
              </ul>
            </div>
            <div class="tabContents">
              <div v-if="isActive === '1'">
                <img class="img" src="postData.avatar" alt="画像・地図" />
              </div>
              <div v-else-if="isActive === '2'">マップが表示されるよ～</div>
            </div>
          </div>
        </div>

        <div class="date">
          投稿日：{{ postData.time.toDate().getFullYear() }}年{{
            postData.time.toDate().getMonth()
          }}月{{ postData.time.toDate().getDate() }}日
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
