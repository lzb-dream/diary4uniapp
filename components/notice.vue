<template>
	<view class="noticeBox">
		<uni-notice-bar show-icon scrollable :speed="60" :text="text" backgroundColor="transparent"/>
	</view>
	
</template>

<script setup>
import {requests} from '@/js/request.js'
import {ref} from 'vue'
let text = ref('')
requests({url:'speack',method:'GET'}).then((res)=>{text.value=res.data.txt})

</script>

<style lang="less" scoped>

</style>