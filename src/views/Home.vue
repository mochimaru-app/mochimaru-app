<template>
  <div class="home">
    <div class="title">
      <div>
        <img src="../../public/home_top.png" alt="" class="top-img" />
        <p class="theme">おすすめスポット シェアリングサービス</p>
        <h1 class="app-title">しぇあすぽ</h1>
      </div>
    </div>
    <div class="introduction">
      <div class="content" id="content1">
        <div class="text">
          <h2>あなたのおすすめスポットを<br />シェアしよう</h2>
          <p class="detail-text">
            あなたが訪れたことがある、おすすめのスポットをみんなにシェアしましょう<br />
            おすすめポイントや星評価でポイントをアピールできます
          </p>
          <div v-if="user.uid">
            <router-link to="/post" class="button"
              >Post <i class="fas fa-angle-right"></i
            ></router-link>
          </div>
          <div v-else>
            <div class="button"  @click="login">
              ログインして投稿しよう！<i class="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
        <div class="image">
          <img src="../../public/home_Share.png" alt="" class="content-img" />
        </div>
      </div>
      <div class="content" id="content2">
        <div class="text">
          <h2>みんなのおすすめスポットを<br />見つけよう</h2>
          <p class="detail-text">
            Map上でみんなの投稿したおすすめスポットを見ることができます<br />
            気になった投稿は詳細を見てリサーチしてみましょう
          </p>
          <router-link to="/map/139.7690174/35.6803997" class="button"
            >Map <i class="fas fa-angle-right"></i
          ></router-link>
        </div>
        <div class="image">
          <img src="../../public/home_Map.png" alt="" class="content-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue"

// export default {
//   name: "Home",
//   components: {
//     HelloWorld,
//   },
// }
import firebase from "firebase"
export default {
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log({ result })
          if (result.user) {
            this.isLogin = true
          }
        })
    },
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
  created() {
    console.log(this.user.uid)
  },
}
</script>
<style scoped>
h1 {
  font-size: 3rem;
}
h2 {
  text-align: left;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.top-img {
  width: 500px;
}
.theme {
  margin-top: 5%;
  margin-bottom: 0%;
}
.app-title {
  margin-top: 0%;
  color: #51ac95;
}
.content {
  display: flex;
  margin-left: 5rem;
  margin-right: 5rem;
  margin-bottom: 3rem;
}
.text {
  text-align: left;
}
.detail-text {
  text-align: left;
}
.button {
  margin-top: 25px;
  font-size: 1.5rem;
  display: inline-block;
  padding: 0.3em 1em;
  text-decoration: none;
  color: #5bc8ac;
  border: solid 2px #5bc8ac;
  border-radius: 3px;
  transition: 0.4s;
}
.button:hover {
  background: #5bc8ac;
  color: white;
}
.image {
  margin-left: auto;
}
.content-img {
  width: 500px;
}
@media screen and (max-width: 1000px) {
  .content {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
}
</style>
