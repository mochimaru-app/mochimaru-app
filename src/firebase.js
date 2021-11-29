import firebase from "firebase"
import "firebase/firestore"
import Vue from "vue"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBQQO5m8oSiojXp-LbNDL6arl_AMA1a6RM",
  authDomain: "mochimaru-c464d.firebaseapp.com",
  projectId: "mochimaru-c464d",
  storageBucket: "mochimaru-c464d.appspot.com",
  messagingSenderId: "639278353084",
  appId: "1:639278353084:web:09d674ef784ceb90199eb9",
  measurementId: "G-0EKBF7YEZ4",
}

firebase.initializeApp(firebaseConfig)

const initialUserState = {
  uid: "",
  displayName: "",
  photoURL: "",
}
const $auth = Vue.observable({
  currentUser: { ...initialUserState },
})
firebase.auth().onAuthStateChanged((user) => {
  let state
  if (user) {
    const { uid, displayName, photoURL } = user
    state = {
      uid,
      displayName,
      photoURL,
    }
  } else {
    state = initialUserState
  }
  Object.assign($auth.currentUser, state)
})
Vue.prototype.$auth = $auth
