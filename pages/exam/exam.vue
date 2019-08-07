<template>
	<view class="container">
    <view v-for="(item,index) in quections" :key="index">
      {{ item.name }}
    </view>
	</view>
</template>

<script>
  import medinceData from '@/data/medince'
  
	export default {
		data() {
			return {
				quections: medinceData.data.slice(0, 5)
			}
		},
		methods: {
			
		}
	}
</script>

<style lang='scss'>
</style>
