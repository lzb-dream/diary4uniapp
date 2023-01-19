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
    const incoStyle = common_vendor.ref("background-image: url('http://127.0.0.1:8000/static/set/updateDiary.png')");
    let index = null;
    let updateSwitch = common_vendor.ref(true);
    let url = myStore.state.URL.replace("api/", "");
    common_vendor.onLoad((option) => {
      index = Number(option.index);
    });
    common_vendor.onMounted(() => {
      diary.value = readDiary.diaryList[index];
    });
    function changeUpdate() {
      if (updateSwitch.value) {
        updateSwitch.value = false;
        incoStyle.value = "background-image: url('http://127.0.0.1:8000/static/set/saveUpdateDiary.png')";
      } else {
        updateSwitch.value = true;
        incoStyle.value = "background-image: url('http://127.0.0.1:8000/static/set/updateDiary.png')";
      }
    }
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
        e: common_vendor.o(changeUpdate),
        f: common_vendor.s(incoStyle.value),
        g: common_vendor.t(diary.value.writeTime.split(" ")[0]),
        h: common_vendor.t(getWeek(diary.value.writeTime.split(" ")[0])),
        i: diary.value.weather || !common_vendor.unref(updateSwitch)
      }, diary.value.weather || !common_vendor.unref(updateSwitch) ? common_vendor.e({
        j: common_vendor.unref(updateSwitch)
      }, common_vendor.unref(updateSwitch) ? {
        k: common_vendor.t(diary.value.weather)
      } : {
        l: diary.value.weather,
        m: common_vendor.o(($event) => diary.value.weather = $event.detail.value)
      }) : {}, {
        n: diary.value.video.length > 0 && diary.value.image.length > 0 || !common_vendor.unref(updateSwitch)
      }, diary.value.video.length > 0 && diary.value.image.length > 0 || !common_vendor.unref(updateSwitch) ? common_vendor.e({
        o: common_vendor.unref(updateSwitch)
      }, common_vendor.unref(updateSwitch) ? {
        p: common_vendor.t(diary.value.mood)
      } : {
        q: diary.value.mood,
        r: common_vendor.o(($event) => diary.value.mood = $event.detail.value)
      }) : {}, {
        s: diary.value.mood || !common_vendor.unref(updateSwitch)
      }, diary.value.mood || !common_vendor.unref(updateSwitch) ? common_vendor.e({
        t: diary.value.image.length > 0
      }, diary.value.image.length > 0 ? {
        v: common_vendor.f(diary.value.image, (i, index2, i0) => {
          return {
            a: common_vendor.unref(url) + i,
            b: common_vendor.o(($event) => previewMedia("image", common_vendor.unref(url) + i), i),
            c: common_vendor.o(($event) => _ctx.deleteMedia(i, "videoList"), i),
            d: i
          };
        })
      } : {}, {
        w: diary.value.video.length > 0
      }, diary.value.video.length > 0 ? {
        x: common_vendor.f(diary.value.video, (i, index2, i0) => {
          return {
            a: common_vendor.unref(url) + i,
            b: common_vendor.o(($event) => _ctx.deleteMedia(i, "videoList"), i),
            c: "a694f072-3-" + i0 + ",a694f072-2",
            d: common_vendor.o(($event) => previewMedia("video", common_vendor.unref(url) + i), i),
            e: i
          };
        }),
        y: common_vendor.p({
          type: "videocam",
          size: "35",
          color: "#00F5FF"
        })
      } : {}, {
        z: !common_vendor.unref(updateSwitch)
      }, !common_vendor.unref(updateSwitch) ? {
        A: common_vendor.p({
          type: "plusempty",
          size: "45",
          color: "darkgray"
        }),
        B: common_vendor.o(() => {
        })
      } : {}, {
        C: common_vendor.p({
          title: "\u89C6\u9891\u6216\u56FE\u7247",
          open: !common_vendor.unref(updateSwitch)
        })
      }) : {}, {
        D: common_vendor.unref(updateSwitch)
      }, common_vendor.unref(updateSwitch) ? {
        E: common_vendor.t(diary.value.diary)
      } : {
        F: diary.value.diary,
        G: common_vendor.o(($event) => diary.value.diary = $event.detail.value)
      }, {
        H: diary.value.mood || !common_vendor.unref(updateSwitch)
      }, diary.value.mood || !common_vendor.unref(updateSwitch) ? common_vendor.e({
        I: common_vendor.unref(updateSwitch)
      }, common_vendor.unref(updateSwitch) ? {
        J: common_vendor.t(diary.value.address)
      } : {
        K: diary.value.address,
        L: common_vendor.o(($event) => diary.value.address = $event.detail.value)
      }) : {}, {
        M: common_vendor.t(diary.value.writeTime.split(" ")[1]),
        N: common_vendor.s(_ctx.__cssVars())
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a694f072"], ["__file", "C:/Front_End/diary4/myPage/readDiary/readDiary.vue"]]);
wx.createPage(MiniProgramPage);
