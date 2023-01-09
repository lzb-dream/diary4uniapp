<template>
	<view class="loding" v-if="props.status">
		<text></text>
		<text></text>
		<text></text>
		<text></text>
		<text></text>
		<text></text>
		<text></text>
		<text></text>
		<view class="message">加载中</view>
	</view>
</template>

<script setup>
let lodingMeasure = '20rpx'
const props = defineProps(['status'])
</script>

<style lang="less" scoped>
	.loding {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		width: 160rpx;
		height: 160rpx;
		z-index: -1;
		.message {
			display: inline-block;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			font-size: small;
		}
		text {
			display: inline-block;
			width: 30rpx;
			height: 30rpx;
			border-radius: 50%;
			background-color: aqua;
			position: absolute;
			animation-name: loading;
			animation-duration: 1s;
			animation-timing-function: linear;
			animation-iteration-count: infinite;
		}
		@keyframes loading {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0.2;
			}
		}
		
		text:nth-child(1){
			left: 50%;
			top: 0;
			transform: translateX(-50%);
		}
		text:nth-child(5){
			right: v-bind(lodingMeasure);
			top: v-bind(lodingMeasure);
			animation-delay: 0.125s;
		}
		text:nth-child(4){
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			animation-delay: 0.25s;
		}
		text:nth-child(8){
			right:  v-bind(lodingMeasure);
			bottom:  v-bind(lodingMeasure);
			animation-delay: 0.375s;
		}
		text:nth-child(2){
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			animation-delay: 0.5s;
		}
		text:nth-child(7){
			left:  v-bind(lodingMeasure);
			bottom:  v-bind(lodingMeasure);
			animation-delay: 0.625s;
		}
		text:nth-child(3){
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			animation-delay: 0.75s;
		}
		text:nth-child(6){
			left:  v-bind(lodingMeasure);
			top:  v-bind(lodingMeasure);
			animation-delay: 0.875s;
		}
	}
</style>