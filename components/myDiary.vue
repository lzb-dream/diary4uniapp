<template>
	<view class="Box">
		<view class="diary" v-for="(i,index) in readDiary.diaryList" :key="index" @click="checkDiary(index)">
			<view class="padding">
				<view class="item" :style="styleVideoPhoto(i)">
					<view class="noPhoto" v-if="diaryJudeg(i)">
						<text class="address">地址：{{i.address}}</text>
						<text>天气：{{i.weather}}</text>
						<text>心情：{{i.mood}}</text>
						<text class="message">{{i.diary}}</text>
					</view>
				</view>
				<view class="time">
					<text>{{i.writeTime.split(' ')[0]}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import {useStore} from "vuex"
const myStore = useStore()
const readDiary = myStore.state.readDiary

// 日记封面样式
function styleVideoPhoto(i){
	if(i.image.length>0){
		return `background-image:url(${myStore.state.URL.replace('api/','')+i.image[0]})`
	}else if(i.videoPhoto.length>0){
		return `background-image:url(${myStore.state.URL.replace('api/','')+i.videoPhoto[0]})`
	}else{
		return `background:	#e9ca9e`
	}
}
// 日记简单描述用于没有封面的日记
function diaryAbstract(i){
	let r = i.diary.substr(0,50)
	if (i.diary.length>r.length){
		return r+'. . .'
	}else{
		return r
	}
}
// 日记是否有封面判断
function diaryJudeg(i){
	if (i.image.length>0){
		return false
	} 
	else if(i.videoPhoto.length>0){
		return false
	} 
	else{
		return true
	} 
}
// 点击封面
function checkDiary(index){
	uni.navigateTo({
		url:`/myPage/readDiary/readDiary?index=${index}`
	})
}
</script>

<style scoped lang="less">
	.Box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.diary {
			width: 50%;
			box-sizing: border-box;
			padding: 3rpx;
			.padding{
				width: 100%;
				.item {
					width: 100%;
					height: 450rpx;
					background-size: 100% 100%;
					background-repeat:no-repeat;
					.noPhoto {
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: small;
						color: gray;
						text {
							margin-top: 10rpx;
						}
						.message{
							font-size: x-small;
							color: #000;
						}
					}
				}
				.time {
					box-sizing: border-box;
					border: 1rpx solid gray;
					border-top: 0;
					text-align: center;
					font-size: medium;
				}
			}
		}
	}
	

</style>