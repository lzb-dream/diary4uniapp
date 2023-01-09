<template>
	<view class="Box">
		<view class="item" v-for="(item,index) in wallpaper.loveImage" :key="index">
			<image :src="item.loveImage" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script setup>
import {useStore} from 'vuex'
const myStore = useStore()
const wallpaper = myStore.state.wallpaper
</script>

<style scoped lang="less">
	.Box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.item {
			width: 50%;
			padding:2rpx 2rpx;
			box-sizing: border-box;
			font-size: 0;
			image {
				width: 100%;
				
			}
		}
	}
</style>