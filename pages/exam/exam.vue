<template>
	<view class="container">
		<view v-for="(item,index) in quections" :key="index" v-if="index === problemIdx" class='content'>
			<text class='title'><text class="medinceName">{{item.name}}</text> 的功效是：</text>
			<radio-group @change="radioChange">
				<view v-for="(elem, j) in item.options" :key="j" class='option'>
					<radio :checked="checkedValues[problemIdx]" :value="elem"/><label @click="selectOption(j)">{{elem}}</label>
				</view>
			</radio-group>
		</view>
		<view class='box'>
			<button @click='problemIdx--' :disabled="problemIdx === 0" class='pageBtn'> 上一题</button>
			<text class="pageText">第{{problemIdx + 1}}题</text>
			<button @click='problemIdx++' :disabled="problemIdx === 9" class='pageBtn'>下一题</button>
		</view>
		<button v-if="problemIdx === 9" @click="postAnswer" type="primary">提交答案</button>
	</view>
</template>

<script>
	import medinceData from '@/data/medince'
	let _ = require('lodash')

	function generateOptions(p) {
		let opts = [p.effect]
		let s = new Set()
		s.add(p.effect)
		while (opts.length < 4) {
			let idx = _.random(0, medinceData.data.length - 1)
			// console.log(idx)
			if (s.has(medinceData.data[idx].effect)) {
				continue
			}
			s.add(medinceData.data[idx].effect)
			opts.push(medinceData.data[idx].effect)
		}
		// console.log(p)
		return _.shuffle(opts)
	}

	function generateProblems() {
		let problems = _.shuffle(medinceData.data).slice(0, 10)
		for (let p of problems) {
			p.options = generateOptions(p)
			console.log(p)
			p.rightIndex = p.options.indexOf(p.effect)
		}
		// console.log(problems)
		return problems
	}

	export default {
		data() {
			return {
				quections: [],
				problemIdx: -1,
				checkedValues: [, ]
			}
		},

		onReady() {
			console.log(_.random(2))
			this.quections = JSON.parse(JSON.stringify(generateProblems()))
			this.problemIdx = 0
		},
		methods: {
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
				uni.showModal({
					title: '总分',
					content: '您的分数是' + this.calcScore() + '分',
					showCancel: true,
					cancelText: '取消',
					confirmText: '重来',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			radioChange: function(evt) {
				let opts = this.quections[this.problemIdx].options
				console.log(evt.target.value)
				console.log(opts)
				for (let i = 0; i < opts.length; i++) {
					if (opts[i] === evt.target.value) {
						this.checkedValues[this.problemIdx] = i;
						break;
					}
				}
			},
			selectOption: function(idx) {
				this.checkedValues[this.problemIdx] = idx
			},
			calcScore() {
				console.log(this.checkedValues[0])
				let count = 0
				for (let i = 0; i < 10; i++) {
					if (this.quections[i].rightIndex === this.checkedValues[i]) {
						count++
					}
				}
				return count * 10
			}
		}
	}
</script>

<style lang='scss'>
	.content {
		text-align: left;
		width: 90%;
	}

	.medinceName {
		color: #1da049;
	}

	.title {
		font-size: 16px;
		margin-bottom: 20rpx;
	}

	.option {
		margin: 20rpx 0;
		font-size: 12px;
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
</style>
