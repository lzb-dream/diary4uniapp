"use strict";
const common_vendor = require("../common/vendor.js");
function time() {
  var data = new Date();
  var Y = data.getFullYear();
  var M = data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
  var D = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
  var h = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
  var m = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
  var s = data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds();
  var datatime = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
  return datatime;
}
function showToast(message, inco) {
  common_vendor.index.showToast({
    title: message,
    icon: inco
  });
}
function rpxTopx(rpx) {
  let deviceWidth = common_vendor.index.getSystemInfoSync().windowWidth;
  let px = deviceWidth / 750 * Number(rpx);
  return Math.floor(px);
}
exports.rpxTopx = rpxTopx;
exports.showToast = showToast;
exports.time = time;
