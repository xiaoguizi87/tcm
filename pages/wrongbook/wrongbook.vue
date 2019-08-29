<template>
  <view class="container">
    <view class="item" v-for="(t, i) in data" :key="i" v-if="i >= currenIndex*5-5 && i < currenIndex*5 ">
      <text class="title">{{t.name}}</text>
      <text class="text">{{t.effect}}</text>
    </view>
    <view class="box">
      <button @click="goto(true)" :disabled="currenIndex === 1">上页</button>
      <text class="pageText">{{currenIndex}}</text>
      <button @click="goto(false)" :disabled="currenIndex === totalPage">下页</button>
    </view>
  </view>
</template>
<script>
  const utils = require('../../utils/index.js')

  export default {
    data() {
      return {
        openid: "",
        data: [],
        currenIndex: 1,
      };
    },
    onLoad() {
      utils.getWrongBook().then(res => {
        console.log(res)
        this.data = res
      })
    },
    methods: {
      goto(isPrev) {
        // console.log(isPrev)
        if (isPrev) {
          this.currenIndex = Math.max(1, this.currenIndex - 1);
        } else {
          this.currenIndex = Math.min(this.totalPage, this.currenIndex + 1);
        }
      }
    },
    onShareAppMessage: function(options) {
      console.log("分享的代码！！");
    }
  };
</script>
<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    width: 60vw;
  }

  .item {
    background: #decafb;
    margin: 6rpx 0;
    width: 94vw;
    height: 15vh;
    opacity: 0.8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    box-sizing: border-box;
  }

  .title {
    color: #1da049;
    margin-bottom: 28rpx 0;
    font-size: 20px;
    text-align: center;
  }

  .text {
    font-size: 14px;
    text-align: center;
  }

  .box {
    display: inline-flex;
    justify-content: space-around;
    width: 50%;
  }

  button {
    margin: 15rpx;
    background: rgb(236, 255, 127);
    color: #6666ff;
    width: 120rpx;
    height: 60rpx;
    font-size: 10px;
  }

  .pageText {
    line-height: 90rpx;
  }
</style>
