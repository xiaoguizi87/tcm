<template>
  <div class='container'>
    <cmd-notice-bar scrollable text="如果你喜欢本程序,请收藏到我的小程序中"></cmd-notice-bar>
    <open-data class='icon' mode='aspectFit' type='userAvatarUrl'></open-data>
    <button class='bt' type="info" @click='goto("/pages/study/index")'>学习园地</button>
    <button class='bt' type="info" @click='goto("/pages/wrongbook/wrongbook")'>错题本</button>
    <button class='bt' type="info" @click='goto("/pages/log/log")'>学习记录</button>
    <button class='bt' type="info" open-type='share'>分享程序</button>
    <button class='bt' plain type="primary" open-type='feedback'>意见反馈</button>
  </div>
</template>
<script>
  import cmdNoticeBar from "@/components/cmd-notice-bar/cmd-notice-bar.vue"

  import util from '../../utils/index.js'

  export default {
    data() {
      return {
        'openid': ''
      }
    },
    components: {
      cmdNoticeBar
    },
    onLoad() {
      // let openId = wx.getStorageSync('OPENID')
      // console.log('openId', openId)
      // util.insertLogDb(123)
      let logRes = util.getStudyLog()
      console.log(logRes)
    },
    methods: {
      showTips: function() {
        uni.showToast({
          title: '功能加速开发中', // 提示的内容,
          duration: 1000, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      },
      goto: function(url) {
        uni.navigateTo({
          url
        })
      }
    },
    onShareAppMessage: function(options) {
      console.log('分享的代码！！')
    }
  }
</script>
<style scoped>
  /**
*open-data 的头像做不了圆角
*这里是覆盖一个镂空的view在上面 镂空view的边界做成与周围背景颜色一样 做了伪圆角
**/
  .icon {
    height: 200rpx;
    width: 200rpx;
    border-radius: 50%;
    border: 1rpx solid #e9ee9d;
    overflow: hidden;
  }

  .bt {
    margin: 20rpx;
    width: 240rpx;
    height: 80rpx;
    font-size: 14px;
    /* width: 200rpx; */
  }
</style>
