<template>
  <div>
    <h1>Post page</h1>
    <h3>皆のオススメを投稿して共有しよう！</h3>
    <div>
      <h4>施設名</h4>
      <input v-model="postData.facility" />
    </div>
    <div>
      <h4>住所</h4>
      <input v-model="postData.address" />
    </div>
    <div>
      <h4>金額</h4>
      <input v-model="postData.money" />
    </div>
    <div>
      <h4>おすすめポイント</h4>
      <textarea v-model="postData.recommend"></textarea>
    </div>
    <div>
      <h4>評価</h4>
      <div class="stars">
        <input id="review01" type="radio" name="review" /><label
          for="review01"
          @click="setCheckValue(5)"
          >★</label
        >
        <input id="review02" type="radio" name="review" /><label
          for="review02"
          @click="setCheckValue(4)"
          >★</label
        >
        <input id="review03" type="radio" name="review" /><label
          for="review03"
          @click="setCheckValue(3)"
          >★</label
        >
        <input id="review04" type="radio" name="review" /><label
          for="review04"
          @click="setCheckValue(2)"
          >★</label
        >
        <input id="review05" type="radio" name="review" /><label
          for="review05"
          @click="setCheckValue(1)"
          >★</label
        >
      </div>
    </div>
    <div>
      <h4>map</h4>
    </div>
    <button v-on:click="post">投稿！</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postData: {
        facility: "",
        address: "",
        money: "",
        recommend: "",
        checkValue: "",
      },
    }
  },
  methods: {
    setCheckValue: function (value) {
      this.postData.checkValue = value
    },
    post: function () {
      console.log(this.postData)
    },
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
</style>
