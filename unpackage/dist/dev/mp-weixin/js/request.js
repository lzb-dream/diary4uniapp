"use strict";
const common_vendor = require("../common/vendor.js");
async function requests(obj) {
  if (!obj.data) {
    obj.data = {};
  }
  const res = await common_vendor.index.request({
    url: obj.url,
    data: obj.data,
    method: obj.method
  });
  return res;
}
async function uploadfile(obj) {
  const res = await common_vendor.index.uploadFile({
    url: obj.url,
    filePath: obj.filePath,
    formData: obj.formData,
    name: obj.name
  });
  return res;
}
exports.requests = requests;
exports.uploadfile = uploadfile;
