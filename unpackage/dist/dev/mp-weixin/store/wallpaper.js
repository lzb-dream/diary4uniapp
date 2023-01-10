"use strict";
const common_vendor = require("../common/vendor.js");
const js_request = require("../js/request.js");
const wallpaper$1 = {
  namespaced: true,
  state: {
    imageData: [
      { tableName: "GourmetFood", imageList: [], tableS: "G" },
      { tableName: "Appointment", imageList: [], tableS: "A" },
      { tableName: "Family", imageList: [], tableS: "F" },
      { tableName: "Child", imageList: [], tableS: "C" }
    ],
    loveImage: []
  },
  getters: {},
  mutations: {
    changeScrollTop(state, obj) {
      state.imageData[obj.index].scrollTop = obj.number;
    },
    changeImageData(state, obj) {
      for (var i = 0; i < state.imageData.length; i++) {
        if (state.imageData[i].tableName === obj.tableName) {
          state.imageData[i].imageList.push(...obj.value);
        }
      }
    },
    changeState(state, obj) {
      state[obj.name] = obj.value;
    },
    push(state, obj) {
      if (obj.name === "loveImage") {
        state[obj.name].unshift(obj.value);
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        userInfo.heartWallpapwer.unshift(obj.value);
        common_vendor.index.setStorageSync("userInfo", userInfo);
      } else {
        state[obj.name].push(obj.value);
      }
    },
    pop(state, obj) {
      state[obj.name].splice(obj.index, 1);
    },
    remove(state, value) {
      for (let i = 0; i < state.loveImage.length; i++) {
        if (state.loveImage[i].loveImage == value) {
          state.loveImage.splice(i, 1);
          const userInfo = common_vendor.index.getStorageSync("userInfo");
          userInfo.heartWallpapwer = state.loveImage;
          common_vendor.index.setStorageSync("userInfo", userInfo);
          break;
        }
      }
    },
    empty(state, tableName) {
      console.log(tableName);
      for (var i = 0; i < state.imageData.length; i++) {
        if (state.imageData[i].tableName === tableName) {
          state.imageData[i].imageList.length = 0;
          break;
        }
      }
    }
  },
  actions: {
    async getData(context, tableName) {
      const imageDataRes = await js_request.requests({ url: "getWallPaper", method: "GET", data: { "tableName": tableName } });
      if (imageDataRes.statusCode !== 200) {
        return;
      }
      context.commit("changeImageData", { tableName, value: imageDataRes.data.data });
    },
    async download() {
      common_vendor.index.downloadFile({
        url: wallpaper.maxImage,
        success: (res) => {
          console.log("\u4E0B\u8F7D\u6210\u529F", res);
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: "",
            success: () => {
            },
            fail: () => {
            }
          });
        }
      });
    },
    async save(content) {
      let scope = await common_vendor.index.getSetting();
      let writePhotosAlbumState = scope["authSetting"]["scope.writePhotosAlbum"];
      console.log(writePhotosAlbumState);
      if (writePhotosAlbumState)
        ;
      else if (writePhotosAlbumState === void 0) {
        common_vendor.index.authorize({
          scope: "scope.writePhotosAlbum",
          success: () => {
          },
          fail: () => {
            showToast("\u672A\u6388\u6743\u56FE\u7247\u65E0\u6CD5\u4FDD\u5B58");
            return;
          }
        });
      } else {
        common_vendor.index.openSetting({
          success: () => {
          }
        });
      }
    }
  }
};
exports.wallpaper = wallpaper$1;
