<template>
	<view class='container'>
		<text class="title">学习记录</text>
		<view v-for='(t, i) in logs' :key='i' class="row">
			<text class="txt">{{t.logType}}</text>
			<text class="txt">{{t.time}}</text>
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
						time: util.formatTime(res.data[i].time)
					})
				}
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
