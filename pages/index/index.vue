<template>
  <view class='container'>
    <transition name="slide-fade">
      <view v-for='(t, i) in problems' :key="i" class='row'>
        <view class='left' :class="{'correct': leftCorrect[i], 'clicked': leftClicked == i}" @tap='leftClick(i)'>
          <p>{{ t.name }}</p>
        </view>
        <view class='right' :class="{'correct': rightCorrect[i], 'clicked': rightClicked == i}" @tap='rightClick(i)'>
          <p>{{ randomAns[i] }}</p>
        </view>
      </view>
    </transition>
    <!-- banner广告，按需引入 -->
    <div class="xm_banner" style='width:100%'>
      <div @click="xmadxAppoIntView" :data-id="xmad.ad.banner">
        <div v-if="xmadPageData.adData[xmad.ad.banner]">
          <div style="position: relative; display: flex; width: 100%; overflow: hidden">
            <image @load="xmadxImgLoad" :data-id="xmad.ad.banner" mode="widthFix" :src="xmadPageData.adData[xmad.ad.banner].imgurl"
              style="width: 100%; margin: 0px auto; height: 91.2715px;"></image>
            <div style="position: absolute; left: 0.5px; bottom: 0.5px; width: 32px !important; height: 10px !important; line-height: 10px; background: rgba(0, 0, 0, .2); font-size: 6px; color: #fff; text-align: center; border-radius: 6px;">小盟广告</div>
            <navigator v-if="xmadPageData.adData[xmad.ad.banner].at===3||xmadPageData.adData[xmad.ad.banner].at===4"
              :url="xmadPageData.adData[xmad.ad.banner].pageurl" target="miniProgram" @fail="xmadxNavFail" :data-id="xmad.ad.banner"
              :app-id="xmadPageData.adData[xmad.ad.banner].appid[1]" style="position: absolute; top: 0; right: 0; left: 0; bottom: 0; margin: 0; background: none;"></navigator>
          </div>
        </div>
      </div>
    </div>
    <button class='shareBtn' open-type="share">分享</button>
  </view>
</template>

<script>
  import medinceData from '@/data/medince'
  import util from '../../utils/index.js'
  const utils = require('../../utils/index.js')

  let shuffle = require('lodash.shuffle')
  let random = require('lodash.random')

  export default {
    data() {
      return {
        problems: [],
        randomAns: [],
        leftCorrect: [],
        rightCorrect: [],
        leftClicked: -1,
        rightClicked: -1,
        xmad: {
          adData: {},
          ad: {
            banner: 'xm8fa57d4399a4b8f752801ffd38eee4', // 按需引⼊
            insert: '请填⼊您的插屏⼴告位ID', // 按需引⼊
            fixed: '请填⼊您的悬浮窗⼴告位ID' // 按需引⼊
          }
        },
        //接口请求的广告数据接收变量
        pageData: {
          adData: {}
        },
        //将接收的广告数据进行视图渲染的变量
        xmadPageData: {
          adData: {}
        },
        //广告的显示和隐藏
        showView: true,
      }
    },
    components: {},
    onShow: function() {

    },

    methods: {
      //发送广告位数据请求函数
      xmadxSendAd() {
        wx.xmadx.sendXmadAd(this.xmad)
      },
      //请求到广告数据之后得到广告数据函数
      xmadxGetData() {
        const _t = this
        setTimeout(() => {
          _t.pageData = _t.$mp.page.data.xmad
          // console.log('xmadGetData',_t.$mp.page.data.xmad)   
        }, 1000)
      },
      //广告位点击函数-用于数据点击
      xmadxAppoIntView(e) {
        wx.xmadx.appoIntView(e)
      },
      //图片展示函数-用于数据曝光
      xmadxImgLoad(e) {
        wx.xmadx.adImgLoad(e, this)
      },
      //关闭插屏广告函数
      xmadxClose(e) {
        this.showView = false
      },
      //直跳失败相关操作函数
      xmadxCancelJump(baseURL, curl) {
        if (!curl) {
          return
        }
        wx.request({
          url: baseURL + 'v1/api/cancelclk',
          // 点击上报
          data: {
            curl
          },
          method: 'POST'
        })
      },
      //直跳失败的操作函数
      xmadxNavFail(e) {
        console.log('errMsg:', e.mp.detail.errMsg)
        let _t = this
        let {
          errMsg
        } = e.mp.detail
        let adData = _t.$mp.page.data.xmad.adData
        let adID = e.currentTarget.dataset.id
        console.log()
        // 未绑定广告主appid
        if (errMsg.indexOf('not in navigateToMiniProgramAppIdList') !== -1) {
          wx.request({
            url: adData.baseURL + 'v1/api/skipfail',
            data: {
              // 广告主appidadID
              appid: adData[adID].appid[1],
              // 媒体主appkey
              appkey: adData[adID].ak
            },
            method: 'GET'
          })
        }
        if (errMsg.indexOf('cancel') !== -1) {
          let obj = adData[adID]
          obj ? this.xmadxCancelJump(adData.baseURL, obj.curl) : (setTimeout(() => {
            this.xmadxCancelJump(adData.baseURL, obj ? obj.curl : '')
          }, 3000))
        }
      },
      leftClick(i) {
        if (this.leftCorrect[i]) {
          return
        }
        this.leftClicked = i
        this.checkHasCorrect('left')
      },

      rightClick(i) {
        if (this.rightCorrect[i]) {
          return
        }
        this.rightClicked = i
        this.checkHasCorrect('right')
      },

      checkHasCorrect(lastClicked) {
        if (this.leftClicked === -1 || this.rightClicked === -1) {
          return
        }
        if (this.randomAns[this.rightClicked] === this.problems[this.leftClicked].effect) {
          this.leftCorrect[this.leftClicked] = true
          this.rightCorrect[this.rightClicked] = true
          this.leftClicked = -1
          this.rightClicked = -1
          this.playAudio('static/audios/correct.mp3')
          if (this.leftCorrect.filter(x => x).length === this.problems.length) {
            this.playAudio('static/audios/victory.wav')
            wx.showToast({
              title: '你好棒!', // 提示的内容,
              icon: 'success', // 图标,
              duration: 2000, // 延迟时间,
              mask: true, // 显示透明蒙层，防止触摸穿透,
              success: res => {
                this.fetchProblems()
                this.leftCorrect = []
                this.rightCorrect = []
                this.leftClicked = -1
                this.rightClicked = -1
              }
            })
            util.insertLogDb('连一连', 0)
          }
        } else {
          this.leftClicked = -1
          this.rightClicked = -1
          this.playAudio('static/audios/error.mp3')
        }
      },

      fetchProblems() {
        let problems = []
        let s = new Set()
        while (problems.length < 5) {
          let idx = random(0, medinceData.data.length - 1)
          if (s.has(idx)) {
            continue
          }
          problems.push(medinceData.data[idx])
          s.add(idx)
        }
        this.problems = JSON.parse(JSON.stringify(problems))
        this.randomAns = shuffle(problems.map(x => x.effect))
        // console.log(problems,.this.randomAns)
        // wx.cloud.callFunction({
        //   name: 'get-problems',
        //   data: {}
        // }).then(res => {
        //   console.log(res.result.problems)
        //   this.problems = res.result.problems
        //   this.randomAns = shuffle(this.problems.map(x => x.answer))
        //   console.log(this.randomAns)
        // })
      },

      playAudio(src) {
        const innerAudioContext = wx.createInnerAudioContext()
        innerAudioContext.autoplay = true
        innerAudioContext.src = src
        // console.log('play')
      }
    },

    created() {
      this.fetchProblems()
      //created阶段-调用请求广告位信息函数
          console.log('xuexg begin')

      this.xmadxSendAd()
      //设置初始样式
      this.xmadPageData.adData[this.xmad.ad.banner] = '';
      this.xmadPageData.adData[this.xmad.ad.insert] = '';
      this.xmadPageData.adData[this.xmad.ad.fixed] = '';
      // utils.insertWrongBook('前胡', '降气化痰，散风清热')
    },
    watch: {
      //监听pageData变量的变化
      pageData(val, oldVal) {
        const _t = this
        if (val) {
          this.xmadPageData = val
          if (this.xmadPageData.adData[this.xmad.ad.insert]) {
            this.showView = this.xmadPageData.adData[this.xmad.ad.insert]['hasshow']
          }
        }
      }
    },
    onShareAppMessage: function(options) {
      console.log('分享的代码！！')
    }
  }
</script>

<style scoped>
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 120rpx;
    padding: 8rpx;
    width: 100vw;
    opacity: 0.8;
  }

  .left {
    width: 150rpx;
    background: #cafedb;
    text-align: center;
    height: 100%;
    display: table;
    box-sizing: border-box;
  }

  .right {
    width: 590rpx;
    background: #cafedb;
    text-align: center;
    display: table;
    height: 100%;
    box-sizing: border-box;
  }

  .left>p {
    display: table-cell;
    vertical-align: middle;
  }

  .right>p {
    display: table-cell;
    vertical-align: middle;
  }

  p {
    color: #1a2a3a;
    font-size: 14px;
  }

  .correct {
    background: rgb(40, 240, 40);
    color: azure;
  }

  .clicked {
    background: pink;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-to

  /* .slide-fade-leave-active for below version 2.1.8 */
    {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
