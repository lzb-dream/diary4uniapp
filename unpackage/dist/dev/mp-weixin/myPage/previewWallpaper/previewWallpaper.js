"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (Loading + _easycom_uni_icons)();
}
const Loading = () => "../../components/loading.js";
const _sfc_main = {
  __name: "previewWallpaper",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "c8d3d3dd-screenHeight": common_vendor.unref(screenHeight)
    }));
    const myStore = common_vendor.useStore();
    myStore.state.wallpaper;
    let settingColor = common_vendor.ref("#FFF");
    let heartColor = common_vendor.ref("#FFF");
    let downloadColor = common_vendor.ref("#FFF");
    let backColor = common_vendor.ref("#FFF");
    function image() {
      common_vendor.index.previewImage({
        urls: ["https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=1440"]
      });
    }
    function changeColor(whoColor) {
      var setTime;
      clearTimeout(setTime);
      whoColor.value = "#00F5FF";
      setTime = setTimeout(() => {
        whoColor.value = "#FFF";
      }, 200);
    }
    function setting() {
      changeColor(settingColor);
    }
    function heart() {
      changeColor(heartColor);
    }
    function back() {
      changeColor(backColor);
      common_vendor.index.navigateBack();
    }
    function download() {
      changeColor(downloadColor);
      myStore.dispatch("wallpaper/save");
    }
    let screenHeight = myStore.state.screenHeight + "px";
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(image),
        b: common_vendor.s(_ctx.__cssVars()),
        c: common_vendor.s(_ctx.__cssVars()),
        d: common_vendor.p({
          type: "gear-filled",
          size: "35",
          color: common_vendor.unref(settingColor)
        }),
        e: common_vendor.o(setting),
        f: common_vendor.p({
          type: "heart-filled",
          size: "35",
          color: common_vendor.unref(heartColor)
        }),
        g: common_vendor.o(heart),
        h: common_vendor.p({
          type: "download",
          size: "35",
          color: common_vendor.unref(downloadColor)
        }),
        i: common_vendor.o(download),
        j: common_vendor.p({
          type: "back",
          size: "35",
          color: common_vendor.unref(backColor)
        }),
        k: common_vendor.o(back),
        l: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c8d3d3dd"], ["__file", "C:/Front_End/diary4/myPage/previewWallpaper/previewWallpaper.vue"]]);
wx.createPage(MiniProgramPage);
