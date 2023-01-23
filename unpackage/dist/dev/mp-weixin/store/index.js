"use strict";
const common_vendor = require("../common/vendor.js");
const store_writeDiary = require("./writeDiary.js");
const store_wallpaper = require("./wallpaper.js");
const store_readDiary = require("./readDiary.js");
const store = common_vendor.createStore({
  state: {
    URL: "https://love-life-lzb.fun/api/",
    statusBarHeight: "",
    screenHeight: "",
    tabbarheight: "",
    screenWidth: "",
    haslogin: false,
    passWordStatus: true,
    userInfo: {
      nickName: "",
      userId: "",
      userImage: "",
      heartWallpaper: [],
      writeBackgroundWallpaper: "",
      readBackgroundWallpaper: ""
    }
  },
  getters: {},
  mutations: {
    changeState(state, obj) {
      state[obj.name] = obj.value;
    },
    changeUserInfo(state, obj) {
      state.userInfo[obj.name] = obj.value;
    }
  },
  actions: {},
  modules: {
    writeDiary: store_writeDiary.writeDiary,
    wallpaper: store_wallpaper.wallpaper,
    readDiary: store_readDiary.readDiary
  }
});
exports.store = store;
