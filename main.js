import Vue from 'vue'
import App from './App'
// optionally import default styles

Vue.config.productionTip = false
App.mpType = 'app'
wx.cloud.init({
  env: 'tcm-database-04ig7'
})
const app = new Vue(App)
app.$mount()




wx.cloud.callFunction({
  name: 'get-problems',
  data: {}
}).then(res => {
  console.log(res.result.problems)
  let OPENID = res.result.OPENID
  wx.setStorage({
    key: "OPENID",
    data: OPENID
  })
  console.log(OPENID)
})
