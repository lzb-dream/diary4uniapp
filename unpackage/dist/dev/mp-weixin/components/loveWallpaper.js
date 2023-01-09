"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "loveWallpaper",
  setup(__props) {
    const myStore = common_vendor.useStore();
    const wallpaper = myStore.state.wallpaper;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(wallpaper).loveImage, (item, index, i0) => {
          return {
            a: item.loveImage,
            b: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-67f3871b"], ["__file", "C:/Front_End/diary4/components/loveWallpaper.vue"]]);
wx.createComponent(Component);
