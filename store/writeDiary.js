import {time} from '@/js/way.js'
export default {
	namespaced:true,
	state:{
		address:"",
		weather:'',
		mood:'',
		writeTime:time(),
		diary:'',
		videoList:[],
		imageList:[],
		videoPhotoList:[],
		emptyDiary:false
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
			let a = state[obj.name].indexOf(obj.value)
			if(a>-1){
				state[obj.name].splice(a,1)
			}
		},
		empty(state,name){
			state[name].length = 0
		}
		
	},
	actions:{},
}