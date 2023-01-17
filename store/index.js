import {createStore} from 'vuex'
import writeDiary from './writeDiary.js'
import wallpaper from './wallpaper.js'
import readDiary from './readDiary.js'

const store =  createStore({
	state:{
		URL:"http://127.0.0.1:8000/api/",
		statusBarHeight:'',
		screenHeight:'',
		tabbarheight : '',
		haslogin : false,
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
