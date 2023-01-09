"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
const js_interceptor = require("./js/interceptor.js");
const js_request = require("./js/request.js");
const js_way = require("./js/way.js");
const store_index = require("./store/index.js");
require("./store/writeDiary.js");
require("./store/wallpaper.js");
if (!Math) {
  "./pages/wallpaper/wallpaper.js";
  "./pages/record/record.js";
  "./pages/my/my.js";
  "./myPage/previewWallpaper/previewWallpaper.js";
}
const _sfc_main = {
  onLaunch: async function() {
    console.log("App Launch");
    let statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    let screenHeight = common_vendor.index.getSystemInfoSync().screenHeight;
    this.$store.commit("changeState", { name: "statusBarHeight", value: statusBarHeight });
    this.$store.commit("changeState", { name: "screenHeight", value: screenHeight });
    js_interceptor.request(this.$store.state.URL);
    var tabbarheight = common_vendor.index.getSystemInfoSync().screenHeight - common_vendor.index.getSystemInfoSync().safeArea.bottom + 50;
    this.$store.commit("changeState", { name: "tabbarheight", value: tabbarheight });
    async function wallpaperJwt() {
      async function reques() {
        const wallpeaperT = await js_request.requests({
          url: "getWallPaper",
          data: { "user": "stranger" },
          method: "POST"
        });
        if (wallpeaperT.statusCode !== 200) {
          js_way.showToast("\u8BF7\u6C42\u540E\u7AEF\u9519\u8BEF", "error");
        } else {
          if (store_index.store.state.haslogin) {
            return;
          }
          let token = wallpeaperT.data.token;
          console.log(token);
          common_vendor.index.setStorageSync("wallpaper", token);
        }
      }
      reques();
      var Timer;
      clearInterval(Timer);
      Timer = setInterval(() => {
        console.log(store_index.store.state.haslogin);
        if (store_index.store.state.haslogin) {
          console.log("token\u5B9A\u65F6\u5668\u53D6\u6D88");
          clearInterval(Timer);
          return;
        }
        reques();
      }, 6e4);
    }
    let userInfo = common_vendor.index.getStorageSync("userInfo");
    if (userInfo) {
      common_vendor.index.removeStorageSync("wallpaper");
      store_index.store.commit("changeState", { name: "haslogin", value: true });
      store_index.store.commit("changeUserInfo", { name: "nickName", value: userInfo.nickName });
      store_index.store.commit("changeUserInfo", { name: "id", value: userInfo.userId });
      store_index.store.commit("changeUserInfo", { name: "userImage", value: userInfo.userImage });
      store_index.store.commit("wallpaper/changeState", { name: "loveImage", value: userInfo.heartWallpapwer });
    } else {
      wallpaperJwt();
    }
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Front_End/diary4/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App).use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
