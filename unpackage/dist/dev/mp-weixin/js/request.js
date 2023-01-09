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
exports.requests = requests;
