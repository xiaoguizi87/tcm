<template>
  <view class="container">
    <view v-for="(item,index) in quections" :key="index">
      <text class="title">{{item.name}}</text>
      <text class="text">{{item.effect}}</text>
    </view>
  </view>
</template>

<script>
  import medinceData from '@/data/medince'

  export default {
    data() {
      return {
        quections: medinceData.data.slice(0, 5)
      }
    },
    methods: {

    }
  }
</script>

<style lang='scss'>
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
</style>
