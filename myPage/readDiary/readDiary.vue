<template>
	<view class="back" @click="back">
		<uni-icons type="left" size="30" color="gray"></uni-icons>
	</view>
	<view class="Box" v-if="diary">
		<view class="day">
			<text user-select='true'>{{diary.writeTime.split(' ')[0]}}</text>
			<text user-select='true'>{{getWeek(diary.writeTime.split(' ')[0])}}</text>
		</view>
		<view class="weather">
			<text user-select='true'>天气：{{diary.weather}}</text>
		</view>
		<view class="mood">
			<text user-select='true'>心情：{{diary.mood}}</text>
		</view>
		<view class="media">
			<uni-collapse>
				<uni-collapse-item title="视频或图片" :open="false">
					<view class="Media">
						<view class="itemMedia" 
						v-if="diary.image.length>0" 
						v-for="(i,index) in diary.image" :key="i">
							<image :src="url+i" alt="" @click="previewMedia('image',url+i)" mode="aspectFill"></image>
						</view>
							
						<view class="itemMedia" @click.stop="previewMedia('video',url+i)" 
						v-if="diary.video.length>0" 
						v-for="(i,index) in diary.video" :key="i">
							<video :src="url+i" :show-fullscreen-btn="false" :show-center-play-btn="false" :controls="false"></video>
							<view class="play">
								<uni-icons type="videocam" size="35" color="#00F5FF"></uni-icons>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>

		<view class="message">
			<text class="message" user-select='true'>{{diary.diary}}</text>
		</view>
		<view class="address">
			<view class="address_item">
				<text user-select='true'>{{diary.address}}</text>
				<text user-select='true' class="tiem">{{diary.writeTime.split(' ')[1]}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import {useStore} from 'vuex'
import Loading from '@/components/loading.vue'
import {showToast} from '@/js/way.js'
import { onMounted, ref } from "vue";
import {onLoad} from "@dcloudio/uni-app";
const myStore = useStore()
const readDiary = myStore.state.readDiary
const diary = ref(false)
let index = null
let url = myStore.state.URL.replace('api/','')
onLoad((option)=>{
	index = Number(option.index)
})

onMounted(()=>{
	diary.value = readDiary.diaryList[index]
})

// 计算星期几
function getWeek(time){
	let week = new Date(time).getDay()
	if(week==0){week='天'}else if(week==1){week='一'}else if(week==2){week='二'}else if(week==3){week='三'}
	else if(week==4){week='四'}else if(week==5){week='五'}else if(week==6){week='六'}
	return `星期${week}`;
}
// 图片预览
function previewMedia(type,mediaUrl){
	uni.previewMedia({
		sources:[{type:type,url:mediaUrl}]
	})
}

// 返回
function back(){
	uni.navigateBack()
}

let statusBarHeight = (myStore.state.statusBarHeight)+'px'
</script>

<style scoped lang="less">
	/deep/ .uni-collapse {
		background-color: transparent;
	}
	/deep/ .uni-collapse-item__title-box {
		background-color: transparent;
	}
	
	.back {
		margin-top: v-bind(statusBarHeight);
	}
	.Box {
		.day{
			text-align: center;
			font-size: large;
			text {
				margin: 0 10rpx;
			}
		}
		.weather,.mood {
			text-align: center;
			margin-top: 20rpx;
		}
		.message {
			color: gray;
			margin: 20rpx 0;
			padding: 0 10rpx;
		}
		.Media {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-around;
			.itemMedia {
				position: relative;
				width: 150rpx;
				height: 150rpx;
				margin: 10rpx;
				box-shadow: 0px 0px 36rpx 0px rgba(5, 5, 5, 0.15);
				image,
				video {
					width: 100%;
					height: 100%;
					border-radius: 15rpx;
				}
				.play {
					z-index: 99;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
				}
			}
		}
		
		.address {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			margin-right: 30rpx;
			margin-top: 30rpx;
			.address_item {
				width: 30%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				// :nth-child(1) {
				// 	font-size: ;
				// }
				text {
					margin-top: 10rpx;
				}
			}
		}
	}
</style>

<style>
	page {
		background-color: bisque;
	}
</style>