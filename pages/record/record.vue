<template>
	<page-meta :page-style="`background-image:url(${recordImage})`"></page-meta>
	<view class="box">
		<Notice></Notice>
		<WeatherMood></WeatherMood>
		<ImageAndVideo></ImageAndVideo>
		<Diary></Diary>
		<button class="save" v-if="$store.state.writeDiary.diary">保存</button>
	</view>
</template>

<script setup>
import Notice from '@/components/notice.vue'
import WeatherMood from '@/components/weatherAndMood.vue'
import ImageAndVideo from '@/components/imageAndVideo.vue'
import Diary from '@/components/Diary.vue'
import {useStore} from 'vuex'


const myStore = useStore()
let recordImage = `${myStore.state.URL.replace('api/','')}static/set/recordImage.jpg`
let statusBarHeight = myStore.state.statusBarHeight+'px'
console.log(statusBarHeight);

</script>


<style scoped lang="less">
	.box {
		margin-top: v-bind(statusBarHeight);
		.save {
			position: fixed;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			z-index: 2;
			height: 90rpx;
			background-color: paleturquoise;
		}
	}
</style>

<style>
	page {
		background-size: cover;
		background-attachment: fixed;
	}
</style>

