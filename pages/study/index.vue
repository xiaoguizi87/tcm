<template>
	<div class='container'>
		<div class="item" v-for='(t, i) in data' :key='i' v-if='i >= currenIndex*5-5 && i < currenIndex*5 '>
			<div class="title">{{t.name}}</div>
			<div class="text">{{t.effect}}</div>
		</div>
		<div class='box'>
      <button @click='goto(true)' :disabled="currenIndex === 1"> 上页</button>
			<text class="pageText">{{currenIndex}}</text>
			<button @click='goto(false)' :disabled="currenIndex === totalPage">下页</button>
		</div>
	</div>
</template>
<script>
	import medinceData from '@/data/medince'

	export default {
		data() {
			return {
				openid: '',
				data: [],
				currenIndex: 1,
				oldPoint: {},
				totalPage: parseInt(medinceData.data.length / 5)
			}
		},
		onLoad() {
			this.data = JSON.parse(JSON.stringify(medinceData.data))
		},
		methods: {
			showTips: function() {
				wx.showToast({
					title: '功能加速开发中', // 提示的内容,
					duration: 1000, // 延迟时间,
					mask: true // 显示透明蒙层，防止触摸穿透,
				})
			},
			goto(isPrev) {
				// console.log(isPrev)
				if (isPrev) {
					this.currenIndex = Math.max(1, this.currenIndex - 1)
				} else {
					this.currenIndex = Math.min(this.totalPage, this.currenIndex + 1)
				}
			}
		}
	}
</script>
<style scoped>
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
		font-size: 16px;
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
