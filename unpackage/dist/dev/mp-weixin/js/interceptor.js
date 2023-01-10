"use strict";
const common_vendor = require("../common/vendor.js");
const store_index = require("../store/index.js");
function request(URL) {
  common_vendor.index.addInterceptor("request", {
    invoke(args) {
      const noJwt = ["login"];
      if (noJwt.indexOf(args.url) == -1) {
        console.log(args.url, "\u8BF7\u6C42\u53D1\u9001");
        let userJwt = common_vendor.index.getStorageSync("userInfo").userJwt;
        if (args.url === "getWallPaper" && args.method === "GET") {
          let wallpaperJwt = common_vendor.index.getStorageSync("wallpaper");
          let jwt = store_index.store.state.haslogin ? userJwt : wallpaperJwt;
          args.header = { Authorization: jwt };
        } else {
          args.header = { Authorization: userJwt };
        }
      }
      args.url = URL + args.url;
    }
  });
  common_vendor.index.addInterceptor("uploadFile", {
    invoke(args) {
      let userJwt = common_vendor.index.getStorageSync("userInfo").userJwt;
      args.url = URL + args.url;
      args.header = { Authorization: userJwt };
    }
  });
}
exports.request = request;
