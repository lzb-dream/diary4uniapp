<template>
	<view class="weathermoodBox">
		<view class="time">
			<text>{{$store.state.writeDiary.writeTime}}</text>
		</view>
		<view class="address">
			<label for="address">地址:</label>
			<input id="address" type="text" v-model="$store.state.writeDiary.address"/>
			<uni-icons type="location-filled" size="30" color="red" @click="getAddress()"></uni-icons>
		</view>
		<view class="weathermood">
			<view class="item">
				<label for="weather">天气：</label>
				<input type="text" id="weather">
			</view>
			<view class="item">
				<label for="mood">心情：</label>
				<input type="text" id="mood">
			</view>
		</view>
	</view>
</template>

<script setup>
import { useStore } from 'vuex'
import {time} from '@/js/way.js'
setInterval(()=>{
	myStore.commit('writeDiary/changeTime',time())
},1000)
const myStore = useStore()
async function getAddress(){
	const res = await uni.chooseLocation()
	let address =  res.name
	myStore.commit('writeDiary/changeState',{name:'address',value:address})
}
</script>

<script>
	export default {
		options: {
			styleIsolation: 'shared'
		},
		// onPullDownRefresh() {

		// }
	}
</script>

<style lang="less" scoped>
	/deep/ .uni-collapse {
		background-color: transparent;
	}
	/deep/ .uni-collapse-item__title-box {
		background-color: transparent;
	}
	.weathermoodBox {
		display: flex;
		flex-direction: column;
		width: 100%;
		input {
			border-bottom: 1px solid gray;
			text-align: center;
		}
		.time {
			margin: 0 auto;
			font-size: large;
		}
		.address {
			display: flex;
			margin: 0 auto;
			margin-top: 50rpx;
			input {
				font-size: small;
				border-bottom: 1px solid gray;
				text-align: center;
			}
		}
		.weathermood {
			display: flex;
			margin-top: 20rpx;
			.item {
				display: flex;
				width: 50%;
				justify-content: center;
				input {
					width: 60%;
				}
			}
		}
		
	}
	
	
	.triangle {
		width: 40rpx;
		height: 40rpx;
		display: inline-block;
		border-top: 6rpx solid pink;
		border-right: 6rpx solid pink;
		border-radius: 3px;
		transform: rotate(135deg);
	}
</style>