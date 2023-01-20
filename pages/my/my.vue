<template>
	<uni-popup ref="popup" :is-mask-click="true" backgroundColor="#fff">
		<view class="Pop_up">
			<view class="Pop_up_item">
				<button open-type="contact">与客服聊天</button>
				<button @click="outLogin">退出登录</button>
			</view>
		</view>
	</uni-popup>
	<view class="persona" v-if="$store.state.haslogin">
		<template v-if="false">
			<view class="Homepage">
				<view class="info">
					<input type="nickname" class="nickname" placeholder="请输入昵称" />
					<button class="userImage" open-type="chooseAvatar" @chooseavatar="chooseavatar">
						<image :src="$store.state.URL.replace('api/','')+$store.state.userInfo.userImage"></image>
						<text>请点击更换头像</text>
					</button>
				</view>
			</view>
		</template>

		<template v-else>
			<view class="Homepage">
				<view class="info">
					<text class="nickname">{{$store.state.userInfo.nickName}}</text>
					<image :src="$store.state.URL.replace('api/','')+$store.state.userInfo.userImage"></image>
				</view>
				<view class="setting" @click="open">
					<uni-icons type="gear" size="30" color="gray"></uni-icons>
				</view>
			</view>
		</template>
	</view>
	
	<view class="list">
		<uni-segmented-control :current="current" :values="items" active-color="#6da6be" @clickItem="onClickItem($event)" />
		<view class="content">
			<view v-if="current === 0"><MyDiary></MyDiary></view>
			<view v-if="current === 1"><LoveWallpaper></LoveWallpaper></view>
		</view>
	</view>
	
	<view class="loginImage" v-if="!$store.state.haslogin">
		<image :src="$store.state.URL.replace('api/','')+'static/set/login.png'" class=""></image>
		<button @click="login">登录</button>
	</view>
</template>

<script setup>
import {requests} from '@/js/request.js'
import {useStore} from 'vuex'
import {onBeforeMount, ref} from 'vue'
import MyDiary from '@/components/myDiary.vue'
import LoveWallpaper from '@/components/loveWallpaper.vue'
import {showToast} from '@/js/way.js'
const myStore = useStore()
const items = ['我写的日记', '喜欢的图片']

const popup = ref('popup')
function open(){
	popup.value.open('right')
}
// 退出登录
function outLogin(){
	uni.removeStorageSync('userInfo');
	myStore.commit('changeState',{name:'haslogin',value:false})
	myStore.commit('readDiary/empty')
}

let current=ref(0)

// 选择头像
function chooseavatar(e){
	console.log(e);
}
// 选择栏切换
function onClickItem(e){
	if (current.value !== e.currentIndex) {
		current.value = e.currentIndex
	}
}
async function login(){
	let loginRes = await uni.login()
	console.log(loginRes);
	let code = loginRes.code
	let addTime = new Date().getTime()
	const respone = await requests({method:'POST',url:'login',data:{code:code,addTime:addTime}})
	const resData = respone.data
	let status = respone.statusCode===200?true:false
	if (status){
		uni.removeStorageSync('wallpaper')
		uni.setStorageSync('userInfo',resData)
		myStore.commit('changeState',{name:'haslogin',value:true})
		myStore.commit('changeUserInfo',{name:'nickName',value:resData.nickName})
		myStore.commit('changeUserInfo',{name:'id',value:resData.userId})
		myStore.commit('changeUserInfo',{name:'userImage',value:resData.userImage})
		// 初始化喜欢的图片
		myStore.commit('wallpaper/changeState',{name:'loveImage',value:resData.heartWallpapwer})
		// 初始化日记列表
		myStore.dispatch('readDiary/getDairy')
	}else{
		showToast('登录请求失败','error')
	}
}


let loginImageHeight = myStore.state.screenHeight-myStore.state.tabbarheight+'px'
let popupWidth = myStore.state.screenWidth/1.5+'px'
</script>
<script>
	export default {
		data(){
			return{}
		},
		methods:{}
	}
</script>

<style scoped lang="less">
	.Pop_up {
		width: v-bind(popupWidth);
		height: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		align-items: center;
		.Pop_up_item {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			button {
				margin-top: 10rpx;
			}
		}
	}
	.persona {
		.Homepage {
			position: relative;
			width: 100%;
			height: 500rpx;
			background-color: aqua;
			display: flex;
			justify-content: center;
			align-items: center;
			.info {
				display: flex;
				flex-direction: column;
				align-items: center;
				.nickname {
					margin-bottom: 10rpx;
					text-align: center;
					color: grey;
				}
			}
			.setting {
				position: absolute;
				right: 0;
				bottom: 0;
				transform: translate(-50%,-50%);
			}
		}
		
		.userImage::after {
			 border: none; 
		}
		.userImage {
			width: 200rpx;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text {
				position: absolute;
				bottom: 0;
				font-size: xx-small;
				height: 54rpx;
				color: gray;
			}
		}
		image {
			width: 150rpx;
			height: 150rpx;
		}
	}
	
	
	
	.loginImage {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		image {
			width: 100%;
			height: v-bind(loginImageHeight);
		}
		button {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 5%;
			background-image: linear-gradient(to bottom right, rgba(247, 240, 172, 0.62), rgba(172, 247, 240, 0.77), rgba(240, 172, 247, 0.75));
			color: gray;
		}
		z-index: 2;
	}

</style>
<!-- https://images.pexels.com/photos/9433003/pexels-photo-9433003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
https://images.pexels.com/photos/9433003/pexels-photo-9433003.jpeg -->