import {requests} from '@/js/request.js'
export default {
	namespaced:true,
	state:{
		imageData:[
			{tableName:'GourmetFood',imageList:[],tableS:'G'},
			{tableName:'Appointment',imageList:[],tableS:'A'},
			{tableName:'Family',imageList:[],tableS:'F'},
			{tableName:'Child',imageList:[],tableS:'C'}
		],
		loveImage:[]
	},
	getters:{},
	mutations:{
		changeScrollTop(state,obj){
			state.imageData[obj.index].scrollTop=obj.number
		},
		changeImageData(state,obj){
			for (var i = 0; i < state.imageData.length; i++) {
				if(state.imageData[i].tableName===obj.tableName){
					state.imageData[i].imageList.push(...obj.value)
				} 
			}
		},
		changeState(state,obj){
			state[obj.name] = obj.value
		},
		push(state,obj){
			if(obj.name==="loveImage"){
				state[obj.name].unshift(obj.value)
				const userInfo = uni.getStorageSync('userInfo')
				userInfo.heartWallpapwer.unshift(obj.value)
				uni.setStorageSync('userInfo',userInfo)
				console.log(state[obj.name]);
			}else{
				state[obj.name].push(obj.value)
			}	
		},
		pop(state,obj){
			state[obj.name].splice(obj.index,1)
		},
		remove(state,value){
			for (let i = 0; i < state.loveImage.length; i++) {
				if(state.loveImage[i].loveImage==value){
					state.loveImage.splice(i,1)
					const userInfo = uni.getStorageSync('userInfo')
					userInfo.heartWallpapwer = state.loveImage
					uni.setStorageSync('userInfo',userInfo)
					break
				} 
			}
		},
		empty(state,tableName){
			console.log(tableName);
			for (var i = 0; i < state.imageData.length; i++) {
				if(state.imageData[i].tableName===tableName){
					state.imageData[i].imageList.length=0
					break
				} 
			}	
		}
		
	},
	actions:{
		async getData(context,tableName){
			const imageDataRes = await requests({url:'getWallPaper',method:'GET',data:{'tableName':tableName}})
			if (imageDataRes.statusCode!==200){return}
			context.commit('changeImageData',{tableName:tableName,value:imageDataRes.data.data})
		},
		async download(){
			uni.downloadFile({
				url:wallpaper.maxImage,
				success: res => {
					console.log('下载成功',res);
					uni.saveImageToPhotosAlbum({
						filePath:'',
						success: () => {},
						fail: () => {}
					})
				}
			})
		},
		async save(content){
			let scope = await uni.getSetting()
			let writePhotosAlbumState = scope['authSetting']['scope.writePhotosAlbum']
			console.log(writePhotosAlbumState);
			if (writePhotosAlbumState){
				// save
			}else if (writePhotosAlbumState===undefined){
				uni.authorize({
					scope:'scope.writePhotosAlbum',
					success: () => {
						
						// save
					},
					fail: () => {
						showToast('未授权图片无法保存')
						return
					}
				})
			}else{
				uni.openSetting({
					success: () => {
							// save
					}
				})
			}
			

		}
		
		
	},
}