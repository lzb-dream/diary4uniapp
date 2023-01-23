"use strict";
const common_vendor = require("../../common/vendor.js");
const js_way = require("../../js/way.js");
const js_request = require("../../js/request.js");
require("../../store/index.js");
require("../../store/writeDiary.js");
require("../../store/wallpaper.js");
require("../../store/readDiary.js");
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
    const incoStyle = common_vendor.ref("background-image: url('https://love-life-lzb.fun/static/set/updateDiary.png')");
    let index = null;
    let textRecovery = true;
    let updateSwitch = common_vendor.ref(true);
    let id = null;
    let diaryText = null;
    let address = null;
    let mood = null;
    let weather = null;
    const newvideo = [];
    const newvideoPhoto = [];
    const newimage = [];
    common_vendor.onLoad((option) => {
      index = Number(option.index);
    });
    common_vendor.onMounted(() => {
      diary.value = readDiary.diaryList[index];
      diaryText = diary.value.diary;
      address = diary.value.address;
      mood = diary.value.mood;
      weather = diary.value.weather;
      id = diary.value.id;
    });
    common_vendor.onBeforeUnmount(() => {
      if (textRecovery) {
        diary.value.diary = diaryText;
        diary.value.address = address;
        diary.value.mood = mood;
        diary.value.weather = weather;
      }
    });
    async function cyclicUpload(filelist, type) {
      for (var i = 0; i < filelist.length; i++) {
        let res = await js_request.uploadfile({
          url: "media",
          filePath: filelist[i],
          formData: { diaryId: id, writeTime: js_way.time(), index: i, type },
          name: "media"
        });
        console.log(res);
      }
    }
    let change = true;
    async function changeUpdate() {
      var Timer;
      clearTimeout(Timer);
      if (!change) {
        return;
      } else {
        change = false;
        Timer = setTimeout(() => {
          change = true;
        }, 1500);
      }
      if (updateSwitch.value) {
        updateSwitch.value = false;
        incoStyle.value = "background-image: url('https://love-life-lzb.fun/static/set/saveUpdateDiary.png')";
      } else {
        const res = await js_request.requests({ url: "diary", method: "PUT", data: { diary: diary.value } });
        if (res.statusCode == 200) {
          textRecovery = false;
        }
        if (newimage.length > 0) {
          await cyclicUpload(newimage, "image");
        }
        if (newvideo.length > 0) {
          await cyclicUpload(newvideo, "video");
          await cyclicUpload(newvideoPhoto, "videoPhoto");
        }
        updateSwitch.value = true;
        incoStyle.value = "background-image: url('https://love-life-lzb.fun/static/set/updateDiary.png')";
      }
    }
    async function deleteMedia(media, Type) {
      let index2 = diary.value[Type].indexOf(media);
      diary.value[Type].splice(index2, 1);
      if (Type == "video") {
        diary.value["videoPhoto"].splice(index2, 1);
      }
      if (media.indexOf("static") > -1) {
        await js_request.requests({ url: "media", method: "DELETE", data: { type: Type, media, id } });
        if (Type == "video") {
          console.log("\u6267\u884C\u5220\u9664");
          await js_request.requests({ url: "media", method: "DELETE", data: { type: "videoPhoto", media: diary.value["videoPhoto"][index2], id } });
        }
      }
    }
    async function choose() {
      let mediaNumber = diary.value.image.length + diary.value.video.length;
      if (mediaNumber >= 5) {
        common_vendor.index.showModal({
          title: "\u89C6\u9891\u56FE\u7247\u6570\u91CF\u4E0D\u80FD\u5927\u4E8E5\u4E2A"
        });
        return false;
      }
      let res = await common_vendor.index.chooseMedia();
      console.log(res);
      for (let i = 0; i < res.tempFiles.length; i++) {
        let tempFilePath = res.tempFiles[i].tempFilePath;
        let size = res.tempFiles[i].size;
        let Type = res.type;
        let videoPhoto = Type === "video" ? res.tempFiles[i].thumbTempFilePath : null;
        if (size / 1048576 >= 10) {
          common_vendor.index.showModal({
            title: "\u5355\u4E2A\u89C6\u9891\u4E0D\u80FD\u5927\u4E8E10mb"
          });
          return false;
        }
        if (Type === "image") {
          diary.value.image.push(tempFilePath);
          newimage.push(tempFilePath);
        } else if (Type === "video") {
          diary.value.video.push(tempFilePath);
          diary.value.videoPhoto.push(videoPhoto);
          newvideo.push(tempFilePath);
          newvideoPhoto.push(videoPhoto);
        }
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
        n: diary.value.mood || !common_vendor.unref(updateSwitch)
      }, diary.value.mood || !common_vendor.unref(updateSwitch) ? common_vendor.e({
        o: common_vendor.unref(updateSwitch)
      }, common_vendor.unref(updateSwitch) ? {
        p: common_vendor.t(diary.value.mood)
      } : {
        q: diary.value.mood,
        r: common_vendor.o(($event) => diary.value.mood = $event.detail.value)
      }) : {}, {
        s: diary.value.video.length > 0 || diary.value.image.length > 0 || !common_vendor.unref(updateSwitch)
      }, diary.value.video.length > 0 || diary.value.image.length > 0 || !common_vendor.unref(updateSwitch) ? common_vendor.e({
        t: diary.value.image.length > 0
      }, diary.value.image.length > 0 ? {
        v: common_vendor.f(diary.value.image, (i, index2, i0) => {
          return common_vendor.e({
            a: common_vendor.unref(js_way.prefix)(i),
            b: common_vendor.o(($event) => previewMedia("image", common_vendor.unref(js_way.prefix)(i)), i)
          }, !common_vendor.unref(updateSwitch) ? {
            c: common_vendor.o(($event) => deleteMedia(i, "image"), i)
          } : {}, {
            d: i
          });
        }),
        w: !common_vendor.unref(updateSwitch)
      } : {}, {
        x: diary.value.video.length > 0
      }, diary.value.video.length > 0 ? {
        y: common_vendor.f(diary.value.video, (i, index2, i0) => {
          return common_vendor.e({
            a: common_vendor.unref(js_way.prefix)(i)
          }, !common_vendor.unref(updateSwitch) ? {
            b: common_vendor.o(($event) => deleteMedia(i, "video"), i)
          } : {}, {
            c: "a694f072-3-" + i0 + ",a694f072-2",
            d: common_vendor.o(($event) => previewMedia("video", common_vendor.unref(js_way.prefix)(i)), i),
            e: i
          });
        }),
        z: !common_vendor.unref(updateSwitch),
        A: common_vendor.p({
          type: "videocam",
          size: "35",
          color: "#00F5FF"
        })
      } : {}, {
        B: !common_vendor.unref(updateSwitch)
      }, !common_vendor.unref(updateSwitch) ? {
        C: common_vendor.p({
          type: "plusempty",
          size: "45",
          color: "darkgray"
        }),
        D: common_vendor.o(choose)
      } : {}, {
        E: common_vendor.p({
          title: "\u89C6\u9891\u6216\u56FE\u7247",
          open: !common_vendor.unref(updateSwitch)
        })
      }) : {}, {
        F: common_vendor.unref(updateSwitch)
      }, common_vendor.unref(updateSwitch) ? {
        G: common_vendor.t(diary.value.diary)
      } : {
        H: diary.value.diary,
        I: common_vendor.o(($event) => diary.value.diary = $event.detail.value)
      }, {
        J: diary.value.mood || !common_vendor.unref(updateSwitch)
      }, diary.value.mood || !common_vendor.unref(updateSwitch) ? common_vendor.e({
        K: common_vendor.unref(updateSwitch)
      }, common_vendor.unref(updateSwitch) ? {
        L: common_vendor.t(diary.value.address)
      } : {
        M: diary.value.address,
        N: common_vendor.o(($event) => diary.value.address = $event.detail.value)
      }) : {}, {
        O: common_vendor.t(diary.value.writeTime.split(" ")[1]),
        P: common_vendor.s(_ctx.__cssVars())
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a694f072"], ["__file", "C:/Front_End/diary4/myPage/readDiary/readDiary.vue"]]);
wx.createPage(MiniProgramPage);
