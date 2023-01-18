"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_icons2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
const _sfc_main = {
  __name: "readDiary",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "a694f072-statusBarHeight": common_vendor.unref(statusBarHeight)
    }));
    const myStore = common_vendor.useStore();
    const readDiary = myStore.state.readDiary;
    const diary = common_vendor.ref(false);
    let index = null;
    let url = myStore.state.URL.replace("api/", "");
    common_vendor.onLoad((option) => {
      index = Number(option.index);
    });
    common_vendor.onMounted(() => {
      diary.value = readDiary.diaryList[index];
    });
    function getWeek(time) {
      let week = new Date(time).getDay();
      if (week == 0) {
        week = "\u5929";
      } else if (week == 1) {
        week = "\u4E00";
      } else if (week == 2) {
        week = "\u4E8C";
      } else if (week == 3) {
        week = "\u4E09";
      } else if (week == 4) {
        week = "\u56DB";
      } else if (week == 5) {
        week = "\u4E94";
      } else if (week == 6) {
        week = "\u516D";
      }
      return `\u661F\u671F${week}`;
    }
    function previewMedia(type, mediaUrl) {
      common_vendor.index.previewMedia({
        sources: [{ type, url: mediaUrl }]
      });
    }
    function back() {
      common_vendor.index.navigateBack();
    }
    let statusBarHeight = myStore.state.statusBarHeight + "px";
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "left",
          size: "30",
          color: "gray"
        }),
        b: common_vendor.o(back),
        c: common_vendor.s(_ctx.__cssVars()),
        d: diary.value
      }, diary.value ? common_vendor.e({
        e: common_vendor.t(diary.value.writeTime.split(" ")[0]),
        f: common_vendor.t(getWeek(diary.value.writeTime.split(" ")[0])),
        g: common_vendor.t(diary.value.weather),
        h: common_vendor.t(diary.value.mood),
        i: diary.value.image.length > 0
      }, diary.value.image.length > 0 ? {
        j: common_vendor.f(diary.value.image, (i, index2, i0) => {
          return {
            a: common_vendor.unref(url) + i,
            b: common_vendor.o(($event) => previewMedia("image", common_vendor.unref(url) + i), i),
            c: i
          };
        })
      } : {}, {
        k: diary.value.video.length > 0
      }, diary.value.video.length > 0 ? {
        l: common_vendor.f(diary.value.video, (i, index2, i0) => {
          return {
            a: common_vendor.unref(url) + i,
            b: "a694f072-3-" + i0 + ",a694f072-2",
            c: common_vendor.o(($event) => previewMedia("video", common_vendor.unref(url) + i), i),
            d: i
          };
        }),
        m: common_vendor.p({
          type: "videocam",
          size: "35",
          color: "#00F5FF"
        })
      } : {}, {
        n: common_vendor.p({
          title: "\u89C6\u9891\u6216\u56FE\u7247",
          open: false
        }),
        o: common_vendor.t(diary.value.diary),
        p: common_vendor.t(diary.value.address),
        q: common_vendor.t(diary.value.writeTime.split(" ")[1]),
        r: common_vendor.s(_ctx.__cssVars())
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a694f072"], ["__file", "C:/Front_End/diary4/myPage/readDiary/readDiary.vue"]]);
wx.createPage(MiniProgramPage);
