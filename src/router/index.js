import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Map from "../views/Map.vue"
import Mypage from "../views/Mypage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/post",
    name: "Post",
    component: () => import("../views/Post.vue"),
  },
  {
    path: "/map",
    name: "Map",
    component: Map,
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/mypage",
    name: "Mypage",
    component: Mypage,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
