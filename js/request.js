export async function requests(obj){
	if(!obj.data){obj.data={}}
	const res = await uni.request({
		url:obj.url,
		data:obj.data,
		method:obj.method
	})
	return res
}

export async function uploadfile(obj){
	const res = await uni.uploadFile({
		url:obj.url,
		filePath:obj.filePath,
		formData:obj.formData,
		name:obj.name
	})
	return res
}