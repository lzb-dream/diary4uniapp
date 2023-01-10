"use strict";
const common_vendor = require("../common/vendor.js");
const js_request = require("../js/request.js");
const js_way = require("../js/way.js");
const _sfc_main = {
  __name: "loveWallpaper",
  setup(__props) {
    const myStore = common_vendor.useStore();
    const wallpaper = myStore.state.wallpaper;
    function previewImage(index) {
      let urls = [];
      wallpaper.loveImage.forEach((item) => {
        urls.push(item.loveImage);
      });
      common_vendor.index.previewImage({
        urls,
        current: index
      });
    }
    function deleteImage(id, maxImage) {
      common_vendor.index.showModal({
        title: "\u4F60\u786E\u5B9A\u8981\u5220\u9664\u8BE5\u56FE\u7247\u5417\uFF1F",
        success: (res) => {
          if (res.confirm) {
            const back = js_request.requests({ url: "loveimage", method: "DELETE", data: { image: id } });
            back.then((data) => {
              if (data.statusCode == 200) {
                js_way.showToast("\u5220\u9664\u6210\u529F", "success");
                myStore.commit("wallpaper/remove", maxImage);
              }
            });
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(wallpaper).loveImage, (item, index, i0) => {
          return {
            a: item.loveImage,
            b: common_vendor.o(($event) => deleteImage(item.id, item.loveImage), index),
            c: common_vendor.o(($event) => previewImage(index), index),
            d: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-67f3871b"], ["__file", "C:/Front_End/diary4/components/loveWallpaper.vue"]]);
wx.createComponent(Component);
