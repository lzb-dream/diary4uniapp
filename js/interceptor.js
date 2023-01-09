import store from '@/store'

export function request(URL){
	uni.addInterceptor('request',{
		invoke(args) {
			const noJwt = ['login']
			if (noJwt.indexOf(args.url)==-1){
				console.log(args.url,'请求发送');
				let userJwt = uni.getStorageSync('userInfo').userJwt
				if (args.url==='getWallPaper'&&args.method==="GET"){
					let wallpaperJwt = uni.getStorageSync('wallpaper')
					let jwt = store.state.haslogin?userJwt:wallpaperJwt
					args.header = {Authorization:jwt}
				}else{
					args.header = {Authorization:userJwt}					
				}
			}
			args.url = URL+args.url
		}
	})
	
	uni.addInterceptor('uploadFile',{
		invoke(args) {
			args.url = URL+args.url
		}
	})
}