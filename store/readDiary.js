import {requests} from '@/js/request.js'
export default {
	namespaced:true,
	state:{
		diaryList:[]
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
		empty(state){
			state.diaryList.length=0
		}
		
		
	},
	actions:{
		async getDairy(content){
			const res = await requests({url:'diary',method:'GET'})
			if(res.statusCode==200){
				content.commit('changeState',{name:'diaryList',value:res.data.diaryList})
			}
		}
	},
}