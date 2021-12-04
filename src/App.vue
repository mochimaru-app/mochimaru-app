<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |

      <router-link to="/BeforeSignIn">Before</router-link> |

      <router-link to="/AfterSignIn">After</router-link> |

      <router-link to="/about">About</router-link> |

      <router-link to="/post">Post</router-link> |

      <router-link to="/map">Map</router-link> |

      <router-link to="/mypage">Mypage</router-link>
    </div>
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
