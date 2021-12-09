<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |

      <router-link to="/about">About</router-link> |

      <router-link to="/post">Post</router-link> |

      <router-link to="/map">Map</router-link> |

      <router-link to="/mypage">Mypage</router-link>

    <!--ハンバーガーメニューのボタン-->
    <div class="hamburger_btn" v-on:click='ActiveBtn=!ActiveBtn'>
      <span class="line line_01" v-bind:class="{'btn_line01':ActiveBtn}"></span>
      <span class="line line_02" v-bind:class="{'btn_line02':ActiveBtn}"></span>
      <span class="line line_03" v-bind:class="{'btn_line03':ActiveBtn}"></span>

    </div>

    <!--サイドバー-->
    <transition name="menu">
      <div class="menu" v-show="ActiveBtn">
        <ul>
          <li>
            <router-link to="/">Home</router-link></li>
          <!-- <router-link to="/about">About</router-link> -->
          <!-- <router-link to="/post">Post</router-link> -->
          <li><router-link to="/map">Map</router-link></li>
          <!-- <router-link to="/detail">Detail</router-link> -->
          <li><router-link to="/mypage">Mypage</router-link></li>
        </ul>
      </div>
    </transition>
    <router-view />
    <div v-if="isLoggin">している
      <button @click="logOut">ログアウト</button>
    </div>
    <div v-else>してない
      <button @click="login">ログイン</button>

      <!-- <div class="signed-in-user-profile" v-if="user">
      <div>ようこそ{{user.displayName}}</div>
      </div>
      <div v-else>No User Signed In</div> -->
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
// import router from "vue-router";

export default {
  data() {
    return {
      ActiveBtn: false,
      isLoggin: false,
    }
  },
  // created(){
  //       firebase.auth().onAuthStateChanged((user)=>{
  //           if(user){
  //               this.user=user
  //           }else{
  //               this.user=null
  //           }
  //       })
  // },
  // computed: {
  //   user() {
  //     return this.$auth.cuurentUser
  //   },
  // },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log({ result })
          if (result.user) {
            this.isLoggin = true
            // $router.push("/About");
            this.$router.push("/about")
          }
        })
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.isLoggin = false
        })
      this.$router.push("/about")
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
.menu-enter-active, .menu-leave-active {
  transition: opacity 0.4s;
}
.menu-enter, .menu-leave-to {
  opacity: 0;
}
.menu-leave, .menu-enter-to{
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
  padding: 1rem;
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
}
.menu ul{
  margin: 1rem;
  padding: 0;
}
</style>
