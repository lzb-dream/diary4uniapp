"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "readDiary",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "a694f072-screenHeight": common_vendor.unref(screenHeight)
    }));
    let index = null;
    common_vendor.onLoad((option) => {
      index = Number(option.index);
      console.log(index);
    });
    const myStore = common_vendor.useStore();
    const readDiary = myStore.state.readDiary;
    const diary = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      diary.value = readDiary.diaryList[index];
      console.log(diary);
    });
    common_vendor.ref("#FFF");
    common_vendor.ref("#FFF");
    common_vendor.ref("#FFF");
    common_vendor.ref("#FFF");
    let screenHeight = myStore.state.screenHeight + "px";
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: diary.value
      }, diary.value ? {
        b: common_vendor.t(diary.value.address),
        c: common_vendor.t(diary.value.weather),
        d: common_vendor.t(diary.value.mood),
        e: common_vendor.t(diary.value.diary),
        f: common_vendor.s(_ctx.__cssVars())
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a694f072"], ["__file", "C:/Front_End/diary4/myPage/readDiary/readDiary.vue"]]);
wx.createPage(MiniProgramPage);
