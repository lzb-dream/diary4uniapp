"use strict";
const common_vendor = require("../common/vendor.js");
const js_way = require("../js/way.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_icons2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_collapse_item = () => "../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
const __default__ = {
  options: {
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "imageAndVideo",
  setup(__props) {
    const myStore = common_vendor.useStore();
    const writeDiary = myStore.state.writeDiary;
    async function choose() {
      if (!myStore.state.haslogin) {
        js_way.judgeLogin();
        return;
      }
      let mediaNumber = writeDiary.imageList.length + writeDiary.videoList.length;
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
          myStore.commit("writeDiary/push", { name: "imageList", value: tempFilePath });
        } else if (Type === "video") {
          myStore.commit("writeDiary/push", { name: "videoList", value: tempFilePath });
          myStore.commit("writeDiary/push", { name: "videoPhotoList", value: videoPhoto });
        }
      }
    }
    function previewImage(imageUrl) {
      common_vendor.index.previewImage({
        urls: [imageUrl]
      });
    }
    function deleteMedia(media, Type) {
      myStore.commit("writeDiary/pop", { name: Type, value: media });
      if (Type === "video") {
        myStore.commit("writeDiary/pop", { name: "videoPhotoList", value: media });
      }
    }
    function previewVideo(mediaUrl) {
      common_vendor.index.previewMedia({
        sources: [mediaUrl]
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(writeDiary).imageList.length > 0
      }, common_vendor.unref(writeDiary).imageList.length > 0 ? {
        b: common_vendor.f(common_vendor.unref(writeDiary).imageList, (i, index, i0) => {
          return {
            a: i,
            b: common_vendor.o(($event) => previewImage(i), i),
            c: common_vendor.o(($event) => deleteMedia(i, "imageList"), i),
            d: i
          };
        })
      } : {}, {
        c: common_vendor.unref(writeDiary).videoList.length > 0
      }, common_vendor.unref(writeDiary).videoList.length > 0 ? {
        d: common_vendor.f(common_vendor.unref(writeDiary).videoList, (i, index, i0) => {
          return {
            a: i,
            b: common_vendor.o(($event) => deleteMedia(i, "videoList"), i),
            c: "d80c39b6-2-" + i0 + ",d80c39b6-1",
            d: common_vendor.o(($event) => previewVideo(i), i),
            e: i
          };
        }),
        e: common_vendor.p({
          type: "videocam",
          size: "35",
          color: "#00F5FF"
        })
      } : {}, {
        f: common_vendor.p({
          type: "plusempty",
          size: "45",
          color: "darkgray"
        }),
        g: common_vendor.o(choose),
        h: common_vendor.p({
          title: "\u4FDD\u5B58\u56FE\u7247\u6216\u89C6\u9891\u8BF7\u70B9\u51FB\u8FD9\u91CC",
          open: false
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d80c39b6"], ["__file", "C:/Front_End/diary4/components/imageAndVideo.vue"]]);
wx.createComponent(Component);
