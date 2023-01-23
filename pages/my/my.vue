<template>
	<uni-popup ref="popup" :is-mask-click="true" backgroundColor="#fff">
		<view class="Pop_up">
			<view class="Pop_up_item">
				<view class="nickname">
					<view class="nickname_item">
						<label for="upnickname">昵称：</label>
						<input type="text" :class="{'activeInput':!switchNickname}" :focus="true" id="upnickname" :disabled="switchNickname" maxlength="20" v-model="$store.state.userInfo.nickName">
					</view>
					<button v-if="switchNickname" @click="startNickName" >编辑昵称</button>
					<button v-else @click="endNickName">提交昵称</button>
				</view>
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
import {onBeforeMount, ref,watch} from 'vue'
import MyDiary from '@/components/myDiary.vue'
import LoveWallpaper from '@/components/loveWallpaper.vue'
import {showToast} from '@/js/way.js'
const myStore = useStore()
const items = ['我写的日记', '喜欢的图片']
// 修改昵称
let switchNickname = ref(true)
let switchUpNickname = false
function startNickName(){
	switchNickname.value = false
}
watch(()=>myStore.state.userInfo.nickName,()=>{
	switchUpNickname = true
	})
async function endNickName(){
	if(switchUpNickname){
		const res = await requests({url:'userup',method:'PUT',data:{nickName:myStore.state.userInfo.nickName}})
		if(res.statusCode==200){
			showToast('昵称修改成功','success')
		}
		const userInfo = uni.getStorageSync('userInfo')
		userInfo.nickName = myStore.state.userInfo.nickName
		uni.setStorageSync('userInfo',userInfo)
		switchUpNickname = false
	}
	switchNickname.value = true
}

// 弹出层管理
const popup = ref('popup')
function open(){
	popup.value.open('right')
}
// 退出登录
function outLogin(){
	uni.removeStorageSync('userInfo');
	myStore.commit('changeState',{name:'haslogin',value:false})
	myStore.commit('readDiary/empty')
	popup.value.close()
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
	.activeInput {
		border-bottom: 1px solid gray;
	}
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
			.nickname{
				display: flex;
				width: 100%;
				justify-content: space-between;
				border: 1px solid pink;
				margin-bottom: 20rpx;
				.nickname_item {
					display: flex;
					input {
						width: 60%;
						text-align: center;
					}
				}
				button {
					width: 40%;
					margin: 0;
					font-size: x-small;
					padding: 0 5rpx;
				}
			}
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