"use strict";
const common_vendor = require("../common/vendor.js");
const store_writeDiary = require("./writeDiary.js");
const store_wallpaper = require("./wallpaper.js");
const store = common_vendor.createStore({
  state: {
    URL: "http://127.0.0.1:8000/api/",
    statusBarHeight: "",
    screenHeight: "",
    tabbarheight: "",
    haslogin: false,
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
    wallpaper: store_wallpaper.wallpaper
  }
});
exports.store = store;
