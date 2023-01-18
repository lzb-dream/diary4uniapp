<template>
	<view class="text">
		<textarea auto-height="true" maxlength="-1" v-model="diary" placeholder="这里写下你的日记"></textarea>
	</view>

</template>

<script setup>
import {ref,watch} from 'vue'
import {useStore} from 'vuex'
const myStore = useStore()
let diary = ref('')

watch(diary,()=>{
	let value = diary.value
	let judge = diary.value.match(/^\s+$/)
	// 验证内容是否都是空格
	if(judge!==null){
		return false
	}
	myStore.commit('writeDiary/changeState',{name:'diary',value:value})
})

watch(()=>myStore.state.writeDiary.emptyDiary,()=>{
	diary.value = ''
})
</script>

<style scoped lang="less">
	textarea {
		width: 92%;
		line-height: 60rpx;
		color: black;
		font-size: large;
		padding: 2rpx;
		margin: 0 auto;
		margin-bottom: 180rpx;
	}

</style>