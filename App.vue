<script>
	import {request} from '@/js/interceptor.js'
	import {requests} from '@/js/request.js'
	import {showToast} from '@/js/way.js'
	import store from '@/store/index.js'
	export default {
		onLaunch: async function() {
			console.log('App Launch')
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let screenHeight = uni.getSystemInfoSync().screenHeight
			this.$store.commit('changeState',{name:'statusBarHeight',value:statusBarHeight}) 
			this.$store.commit('changeState',{name:'screenHeight',value:screenHeight}) 
			request(this.$store.state.URL)
			var tabbarheight = uni.getSystemInfoSync().screenHeight-uni.getSystemInfoSync().safeArea.bottom+50
			this.$store.commit('changeState',{name:'tabbarheight',value:tabbarheight}) 
			// 获取wallpeaper t
			
			async function wallpaperJwt(){
				async function reques(){
					const wallpeaperT =  await requests({
						url:'getWallPaper',
						data:{'user':'stranger'},
						method:'POST'
					})
					if (wallpeaperT.statusCode!==200){
						showToast('请求后端错误','error')
					}else{
						if(store.state.haslogin){return}
						let token = wallpeaperT.data.token
						console.log(token);
						uni.setStorageSync('wallpaper',token)
					}
				}
				reques()
				var Timer
				clearInterval(Timer)
				Timer = setInterval(()=>{
					console.log(store.state.haslogin);
					if(store.state.haslogin){
						console.log('token定时器取消');
						clearInterval(Timer)
						return
					}
					reques()},60000)
			}

			let userInfo = uni.getStorageSync('userInfo')
			if(userInfo){
				uni.removeStorageSync('wallpaper')
				store.commit('changeState',{name:'haslogin',value:true})
				store.commit('changeUserInfo',{name:'nickName',value:userInfo.nickName})
				store.commit('changeUserInfo',{name:'id',value:userInfo.userId})
				store.commit('changeUserInfo',{name:'userImage',value:userInfo.userImage})
				// 初始化喜欢的图片
				store.commit('wallpaper/changeState',{name:'loveImage',value:userInfo.heartWallpapwer})
			}else{
				wallpaperJwt()
			}
			
		},	
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="less">
	/*每个页面公共css */
	page {
		--m: 100;
	}
	
	//设置圆角
	// checkbox.round .wx-checkbox-input,
	// checkbox.round .uni-checkbox-input {
	// 	// border-radius: 100upx;
	// 	// background-color: aqua;
	// 	width: 70rpx;
	// 	border: 0;
	// 	background-image: url(http://127.0.0.1:8000/static/set/hollow.png);
	// 	background-size: 80%;
	// 	background-repeat: no-repeat;
	// 	background-position: center;
	// }
	
	 
	// //设置背景色
	// checkbox.red[checked] .wx-checkbox-input,
	// checkbox.red.checked .uni-checkbox-input{
	// 	// background-color: #e54d42 !important;
	// 	// border-color: #e54d42 !important;
	// 	color: transparent !important;
	// 	background-image: url(http://127.0.0.1:8000/static/set/solid.png);
	// }
	 
	//元素使用的时候就是使用 round 和 red
</style>
