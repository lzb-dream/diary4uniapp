"use strict";
const common_vendor = require("../../common/vendor.js");
const js_request = require("../../js/request.js");
const js_way = require("../../js/way.js");
require("../../store/index.js");
require("../../store/writeDiary.js");
require("../../store/wallpaper.js");
require("../../store/readDiary.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_icons + Loading)();
}
const Loading = () => "../../components/loading.js";
const _sfc_main = {
  __name: "wallpaper",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "9dfebe0d-statusBarHeight": common_vendor.unref(statusBarHeight),
      "9dfebe0d-scrollYHeight": common_vendor.unref(scrollYHeight)
    }));
    const myStore = common_vendor.useStore();
    myStore.dispatch("wallpaper/getData", "GourmetFood");
    const wallpaper = myStore.state.wallpaper;
    const imageData = wallpaper.imageData;
    const topShow = common_vendor.ref(false);
    let loadingStatus = common_vendor.ref(false);
    const topTabbarList = ["\u7F8E\u98DF", "\u76F8\u7EA6", "\u5BB6\u5EAD", "\u5B69\u7AE5"];
    let topNumber = common_vendor.ref(0);
    function clickToptabbar(index) {
      topShow.value = false;
      if (imageData[index].imageList.length === 0) {
        myStore.dispatch("wallpaper/getData", imageData[index]["tableName"]);
      }
      topNumber.value = index;
    }
    let heartSwitch = common_vendor.ref(false);
    async function changeCheckbox(e, imageId, tableS, maxImage) {
      if (!myStore.state.haslogin) {
        js_way.judgeLogin();
        return;
      } else {
        if (heartSwitch.value) {
          return;
        }
        heartSwitch.value = true;
        setTimeout(() => {
          heartSwitch.value = false;
        }, 1e3);
        if (e.detail.value.length > 0) {
          js_request.requests({ url: "loveimage", method: "POST", data: { "image": { [tableS]: imageId } } });
          myStore.commit("wallpaper/push", { name: "loveImage", value: { loveImage: maxImage, id: { [tableS]: imageId } } });
        } else {
          js_request.requests({ url: "loveimage", method: "DELETE", data: { "image": { [tableS]: imageId } } });
          myStore.commit("wallpaper/remove", maxImage);
        }
      }
    }
    common_vendor.ref(null);
    function backTop() {
      scrollTop.value = 0;
    }
    const scrollTop = common_vendor.ref(null);
    function scroll(e) {
      scrollTop.value = e.detail.scrollTop;
      if (scrollTop.value > 800) {
        topShow.value = true;
      } else {
        topShow.value = false;
      }
    }
    function clickImage(data) {
      if (!myStore.state.haslogin) {
        js_way.judgeLogin();
        return;
      }
      common_vendor.index.previewImage({
        urls: [data.maxImage]
      });
    }
    function reset() {
      var timerLodingStatus;
      loadingStatus.value = true;
      clearTimeout(timerLodingStatus);
      timerLodingStatus = setTimeout(() => {
        loadingStatus.value = false;
      }, 1e3);
      myStore.commit("wallpaper/empty", imageData[topNumber.value].tableName);
      myStore.dispatch("wallpaper/getData", imageData[topNumber.value].tableName);
    }
    function lower() {
      myStore.dispatch("wallpaper/getData", imageData[topNumber.value].tableName);
    }
    `${myStore.state.URL.replace("api/", "")}static/set/download.png`;
    `${myStore.state.URL.replace("api/", "")}static/set/downloadOk.png`;
    `${myStore.state.URL.replace("api/", "")}static/backgroundImage/recordImage.jpg`;
    let statusBarHeight = myStore.state.statusBarHeight;
    let scrollYHeight = myStore.state.screenHeight - myStore.state.tabbarheight - js_way.rpxTopx(130) - statusBarHeight;
    scrollYHeight = scrollYHeight + "px";
    statusBarHeight = statusBarHeight + "px";
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(topTabbarList, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index === common_vendor.unref(topNumber) ? 1 : "",
            c: common_vendor.o(($event) => clickToptabbar(index), item),
            d: item
          };
        }),
        b: common_vendor.s(_ctx.__cssVars()),
        c: common_vendor.f(common_vendor.unref(imageData), (data, dataIndex, i0) => {
          return {
            a: common_vendor.f(data["imageList"], (leftImage, leftIndex, i1) => {
              return {
                a: leftImage["minImage"],
                b: common_vendor.o(($event) => clickImage(leftImage), leftIndex),
                c: common_vendor.o(($event) => changeCheckbox($event, leftImage.id, data.tableS, leftImage.maxImage), leftIndex),
                d: leftIndex
              };
            }),
            b: common_vendor.o(lower, dataIndex),
            c: common_vendor.o(scroll, dataIndex),
            d: dataIndex,
            e: dataIndex === common_vendor.unref(topNumber)
          };
        }),
        d: common_vendor.unref(heartSwitch),
        e: scrollTop.value,
        f: common_vendor.s(_ctx.__cssVars()),
        g: topShow.value
      }, topShow.value ? {
        h: common_vendor.p({
          type: "arrow-up",
          size: "35",
          color: "#00F5FF"
        }),
        i: common_vendor.o(backTop),
        j: common_vendor.s(_ctx.__cssVars())
      } : {}, {
        k: common_vendor.p({
          type: "refresh",
          size: "35",
          color: "#00F5FF"
        }),
        l: common_vendor.o(reset),
        m: common_vendor.s(_ctx.__cssVars()),
        n: common_vendor.s(_ctx.__cssVars()),
        o: common_vendor.p({
          status: common_vendor.unref(loadingStatus)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9dfebe0d"], ["__file", "C:/Front_End/diary4/pages/wallpaper/wallpaper.vue"]]);
wx.createPage(MiniProgramPage);
