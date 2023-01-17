<template>
	<view class="Box" v-if="diary">
		<text>地址：{{diary.address}}</text>
		<text>天气：{{diary.weather}}</text>
		<text>心情：{{diary.mood}}</text>
		<text class="message">{{diary.diary}}</text>
	</view>
</template>

<script setup>
import {useStore} from 'vuex'
import Loading from '@/components/loading.vue'
import {showToast} from '@/js/way.js'
import { onMounted, ref } from "vue";
import {onLoad} from "@dcloudio/uni-app";
let index = null
onLoad((option)=>{
	index = Number(option.index)
	console.log(index);
})

const myStore = useStore()
const readDiary = myStore.state.readDiary
const diary = ref(false)
onMounted(()=>{
	diary.value = readDiary.diaryList[index]
	console.log(diary);
})
let settingColor = ref('#FFF')
let heartColor = ref('#FFF')
let downloadColor = ref('#FFF')
let backColor = ref('#FFF')
function image(){
	uni.previewImage({
		urls:['https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=1440']
	})
}
// 点击变色
function changeColor(whoColor){
	var setTime
	clearTimeout(setTime)
	whoColor.value = '#00F5FF'
	setTime = setTimeout(()=>{whoColor.value = '#FFF'},200)
}

//设置
function setting(){
	changeColor(settingColor)
}
//爱心收藏
function heart(){
	// 例外
	// 
	changeColor(heartColor)
}
// 返回
function back(){
	changeColor(backColor)
	uni.navigateBack()
}
// 下载
function download(){
	changeColor(downloadColor)
	myStore.dispatch('wallpaper/save')
}

let screenHeight = myStore.state.screenHeight+'px'
</script>

<style scoped lang="less">
.imageArea {
	width: 100%;
	height: v-bind(screenHeight);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	.areaView {
		width: 100%;
		height: auto;
		.maxImage {
			width: 100%;
		}
	}
}
.prompt {
	display: inline-block;
	position: absolute;
	left: 50%;
	top: 60%;
	transform: translateX(-50%);
	font-size: small;
}

.bottomMeta {
	width: 100%;
	position: absolute;
	height: 120rpx;
	border: 1px solid black;
	bottom: 0;
	left: 0;
	// transform: translateY(-10%);
	background-color: rgba(192, 210, 255, 0.53);
	z-index: 3;
	display: flex;
	justify-content: space-around;
	// .setting:hover {
	// 	background-color: red;
	// }
	.message {
		position: absolute;
		bottom: 0;
		color: rgba(187, 84, 84, 0.52);
		margin-bottom: 20rpx;
		font-size: small;
	}
}	
</style>