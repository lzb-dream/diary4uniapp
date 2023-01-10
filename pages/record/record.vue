<template>
	<page-meta :page-style="`background-image:url(${recordImage})`"></page-meta>
	<view class="box">
		<Notice></Notice>
		<WeatherMood></WeatherMood>
		<ImageAndVideo></ImageAndVideo>
		<Diary></Diary>
		<button class="save" v-if="$store.state.writeDiary.diary" @click="saveDiary">保存</button>
	</view>
</template>

<script setup>
import Notice from '@/components/notice.vue'
import WeatherMood from '@/components/weatherAndMood.vue'
import ImageAndVideo from '@/components/imageAndVideo.vue'
import Diary from '@/components/Diary.vue'
import {useStore} from 'vuex'
import {requests,uploadfile} from "@/js/request.js"
import {judgeLogin} from '@/js/way.js'

const myStore = useStore()
const writeDairy = myStore.state.writeDiary
async function saveDiary(){
	if(!myStore.state.haslogin){
		judgeLogin()
		return
	}
	let data = {
		address:writeDairy.address,
		weather:writeDairy.weather,
		mood:writeDairy.mood,
		writeTime:writeDairy.writeTime,
		diary:writeDairy.diary
	}
	const res = await requests({url:'diary',method:'POST',data:data})
	if(res.statusCode==200){
		let diaryId = res.data.diaryId
		console.log(diaryId);
		for (let i = 0; i < writeDairy.imageList.length; i++) {
			uploadfile({url:'media',
						filePath:writeDairy.imageList[i],
						formData:{diaryId:diaryId,index:i,writeTime:writeDairy.writeTime,type:'image'},
						name:'media'})
		}
		// for (let j = 0; j < writeDairy.videoList.length; i++) {
		// 	writeDairy.videoList[j]
		// 	writeDairy.videoPhotoList[j]
		// }
	}
}

function styleVideoPhoto(i){
	if(i.image.length>0){
		return `background-image:url(${i.image[0]})`
	}else if(i.videoPhoto.length>0){
		return `background-image:url(${i.videoPhoto[0]})`
	}else{
		return `background:	#e9ca9e`
	}
}

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

