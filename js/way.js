// 获取时间
export function time() {
    var data = new Date();
    var Y = data.getFullYear();
    var M = (data.getMonth()<9 ? '0'+(data.getMonth()+1) : (data.getMonth()+1));
    var D = (data.getDate()<10 ? '0'+data.getDate() : data.getDate())
    var h = (data.getHours()<10? '0'+data.getHours(): data.getHours())
    var m = (data.getMinutes()<10 ? '0'+data.getMinutes() : data.getMinutes())
    var s = (data.getSeconds()<10 ? '0'+data.getSeconds() : data.getSeconds())
    var datatime = Y+'-'+M+'-'+D+' '+h+':'+m+':'+s
    return datatime
}


export function showToast(message,inco){
	uni.showToast({
		title:message,
		icon:inco
	})
}


// rpx 转换为 px ，传参类型是数字（Number）
 
export function rpxTopx(rpx) {
	let deviceWidth = uni.getSystemInfoSync().windowWidth; //获取设备屏幕宽度
	let px = (deviceWidth / 750) * Number(rpx)
	return Math.floor(px);
 }
 
 // px 转换为 rpx ，传参类型是数字（Number）
  
export function pxToRpx(px) {
   let deviceWidth = uni.getSystemInfoSync().windowWidth; //获取设备屏幕宽度
   let rpx = (750 / deviceWidth) * Number(px)
   return Math.floor(rpx);
 }

export function judgeLogin(){
	uni.showModal({
		title:'请登录后操作',
		success: (res) => {
			if(res.confirm){uni.switchTab({
				url:"/pages/my/my"
			})}
		}
	})
}

// export function s(message,scallBack,fcallBack){
// 	uni.showModal({
// 		title:message,
// 		success: () => {
// 			if (scallBack){scallBack()}
// 		},
// 		fail: () => {
			
// 		}
// 	})
// }