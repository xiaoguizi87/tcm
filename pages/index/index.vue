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
		<button class='shareBtn' open-type="share">分享</button>
	</view>
</template>

<script>
	import medinceData from '@/data/medince'
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
				rightClicked: -1
			}
		},
		onShow: function() {

		},

		methods: {
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
