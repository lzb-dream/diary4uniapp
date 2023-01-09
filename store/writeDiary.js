import {time} from '@/js/way.js'
export default {
	namespaced:true,
	state:{
		address:"",
		videoList:[],
		imageList:[],
		videoPhotoList:[],
		writeTime:time(),
		diary:''
	},
	getters:{},
	mutations:{
		changeTime(state,value){
			state['writeTime'] = value
		},
		changeState(state,obj){
			state[obj.name] = obj.value
		},
		push(state,obj){
			state[obj.name].push(obj.value)
		},
		pop(state,obj){
			state[obj.name].splice(obj.index,1)
		}
		
	},
	actions:{},
}