"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (Notice + WeatherMood + ImageAndVideo + Diary)();
}
const Notice = () => "../../components/notice.js";
const WeatherMood = () => "../../components/weatherAndMood.js";
const ImageAndVideo = () => "../../components/imageAndVideo.js";
const Diary = () => "../../components/Diary.js";
const _sfc_main = {
  __name: "record",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "ef6850c5-statusBarHeight": common_vendor.unref(statusBarHeight)
    }));
    const myStore = common_vendor.useStore();
    let recordImage = `${myStore.state.URL.replace("api/", "")}static/set/recordImage.jpg`;
    let statusBarHeight = myStore.state.statusBarHeight + "px";
    console.log(statusBarHeight);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: `background-image:url(${common_vendor.unref(recordImage)})`,
        b: common_vendor.s(_ctx.__cssVars()),
        c: _ctx.$store.state.writeDiary.diary
      }, _ctx.$store.state.writeDiary.diary ? {} : {}, {
        d: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ef6850c5"], ["__file", "C:/Front_End/diary4/pages/record/record.vue"]]);
wx.createPage(MiniProgramPage);
