import {createStore} from 'vuex'
import writeDiary from './writeDiary.js'
import wallpaper from './wallpaper.js'
import readDiary from './readDiary.js'

const store =  createStore({
	state:{
		URL:"https://love-life-lzb.fun/api/",
		statusBarHeight:'',
		screenHeight:'',
		tabbarheight : '',
		screenWidth:'',
		haslogin: false,
		passWordStatus:true,
		userInfo:{
			nickName:'',
			userId:'',
			userImage:'',
			heartWallpaper:[],
			writeBackgroundWallpaper:'',
			readBackgroundWallpaper:''
		}
	},
	getters:{},
	mutations:{
		changeState(state,obj){
			state[obj.name] = obj.value
		},
		changeUserInfo(state,obj){
			state.userInfo[obj.name] = obj.value
		}
	},
	actions:{},
	modules:{
		writeDiary,
		wallpaper,
		readDiary
	}
})

export default store
