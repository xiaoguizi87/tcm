<template>
  <view class='container'>
    学习记录
    <view v-for='(t, i) in logs' :key='i'>
      <text>{{t.logType}}</text>
      <text>{{t.time}}</text>
    </view>
  </view>
</template>

<script>
  import util from '../../utils/index.js'

  export default {
    data() {
      return {
        logs: []
      }
    },
    methods: {
      created() {

      }
    },
    onLoad() {
      let openId = wx.getStorageSync('OPENID')
      const db = wx.cloud.database()
      let logs = db.collection('studyLog').where({
        _openid: openId
      }).get().then(res => {
        for (let i = 0; i < res.data.length; i++) {
          this.logs.push({
            logType: res.data[i].logType,
            time: res.data[i].time
          })
        }
      })
    }
  }
</script>

<style>

</style>
