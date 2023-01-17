"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "myDiary",
  setup(__props) {
    const myStore = common_vendor.useStore();
    const readDiary = myStore.state.readDiary;
    function styleVideoPhoto(i) {
      if (i.image.length > 0) {
        return `background-image:url(${myStore.state.URL.replace("api/", "") + i.image[0]})`;
      } else if (i.videoPhoto.length > 0) {
        return `background-image:url(${myStore.state.URL.replace("api/", "") + i.videoPhoto[0]})`;
      } else {
        return `background:	#e9ca9e`;
      }
    }
    function diaryJudeg(i) {
      if (i.image.length > 0) {
        return false;
      } else if (i.videoPhoto.length > 0) {
        return false;
      } else {
        return true;
      }
    }
    function checkDiary(index) {
      common_vendor.index.navigateTo({
        url: `/myPage/readDiary/readDiary?index=${index}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(readDiary).diaryList, (i, index, i0) => {
          return common_vendor.e({
            a: diaryJudeg(i)
          }, diaryJudeg(i) ? {
            b: common_vendor.t(i.address),
            c: common_vendor.t(i.weather),
            d: common_vendor.t(i.mood),
            e: common_vendor.t(i.diary)
          } : {}, {
            f: common_vendor.s(styleVideoPhoto(i)),
            g: common_vendor.t(i.writeTime.split(" ")[0]),
            h: index,
            i: common_vendor.o(($event) => checkDiary(index), index)
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-acde24a9"], ["__file", "C:/Front_End/diary4/components/myDiary.vue"]]);
wx.createComponent(Component);
