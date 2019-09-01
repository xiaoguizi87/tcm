<template>
  <view class="container">
    <view v-for="(item,index) in quections" :key="index" v-if="index === problemIdx" class='content'>
      <text class='title'><text class="medinceName">{{item.name}}</text> 的功效是：</text>
      <radio-group @change="radioChange">
        <view v-for="(elem, j) in item.options" :key="j" class='option'>
          <radio :checked="checkedValues[problemIdx] === j" :value="elem" /><label @click="selectOption(j)">{{elem}}</label>
        </view>
      </radio-group>
    </view>
    <view class='box'>
      <button @click='handlePrev()' :disabled="problemIdx === 0" class='pageBtn'> 上一题</button>
      <text class="pageText">第{{problemIdx + 1}}题</text>
      <button @click='handleNext()' :disabled="problemIdx === 9" class='pageBtn'>下一题</button>
    </view>
    <button v-if="problemIdx === 9" @click="postAnswer" type="primary">提交答案</button>
    <button class='shareBtn' open-type="share">分享</button>
  </view>
</template>

<script>
  import medinceData from '@/data/medince'
  import util from '../../utils/index.js'

  let random = require('lodash.random')
  let shuffle = require('lodash.shuffle')

  function generateOptions(p) {
    let opts = [p.effect]
    let s = new Set()
    s.add(p.effect)
    while (opts.length < 4) {
      let idx = random(0, medinceData.data.length - 1)
      // console.log(idx)
      if (s.has(medinceData.data[idx].effect)) {
        continue
      }
      s.add(medinceData.data[idx].effect)
      opts.push(medinceData.data[idx].effect)
    }
    // console.log(p)
    return shuffle(opts)
  }

  function generateProblems() {
    let problems = shuffle(medinceData.data).slice(0, 10)
    for (let p of problems) {
      p.options = generateOptions(p)
      console.log(p)
      p.rightIndex = p.options.indexOf(p.effect)
    }
    return problems
  }

  export default {
    data() {
      return {
        quections: [],
        problemIdx: -1,
        checkedValues: [],
        timer: undefined,
      }
    },

    onReady() {
      this.initPage()
    },

    methods: {
      initPage() {
        this.quections = JSON.parse(JSON.stringify(generateProblems()))
        this.problemIdx = 0
        this.checkedValues = []
      },
      postAnswer() {
        for (let i = 0; i < 10; i++) {
          if (this.checkedValues[i] === undefined) {
            uni.showToast({
              icon: 'none',
              title: '有题目未完成'
            })
            this.problemIdx = i
            return
          }
        }
        let [score, wrongAns] = this.calcScore()
        let title = this.getTitleByScore(score)
        let txt = ''
        console.log('wrongAns: ', wrongAns)
        wrongAns.forEach((name) => {
          let effectName = this.getEffectByName(name)
          txt = txt + name + ' ' + effectName
          util.insertWrongBook(name, effectName)
        })
        uni.showModal({
          title: '测试结果',
          content: `您的分数是${score}分,获得"${title}"的称号\n\n答错的中药如下:\n${wrongAns}`,
          showCancel: true,
          cancelText: '取消',
          confirmText: '重来',
          success: res => {
            this.initPage()
          },
          fail: () => {},
          complete: () => {}
        });
        util.insertLogDb('测一测', score)
      },
      radioChange: function(evt) {
        let opts = this.quections[this.problemIdx].options
        console.log(evt.target.value)
        console.log(opts)
        for (let i = 0; i < opts.length; i++) {
          if (opts[i] === evt.target.value) {
            this.$set(this.checkedValues, this.problemIdx, i)
            break;
          }
        }
        this.timer = setTimeout(() => {
          this.problemIdx = Math.min(9, this.problemIdx + 1)
        }, 500)
      },
      selectOption: function(idx) {
        console.log('clicked')
        this.$set(this.checkedValues, this.problemIdx, idx)
        this.timer = setTimeout(() => {
          this.problemIdx = Math.min(9, this.problemIdx + 1)
        }, 500)
      },
      handleNext() {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.problemIdx++
      },
      handlePrev() {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.problemIdx--
      },
      calcScore() {
        let errorMedice = []
        let count = 0
        for (let i = 0; i < 10; i++) {
          if (this.quections[i].rightIndex === this.checkedValues[i]) {
            count++
          } else {
            errorMedice.push(this.quections[i].name)
          }
        }
        // console.log('errorMedice: ', errorMedice)
        return [count * 10, errorMedice]
      },
      getTitleByScore(score) {
        if (score < 20) {
          return '药童'
        } else if (score < 40) {
          return '药师'
        } else if (score < 60) {
          return '药王'
        } else if (score < 80) {
          return '药神'
        } else if (score < 100) {
          return '药圣'
        } else {
          return '药仙'
        }
      },
      getEffectByName(name) {
        for (let it of medinceData.data) {
          if (it.name === name) {
            // console.log(it)
            return it.effect
          }
        }
      },
      onShareAppMessage: function(options) {
        console.log('分享的代码！！')
      }
    }
  }
</script>

<style lang='scss'>
  .content {
    margin-top: 100rpx;
    text-align: left;
    width: 90%;
  }

  .medinceName {
    color: #1da049;
  }

  .title {
    font-size: 18px;
    margin-bottom: 20rpx;
  }

  .option {
    margin: 24rpx 0;
    font-size: 14px;
  }

  .box {
    display: inline-flex;
    justify-content: space-around;
    width: 70%;
    height: 90rpx;
  }

  .pageBtn {
    background: rgb(236, 255, 127);
    color: #6666ff;
    width: 150rpx;
    height: 60rpx;
    font-size: 10px;
  }

  .pageText {
    line-height: 60rpx;
  }

  /*  .slide-fade-enter-active {
  }

  .slide-fade-leave-active {
  } */
</style>
