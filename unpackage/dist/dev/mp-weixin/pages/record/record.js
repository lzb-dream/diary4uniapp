"use strict";
const common_vendor = require("../../common/vendor.js");
const js_request = require("../../js/request.js");
const js_way = require("../../js/way.js");
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
    const writeDairy = myStore.state.writeDiary;
    async function saveDiary() {
      if (!myStore.state.haslogin) {
        js_way.judgeLogin();
        return;
      }
      let data = {
        address: writeDairy.address,
        weather: writeDairy.weather,
        mood: writeDairy.mood,
        writeTime: writeDairy.writeTime,
        diary: writeDairy.diary
      };
      const res = await js_request.requests({ url: "diary", method: "POST", data });
      if (res.statusCode == 200) {
        let diaryId = res.data.diaryId;
        console.log(diaryId);
        for (let i = 0; i < writeDairy.imageList.length; i++) {
          await js_request.uploadfile({
            url: "media",
            filePath: writeDairy.imageList[i],
            formData: { diaryId, index: i, writeTime: writeDairy.writeTime, type: "image" },
            name: "media"
          });
        }
        for (let j = 0; j < writeDairy.videoList.length; j++) {
          await js_request.uploadfile({
            url: "media",
            filePath: writeDairy.videoList[j],
            formData: { diaryId, index: j, writeTime: writeDairy.writeTime, type: "video" },
            name: "media"
          });
          await js_request.uploadfile({
            url: "media",
            filePath: writeDairy.videoPhotoList[j],
            formData: { diaryId, index: j, writeTime: writeDairy.writeTime, type: "videoPhoto" },
            name: "media"
          });
        }
        myStore.dispatch("readDiary/getDairy");
        js_way.showToast("\u65E5\u8BB0\u4FDD\u5B58\u6210\u529F", "success");
        myStore.commit("writeDiary/empty", "videoList");
        myStore.commit("writeDiary/empty", "videoPhotoList");
        myStore.commit("writeDiary/empty", "imageList");
        myStore.commit("writeDiary/changeState", { name: "address", value: "" });
        myStore.commit("writeDiary/changeState", { name: "weather", value: "" });
        myStore.commit("writeDiary/changeState", { name: "mood", value: "" });
        myStore.commit("writeDiary/changeState", { name: "diary", value: "" });
        myStore.commit("writeDiary/changeState", { name: "emptyDiary", value: !writeDairy.emptyDiary });
      }
    }
    let recordImage = `${myStore.state.URL.replace("api/", "")}static/set/recordImage.jpg`;
    let statusBarHeight = myStore.state.statusBarHeight + "px";
    console.log(statusBarHeight);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: `background-image:url(${common_vendor.unref(recordImage)})`,
        b: common_vendor.s(_ctx.__cssVars()),
        c: _ctx.$store.state.writeDiary.diary
      }, _ctx.$store.state.writeDiary.diary ? {
        d: common_vendor.o(saveDiary)
      } : {}, {
        e: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ef6850c5"], ["__file", "C:/Front_End/diary4/pages/record/record.vue"]]);
wx.createPage(MiniProgramPage);
