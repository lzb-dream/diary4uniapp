<template>
	<view class="Box">
		<view class="item" v-for="(item,index) in wallpaper.loveImage" :key="index">
			<image :src="item.loveImage" mode="aspectFill" @longpress="deleteImage(item.id,item.loveImage)" 
			@click="previewImage(index)"></image>
		</view>
	</view>
</template>

<script setup>
import {useStore} from 'vuex'
import {requests} from '@/js/request.js'
import {showToast} from '@/js/way.js'
const myStore = useStore()
const wallpaper = myStore.state.wallpaper
// 预览图片
function previewImage(index){
	let urls = []
	wallpaper.loveImage.forEach(item=>{urls.push(item.loveImage)})
	uni.previewImage({
		urls:urls,
		current:index
	})
}

function deleteImage(id,maxImage){
	uni.showModal({
		title:'你确定要删除该图片吗？',
		success: res => {
			if(res.confirm){
				// const resd = await 
				// console.log(resd);
				const back = requests({url:"loveimage",method:'DELETE',data:{image:id}})
				back.then(data=>{
					if(data.statusCode==200){
						showToast('删除成功','success')
						myStore.commit('wallpaper/remove',maxImage)
					}
				})
			}
		}
	})

}
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