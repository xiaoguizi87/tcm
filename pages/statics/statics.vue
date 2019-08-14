<template>
	<view class="container">
		<view>最近7天学习记录</view>
		<view class="qiun-charts">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas>
			<!--#endif-->
		</view>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';

	var _self;
	var canvaColumn = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: ''
			}
		},
		onLoad() {
			_self = this
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
									let Column = {
				categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
				series: [{
					name: '连一连',
					data: [3, 2, 2, 3, 4, 2]
				}, {
					name: '测一测',
					data: [1, 2, 5, 2, 4, 6]
				}]
			}
			this.showColumn("canvasColumn", Column);
		},
		methods: {
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'line',
					legend: true,
					fontSize: 10,
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});
			},
			changeData() {
				canvaColumn.updateData({
					series: _self.serverData.ColumnB.series,
					categories: _self.serverData.ColumnB.categories
				});
			}
		}
	}
</script>

<style>
	/* 通用样式 */
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
		opacity: 0.6;
	}
</style>
