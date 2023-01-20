<template>
	<!-- 头部x滚动区域 -->
	<view class="top">
		<view class="title">免费分享最精彩的素材图片</view>
		<scroll-view class="scrollX" scroll-x="true" scroll-left="0">
			<view id="demo1" class="scroll-view-item_X" :class="{active:index===topNumber}" 
			@click="clickToptabbar(index)"
			v-for="(item,index) in topTabbarList" :key="item">{{item}}</view>
		</scroll-view>
	</view>
 <!-- 图片y滑动区域-->
	<scroll-view  scroll-y="true" class="scrollY"
	@scrolltolower="lower" @scroll="scroll" lower-threshold="50" :scroll-top="scrollTop" 
	v-for="(data,dataIndex) in imageData" :key="dataIndex" v-show="dataIndex===topNumber">
			<view class="imageFather" v-for="(leftImage,leftIndex) in data['imageList']" :key="leftIndex">
				<image :src="leftImage['minImage']" mode="widthFix" @click.stop="clickImage(leftImage)"></image>
				<view class="message">
					<!-- <image :src="$store.state.URL.replace('api/','')+'static/set/download.png'" mode="widthFix" @click="deleteImage(data.tableName,leftImage.id)"></image> -->
					<checkbox-group name="" @change="changeCheckbox($event,leftImage.id,data.tableS,leftImage.maxImage)">
						<label>
							<checkbox class="red round" :disabled="heartSwitch"/><text></text>
						</label>
					</checkbox-group>
				</view>
			</view>
	</scroll-view>
	<!-- 两边功能按键 -->
	<view class="backTop" @click.stop="backTop" v-if="topShow">
		<uni-icons type="arrow-up" size="35" color="#00F5FF"></uni-icons>
	</view>
	<view class="refresh" @click.stop="reset">
		<uni-icons type="refresh" size="35" color="#00F5FF"></uni-icons>
	</view>
	<Loading :status="loadingStatus"></Loading>
</template>

<script setup>
import Notice from '@/components/notice.vue'
import Loading from '@/components/loading.vue'
import {useStore} from 'vuex'
import {requests} from '@/js/request.js'
import { ref } from "vue"
import { showToast,rpxTopx,judgeLogin} from '../../js/way'

const myStore = useStore()
myStore.dispatch('wallpaper/getData','GourmetFood')
const wallpaper = myStore.state.wallpaper
const imageData = wallpaper.imageData
// 控制返回顶部状态
const topShow = ref(false)

// 控制loading状态
let loadingStatus = ref(false) 

// 头部导航栏内容
const topTabbarList = ['美食','相约','家庭','孩童']
let topNumber = ref(0)

// 删除不合格图片
async function deleteImage(tableName,id){
	console.log(tableName);
	const res = await requests({method:'DELETE',data:{id:id,tableName:tableName},url:'getWallPaper'})
	console.log(res.data);
}

// 图片加载
function imageLoad(e,imageInfo,tableIndex,bearing){
	let height = e.detail.height
	const plyload = {height:height,tableIndex:tableIndex,imageInfo:imageInfo,bearing:bearing}
	myStore.commit('wallpaper/imageLoad',plyload)
}


// 切换导航栏
function clickToptabbar(index){
	topShow.value = false
	if(imageData[index].imageList.length===0){
		myStore.dispatch('wallpaper/getData',imageData[index]['tableName'])
	}
	topNumber.value = index 
}
// 喜欢按钮的点击
let heartSwitch = ref(false) 
async function changeCheckbox(e,imageId,tableS,maxImage){
	// 验证登录
	if(!myStore.state.haslogin){
		judgeLogin()
		return
	}else{
		if(heartSwitch.value){
			return
		}
		heartSwitch.value = true
		setTimeout(()=>{
			heartSwitch.value = false
		},1000)
		if(e.detail.value.length>0){
			requests({url:'loveimage',method:'POST',data:{'image':{[tableS]:imageId}}})
			myStore.commit('wallpaper/push',{name:'loveImage',value:{loveImage:maxImage,id:{[tableS]:imageId}}})
			
		}else{
			requests({url:'loveimage',method:'DELETE',data:{'image':{[tableS]:imageId}}})
			myStore.commit('wallpaper/remove',maxImage)
		}
	}
}
// 图片下载按钮状态控制
let downloadNumbe = ref(null)
// 图片下载与按钮控制
function clickDownload(index){
	var timerChange;
	clearTimeout(timerChange)
	downloadNumbe.value = index
	timerChange = setTimeout(()=>{
		downloadNumbe.value = null
	},100)
	// 下载内容
}

// 返回顶部
function backTop(){
	scrollTop.value = 0
}
// 滑块位置
const scrollTop = ref(null)
// 滚动事件
function scroll(e){
	scrollTop.value = e.detail.scrollTop
	if (scrollTop.value>800){
		topShow.value=true
	}else{
		topShow.value=false
	}
}


// 点击小图片
function clickImage(data){
	if(!myStore.state.haslogin){
		judgeLogin()
		return
	}
	
	uni.previewImage({
		urls:[data.maxImage]
	})
}
// 刷新图片
function reset(){
	var timerLodingStatus
	loadingStatus.value = true
	clearTimeout(timerLodingStatus)
	timerLodingStatus = setTimeout(()=>{
		loadingStatus.value = false
	}, 1000);
	myStore.commit('wallpaper/empty',imageData[topNumber.value].tableName)
	myStore.dispatch('wallpaper/getData',imageData[topNumber.value].tableName )
}

// 到位置自动获取数据
function lower(){
	myStore.dispatch('wallpaper/getData',imageData[topNumber.value].tableName )
}



let download = `${myStore.state.URL.replace('api/','')}static/set/download.png`
let downloadOk = `${myStore.state.URL.replace('api/','')}static/set/downloadOk.png`
let recordImage = `${myStore.state.URL.replace('api/','')}static/backgroundImage/recordImage.jpg`
let statusBarHeight = myStore.state.statusBarHeight
let scrollYHeight = myStore.state.screenHeight-myStore.state.tabbarheight-rpxTopx(130)-statusBarHeight
scrollYHeight = scrollYHeight+'px'
statusBarHeight = statusBarHeight+'px'
</script>

<style lang="less" scoped>
	// 设置自定义check样式
	//设置圆角
	/deep/ checkbox.round .wx-checkbox-input,
	checkbox.round .uni-checkbox-input {
		// border-radius: 100upx;
		// background-color: aqua;
		width: 70rpx;
		border: 0;
		background-image: url(http://127.0.0.1:8000/static/set/hollow.png);
		background-size: 80%;
		background-repeat: no-repeat;
		background-position: center;
	}
	//设置背景色
	/deep/ checkbox.red[checked] .wx-checkbox-input,
	checkbox.red.checked .uni-checkbox-input{
		// background-color: #e54d42 !important;
		// border-color: #e54d42 !important;
		color: transparent !important;
		background-image: url(http://127.0.0.1:8000/static/set/solid.png);
	}
	// <checkbox-group name="" @change="changeCheckbox">
	// 	<label>
	// 		<checkbox :value="item.id" class="round red"/>
	// 	</label>
	// </checkbox-group>
	
	.active {
		background-color: #98F5FF;
		border-radius: 10rpx;
	}
	.downloadActive {
		width: 70rpx;
		height: 70rpx;
	}
	.downloadStatic {
		width: 50rpx;
		height: 50rpx;
	}
	
	.top {
		position: sticky;
		top: 0;
		z-index: 2;
		background-color: #fff;
		padding-top: v-bind(statusBarHeight);
		box-sizing: border-box;
		.title {
			text-align: center;
			height: 70rpx;
			line-height: 70rpx;
			font-size: medium;
			font-weight: 700;
		}
		.scrollX {
			white-space: nowrap;
			width: 100%;
			margin-top: 10rpx;
			background-color: #fff;
			.scroll-view-item_X {
				display: inline-block;
				width: 25%;
				height: 50rpx;
				text-align: center;
			}
		}
	}
	

	.scrollY {
		height: v-bind(scrollYHeight);
		width: 100%;
			.imageFather {
				width: 98%;
				margin: 0 auto;
				image {
					// 去除image自带上下边框
					font-size: 0;
					border-radius: 5rpx;
					width: 100%;	
				}
				.message{
					width: 100%%;
					display: flex;
					justify-content: space-around;
					box-shadow: 0px 0px 36rpx 0px rgba(96, 96, 96, 0.3);
					checkbox-group {
						margin-right: 10rpx;
					}
					image {
						margin-left: 10rpx;
						width: 48rpx;
						height: 48rpx;
						// font-size: 0;
					}
				}
			}
	}
	
	.backTop{
		position: fixed;
		right: 10%;
		bottom: 2%;
		z-index: 2;
	}
	.refresh {
		position: fixed;
		left: 10%;
		bottom: 2%;
		z-index: 2;
	}
	.backTop , .refresh  {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	// /deep/ checkbox.download .wx-checkbox-input,
	// checkbox.download .uni-checkbox-input {
	// 	// border-radius: 100upx;
	// 	// background-color: aqua;
	// 	width: 70rpx;
	// 	border: 0;
	// 	background-image: url(http://127.0.0.1:8000/static/set/download.png);
	// 	background-size: 69%;
	// 	background-repeat: no-repeat;
	// 	background-position: center;
	// }
	// //设置背景色
	// /deep/ checkbox.ok[checked] .wx-checkbox-input,
	// checkbox.ok.checked .uni-checkbox-input{
	// 	// background-color: #e54d42 !important;
	// 	// border-color: #e54d42 !important;
	// 	color: transparent !important;
	// 	background-image: url(http://127.0.0.1:8000/static/set/downloadOk.png);
	// }
	// //元素使用的时候就是使用 download 和 ok
</style>