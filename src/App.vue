<template>
  <div id="app">
    <div v-if="user.uid">
      ようこそ{{ $auth.currentUser.displayName }}さん
       <router-link to="/" style="text-decoration: none">
      <a @click="logOut" class="log-out-button"><span>Log Out</span></a></router-link
      >
      <router-link to="/post">
        <button id="postButton" class="postButton" onclick="href='/post'">
          +
        </button>
      </router-link>
    </div>
    <div v-else>
      <router-link to="/" style="text-decoration: none">
        <a @click="login" class="log-in-button"
          ><span>Log In</span></a
        ></router-link
      >

      <!-- <div class="signed-in-user-profile" v-if="user">
      <div>ようこそ{{user.displayName}}</div>
      </div>
      <div v-else>No User Signed In</div> -->
    </div>

    <!--ハンバーガーメニューのボタン-->
    <div class="hamburger_btn" v-on:click="ActiveBtn = !ActiveBtn">
      <span
        class="line line_01"
        v-bind:class="{ btn_line01: ActiveBtn }"
      ></span>
      <span
        class="line line_02"
        v-bind:class="{ btn_line02: ActiveBtn }"
      ></span>
      <span
        class="line line_03"
        v-bind:class="{ btn_line03: ActiveBtn }"
      ></span>
    </div>
    <div class="hamburger_btn" v-on:click="ActiveBtn = !ActiveBtn">
      <span
        class="line line_01"
        v-bind:class="{ btn_line01: ActiveBtn }"
      ></span>
      <span
        class="line line_02"
        v-bind:class="{ btn_line02: ActiveBtn }"
      ></span>
      <span
        class="line line_03"
        v-bind:class="{ btn_line03: ActiveBtn }"
      ></span>
    </div>

    <!--サイドバー-->
    <transition name="menu">
      <div class="menu" v-show="ActiveBtn">
        <ul>
          <li v-on:click="ActiveBtn = !ActiveBtn">
            <router-link to="/"><i class="fas fa-home"></i> Home</router-link>
          </li>
          <!-- <router-link to="/about">About</router-link> -->
          <!-- <router-link to="/post">Post</router-link> -->
          <li v-on:click="ActiveBtn = !ActiveBtn">
            <router-link to="/map/139.7690174/35.6803997"
              ><i class="fas fa-map-marker-alt"></i> Map</router-link
            >
          </li>
          <!-- <router-link to="/detail">Detail</router-link> -->
          <li v-on:click="ActiveBtn = !ActiveBtn">
            <router-link to="/mypage"
              ><i class="fas fa-user-circle"></i> Mypage</router-link
            >
          </li>
        </ul>
      </div>
    </transition>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase"
// import router from "vue-router";

export default {
  data() {
    return {
      ActiveBtn: false,
    }
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
  created() {},
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log({ result })
        })
    },
    logOut() {
      firebase.auth().signOut().then()
      // location.reload(true)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.log-out-button {
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
.log-out-button:hover {
  color: #5bc8ad91;
  background: #7c7c7c;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}

.log-in-button {
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
.log-in-button:hover {
  color: #5bc8ad91;
  background: #7c7c7c;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}
/*ボタン*/
.hamburger_btn {
  position: fixed; /*常に最上部に表示したいので固定*/
  top: 0;
  right: 0;
  width: 70px;
  height: 72px;
  cursor: pointer;
  z-index: 50;
}

.hamburger_btn .line {
  position: absolute;
  top: 0;
  left: 20px;
  width: 32px;
  height: 2px;
  background: #333333;
  text-align: center;
}

.hamburger_btn .line_01 {
  top: 16px;
  transition: 0.4s ease;
}
.hamburger_btn .line_02 {
  top: 26px;
  transition: 0.4s ease;
}
.hamburger_btn .line_03 {
  top: 36px;
  transition: 0.4s ease;
}

.btn_line01 {
  transform: translateY(10px) rotate(-45deg);
  transition: 0.4s ease;
}
.btn_line02 {
  transition: 0.4s ease;
  opacity: 0;
}
.btn_line03 {
  transform: translateY(-10px) rotate(45deg);
  transition: 0.4s ease;
}

/*サイドバー*/
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.4s;
}
.menu-enter,
.menu-leave-to {
  opacity: 0;
}
.menu-leave,
.menu-enter-to {
  opacity: 1;
}

.menu li {
  list-style: none;
  line-height: 1;
  padding: 1rem;
}
.menu li :hover {
  color: rgb(255, 255, 255);
  list-style: none;
  line-height: 1;
}
.menu {
  background-color: #5bc8ad91;
  z-index: 30;
  padding: 2rem 1rem;
  position: fixed;
  width: 20rem;
  height: 80rem;
  top: 0;
  right: 0;
}
.menu a {
  color: rgb(66, 66, 66);
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0 2rem;
  transition: 0.3s;
}
.menu ul {
  margin: 1rem;
  padding: 0;
}
.postButton {
  /* buttonタグのリセットCSS */
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;

  /* ボタンの装飾 */
  position: fixed;
  right: 65px;
  bottom: 20px;
  z-index: 100;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #5bc8ad91;
  color: #353535;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 400%;
  opacity: 0.9; /* ←透明度 */
}
.postButton:hover {
  transform: scale(1.1);
  color: #5bc8ad91;
  background: #7c7c7c;
  border: 1px solid #5bc8ad91;
}
</style>
