<template>
	<view class="back" @click="back">
		<uni-icons type="left" size="30" color="gray"></uni-icons>
	</view>
	<view class="Box" v-if="diary">
		<view class="day">
			<view class="updateInco" @click="changeUpdate" :style="incoStyle"></view>
			<text user-select='true'>{{diary.writeTime.split(' ')[0]}}</text>
			<text user-select='true'>{{getWeek(diary.writeTime.split(' ')[0])}}</text>
		</view>
		<view class="weather" v-if="diary.weather||!updateSwitch">
			<text user-select='true' v-if="updateSwitch">{{diary.weather}}</text>
			<template v-else>
				<label for="upweather">天气：</label>
				<input type="text" id="upweather" v-model="diary.weather">
			</template>
		</view>
		<view class="mood" v-if="diary.mood||!updateSwitch">
			<text user-select='true' v-if="updateSwitch">{{diary.mood}}</text>
			<template v-else>
				<label for="upweather">心情：</label>
				<input type="text" id="upmood" v-model="diary.mood">
			</template>
		</view>
		<view class="media" v-if="(diary.video.length>0||diary.image.length>0)||!updateSwitch">
			<uni-collapse>
				<uni-collapse-item title="视频或图片" :open="!updateSwitch">
					<view class="Media">
						<view class="itemMedia" 
						v-if="diary.image.length>0" 
						v-for="(i,index) in diary.image" :key="i">
							<image :src="prefix(i)" alt="" @click="previewMedia('image',prefix(i))" mode="aspectFill"></image>
							<text class="incorrect" @click.stop="deleteMedia(i,'image')" v-if="!updateSwitch"></text>
						</view>
						
						<view class="itemMedia" @click.stop="previewMedia('video',prefix(i))" 
						v-if="diary.video.length>0" 
						v-for="(i,index) in diary.video" :key="i">
							<video :src="prefix(i)" :show-fullscreen-btn="false" :show-center-play-btn="false" :controls="false"></video>
							<text class="incorrect" @click.stop="deleteMedia(i,'video')" v-if="!updateSwitch"></text>
							<view class="play">
								<uni-icons type="videocam" size="35" color="#00F5FF"></uni-icons>
							</view>
						</view>
						<view class="addMedia" @click="choose" v-if="!updateSwitch">
							<uni-icons type="plusempty" size="45" color="darkgray"></uni-icons>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>

		<view class="message">
			<text user-select='true' v-if="updateSwitch">{{diary.diary}}</text>
			<textarea auto-height="true" :focus="true" maxlength="-1" v-else v-model="diary.diary"></textarea>
		</view>
		<view class="address">
			<view class="address_item">
				<view v-if="diary.mood||!updateSwitch" class="address_item_item">
					<text v-if="updateSwitch">{{diary.address}}</text>
					<template v-else>
						<label for="upaddress">地址：</label>
						<input type="text" id="upaddress" v-model="diary.address">
					</template>
				</view>
				<text user-select='true' class="time">{{diary.writeTime.split(' ')[1]}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import {useStore} from 'vuex'
import Loading from '@/components/loading.vue'
import {showToast,prefix,time} from '@/js/way.js'
import { onBeforeUnmount, onMounted, ref } from "vue";
import {onLoad} from "@dcloudio/uni-app";
import {requests,uploadfile} from '@/js/request.js'
const myStore = useStore()
const readDiary = myStore.state.readDiary
const diary = ref(false)
const incoStyle = ref("background-image: url('http://127.0.0.1:8000/static/set/updateDiary.png')")
let index = null
// 复原控件
let textRecovery = true
// let mediaRecovery = true
let updateSwitch = ref(true) 

let id = null
let diaryText = null
let address = null
let mood = null
let weather = null

// const video=[]
// const videoPhoto=[]
// const image=[]

const newvideo=[]
const newvideoPhoto=[]
const newimage=[]
onLoad((option)=>{
	index = Number(option.index)
})

onMounted(()=>{
	diary.value = readDiary.diaryList[index]
	// 记住原有值以待复原
	diaryText = diary.value.diary
	address = diary.value.address
	mood = diary.value.mood
	weather = diary.value.weather
	id = diary.value.id
	// video.push(...diary.value.video)
	// videoPhoto.push(...diary.value.videoPhoto)
	// image.push(...diary.value.image)
	
})


onBeforeUnmount(()=>{
	if(textRecovery){
		diary.value.diary = diaryText
		diary.value.address = address
		diary.value.mood = mood
		diary.value.weather = weather
	}
})
// 循环上传函数
async function cyclicUpload(filelist,type){
	for (var i = 0; i < filelist.length; i++) {
		let res = await uploadfile({url:"media",
					filePath:filelist[i],
					formData:{diaryId:id,writeTime:time(),index:i,type:type},
					name:'media'})
		console.log(res);
	}
}
// 修改日记
// 一秒钟一次
let change = true
async function changeUpdate(){
	var Timer;
	clearTimeout(Timer)
	if(!change){
		return
	}else{
		change = false
		Timer = setTimeout(()=>{
			change = true
		},1500)
	}
	if(updateSwitch.value){
		updateSwitch.value = false
		incoStyle.value = "background-image: url('http://127.0.0.1:8000/static/set/saveUpdateDiary.png')"
	}else{
		const res = await requests({url:'diary',method:'PUT',data:{diary:diary.value}})
		if(res.statusCode==200){
			textRecovery = false
		}
		if(newimage.length>0){
			await cyclicUpload(newimage,'image')
		}
		if(newvideo.length>0){
			await cyclicUpload(newvideo,'video')
			await cyclicUpload(newvideoPhoto,'videoPhoto')
		}
		updateSwitch.value = true
		incoStyle.value = "background-image: url('http://127.0.0.1:8000/static/set/updateDiary.png')"
	}

}
//删除图片或者视频
async function deleteMedia(media,Type){
	let index = diary.value[Type].indexOf(media)
	diary.value[Type].splice(index,1)
	if(Type=='video'){
		diary.value['videoPhoto'].splice(index,1)
	}
	if(media.indexOf('static')>-1){
		 await requests({url:'media',method:'DELETE',data:{type:Type,media:media,id:id}})
		if(Type=='video'){
			console.log('执行删除');
			await requests({url:'media',method:'DELETE',data:{type:'videoPhoto',media:diary.value['videoPhoto'][index],id:id}})
		}
	}
}
// 添加图片或者视频
async function choose(){
	//判断图片与视频数量
	let mediaNumber = diary.value.image.length+diary.value.video.length
	if (mediaNumber>=5){
		uni.showModal({
			title:'视频图片数量不能大于5个'
		})
		return false
	}
	let res = await uni.chooseMedia()
	console.log(res);
	for (let i = 0; i < res.tempFiles.length; i++) {
		let tempFilePath = res.tempFiles[i].tempFilePath
		let size = res.tempFiles[i].size
		let Type = res.type
		let videoPhoto = Type==="video"?res.tempFiles[i].thumbTempFilePath:null
		if (size/1048576>=10){
			uni.showModal({
				title:'单个视频不能大于10mb'
			})
			return false
		}
		if(Type==="image"){
			diary.value.image.push(tempFilePath)
			newimage.push(tempFilePath)
		}else if(Type==="video"){
			diary.value.video.push(tempFilePath)
			diary.value.videoPhoto.push(videoPhoto)
			newvideo.push(tempFilePath)
			newvideoPhoto.push(videoPhoto)
		}
	}
}

// 计算星期几
function getWeek(time){
	let week = new Date(time).getDay()
	if(week==0){week='天'}else if(week==1){week='一'}else if(week==2){week='二'}else if(week==3){week='三'}
	else if(week==4){week='四'}else if(week==5){week='五'}else if(week==6){week='六'}
	return `星期${week}`;
}
// 图片视频预览
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
	input {
		border-bottom: 1px solid gray;
		// text-align: center;
	}
	
	.back {
		margin-top: v-bind(statusBarHeight);
	}
	.updateInco {
		width: 50rpx;
		height: 50rpx;
		background-size: 100% 100%;
		position: absolute;
		left: 15%;
	}
	.Box {
		color: gray;
		.day{
			text-align: center;
			font-size: large;
			text {
				margin: 0 10rpx;
			}
		}
		.weather,.mood {
			display: flex;
			text-align: center;
			margin-top: 20rpx;
			width: 100%;
			justify-content: center;
			input {
				width: 40%;
			}
		}
		.message {
			font-size: 34rpx;
			color: #000;
			margin: 20rpx 0;
			padding: 0 15rpx;
			text {
				line-height: 180%;
			}
			textarea {
				width: 100%;
				line-height: 180%;
			}
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
				.incorrect {
					width: 35rpx;
					height: 35rpx;
					display: inline-block;
					background-image: url('http://127.0.0.1:8000/static/set/incorrect.png');
					background-size: 100% 100%;
					position: absolute;
					top: 10rpx;
					right: 10rpx;
				}
				.play {
					z-index: 99;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
				}
			}
			.addMedia {
				width: 150rpx;
				height: 150rpx;
				margin: 10rpx;
				border: 5px solid darkgray;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 12rpx;
				box-sizing: border-box;
				z-index: 99;	
			}
		}
		
		.address {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			margin-top: 30rpx;
			.address_item {
				width: 50%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.address_item_item {
					width: 100%;
					margin-top: 10rpx;
					display: flex;
					justify-content: center;
					input {
						width: 60%;
					}
				}
				.time {
					margin-top: 30rpx;
					margin-bottom: 50rpx;
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