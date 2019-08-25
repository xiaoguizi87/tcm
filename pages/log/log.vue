<template>
  <view class='container'>
    <text class="title">学习记录</text>
    <view v-for='(t, i) in logs' :key='i' class="row">
      <text class="txt">{{t.logType}}</text>
      <text class="txt">{{t.time}}</text>
    </view>
    <button class='shareBtn' open-type="share">分享</button>
  </view>
</template>

<script>
  const utils = require('../../utils/index.js')

  export default {
    data() {
      return {
        logs: []
      }
    },
    methods: {
      created() {}
    },
    onLoad() {
      utils.getStudyLog().then(res => {
        console.log(res)
        this.logs = res
      })
    },
    onShareAppMessage: function(options) {
      console.log('分享的代码！！')
    }
  }
</script>

<style>
  .title {
    color: #1da049;
    margin-bottom: 28rpx 0;
    font-size: 20px;
    text-align: center;
  }

  .row {
    width: 540rpx;
    display: inline-flex;
    justify-content: space-between;
    margin: 20rpx;
  }

  .txt {
    font-size: 16px;
    font-color: #34495E;
  }
</style>
