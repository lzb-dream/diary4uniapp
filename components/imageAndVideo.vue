<template>
<uni-collapse>
	<uni-collapse-item title="保存图片或视频请点击这里" :open="false">
		<view class="Media">
			<view class="itemMedia" 
			v-if="writeDiary.imageList.length>0" 
			v-for="(i,index) in writeDiary.imageList" :key="i">
				<image :src="i" alt="" @click="previewImage(i)" mode="aspectFill"></image>
				<text class="incorrect" @click.stop="deleteMedia(i,'imageList')" ></text>
			</view>
				
			<view class="itemMedia" @click.stop="previewVideo(i)" 
			v-if="writeDiary.videoList.length>0" 
			v-for="(i,index) in writeDiary.videoList" :key="i">
				<video :src="i" :show-fullscreen-btn="false" :show-center-play-btn="false" :controls="false"></video>
				<text class="incorrect" @click.stop="deleteMedia(i,'videoList')" ></text>
				<view class="play">
					<uni-icons type="videocam" size="35" color="#00F5FF"></uni-icons>
				</view>
			</view>
				
			<view class="addMedia" @click="choose">
				<uni-icons type="plusempty" size="45" color="darkgray"></uni-icons>
			</view>
		</view>
	</uni-collapse-item>
</uni-collapse>
</template>

<script setup>
import {useStore} from 'vuex'
import {judgeLogin} from '@/js/way.js'
const myStore = useStore()
const writeDiary = myStore.state.writeDiary

// const props = defineProps([])

async function choose(){
	if(!myStore.state.haslogin){
		judgeLogin()
		return
	}
	//判断图片与视频数量
	let mediaNumber = writeDiary.imageList.length+writeDiary.videoList.length
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
			myStore.commit('writeDiary/push',{name:'imageList',value:tempFilePath})
		}else if(Type==="video"){
			myStore.commit('writeDiary/push',{name:'videoList',value:tempFilePath})
			myStore.commit('writeDiary/push',{name:'videoPhotoList',value:videoPhoto})
		}
	}
}
function previewImage(imageUrl){
	uni.previewImage({
		urls:[imageUrl]
	})
}
// 删除选择的视频或者图片
function deleteMedia(media,Type){
	myStore.commit('writeDiary/pop',{name:Type,value:media})
	if(Type==="video"){
		myStore.commit('writeDiary/pop',{name:'videoPhotoList',value:media})
	}
}

function previewVideo(mediaUrl){
	uni.previewMedia({
		sources:[mediaUrl]
	})
}

	
</script>

<script>
	export default {
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="less" scoped>
	/deep/ .uni-collapse {
		background-color: transparent;
	}
	/deep/ .uni-collapse-item__title-box {
		background-color: transparent;
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
				background-image: url('https://love-life-lzb.fun/static/inco/incorrect .png');
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
</style>