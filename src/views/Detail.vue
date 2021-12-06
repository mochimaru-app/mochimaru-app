<template>
  <div class="main">
    <h1>施設名: {{ postDatas.facility }}</h1>
    <h2>{{ postDatas.checkValue }}</h2>

    <div class="sub-main">
      <div class="left">
        <h3>所在地</h3>
        <p>{{ postDatas.adress }}</p>

        <h3>金額</h3>
        <p>{{ postDatas.money }}</p>

        <h3>オススメポイント</h3>
        <p>{{ postDatas.recommend }}</p>
      </div>
      <div class="right">
        <button>画像</button>
        <button>map</button>
        <br />
        <img
          class="img"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///83QUkpNj/z9PQxPERYYGUhLzmdoaQnND34+PkkMTodKzXHycvT1dbq6+yytbdqcHWSlpkYKDNJUlkvOkLa29w8Rk5fZmzg4eO8vsCfo6aIjJBwdnuCh4vn6OlPV11DTFTCxMausbN7gIWeU2LzAAAEk0lEQVR4nO2c7XaqMBBFFaOoaFXU+tXWat//Ha+1VZEwkEDIZHrP/j3W7OUqx0wmdjoAAAAAAACA/5BRj4Z7bUZsX7flBXEaEQzTkZ81NmI6VuNpaUUcdSmGAgx36WWh6a6sRLbhPrmuNNmX1Ig2PCS/S00OdJFkw7fxfa3jN7JKruGon1161KdWK9bw5XP1tNrV50txoVTD7Urllqui4mAUajgZ5AUvioNJUalMw2sM6qSzglqRhnGx4EUxLigWaHiPQZ3Bu1Yt0HA+Jpd8CcZ5vlyc4XMM6kTH3LKlGb68rsgF/7B6fQ5GYYZrLQZ11GqdfYksw6IYLCDJBqMowxmVEnmywSjJMKZTQvsUF49XyTF8HxgLXoLx6/YyOYalMViw+s3v66QY9o7lMaizWv40CxcyDKtjUEd1r8Eow3A9NEqJvOLwOxhFGE5snjFZBicZhsYxqJOeJRguzGNQJ4lj+j84EEOrGNQpewSHYbgZNhIsJQTD0dE+JUQZfnTrpIQgw3XUqiC/4anJQ1SC4bl+DMowbBSDEgy/msVg+IZtxmAIhr1lmzEYgGHLMchvODXrGco13LX/EOU1bD8GmQ0PHlKC1fDNrmcozrDq6Ey8Ye/TSwzyGeoTJH/M0FsMchk26BnKMNz7F/Rr2LBnGL6h5dGZOMOR9dGZGxQ5sumYOkdnbshPprRE2z3DMnKTKe0wYXiIZkgKRzZdcva2G6QUz+0KLng/wW/SRfUy6+OjZ1jJYzLFPV56htXcJ1Nc46lnaMBtMsUxvnqGJqjuh3vB6TgcwYtixQ24GvjrGRqSlN6As4djs1RBWnYDzpqScXs+ym7A2cKzWapEH/SvieeeoQX0DTgr+DZL1TjZTq1VSCmRR6nG26lJErLgRbHpdoqhZ2hL4Q04YyzG7flICm7AmcLSM7Sn4AacIfMwNkvV1AxG+3F7PqJjje1UyDGoUyMY643b86Eiy2CsPW7PR/HVcAoBMahjE4we5gzbIDHuMwbRM6yDaTAG0jOsg1Gfsd1x+7bRrobrfAS9Warm9wYczZTx6MwNFcF4kpgSedITLbiXmRJ5UvIALsieYR2oYPQ6Z9guhQdw4fYM61AQjLI2S9VoB3Bb8SmRR6mnAzjmAYtWUIPMAdzsrzxEn3kcwLkdsBiTPP4RFF3kcim3Azi3m6XjdEIw7d8UVZ8uOrpczOBwTQnyR18zGP9N1ae+T3Q687thSfevb/7IK1nv6ocovbzTOTZgb/y2Hg3VnljtIsPBdITK+EP0aBgZrh2GMIQhDGEIQxjCEIYwhCEMYQhDGMIQhjCUaXhcTwnWm7vhhi46hm7YVQMSZVcUqqE/YAhDGPIDQxjCkEIlJMquKFBD1e+9EPQy30vpovC/l/79b94whCEMYQhDGMIQhjCEIQxhCEMYwhCGMIQhDGFoxnI3I9hlbnbRRUvjd2I7txiSZLr6dJH5G+FkBoYw5AeGMIQhPzCEIQz5gSEMYcgPDGEIQ35gCEMY8gNDGMKQHxjCEIb8wBCGMOTHrWE6NPihWr8MU6eGvRBxaggAAAAAAABoxD++/pyTd1EqfQAAAABJRU5ErkJggg=="
          alt="画像・地図"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      postDatas: [
        {
          adress: "あそこ",
          facility: "asoko",
          id: "1",
          lat: 35.6803997,
          lng: 139.7690174,
          checkValue: "★★★★★",
        },
      ],
    }
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
.sub-main {
  display: flex;
  justify-content: center;
}
.left {
  width: 35%;
  padding-left: 15%;
}
.right {
  width: 35%;
  padding-right: 15%;
}
.img {
  width: 80%;
  height: 80%;
  padding: 10%;
}
</style>
