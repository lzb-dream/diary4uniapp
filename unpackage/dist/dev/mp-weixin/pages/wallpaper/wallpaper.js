"use strict";
const common_vendor = require("../../common/vendor.js");
const js_request = require("../../js/request.js");
const js_way = require("../../js/way.js");
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
    function judgeLogin() {
      common_vendor.index.showModal({
        title: "\u8BF7\u767B\u5F55\u540E\u64CD\u4F5C",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.switchTab({
              url: "/pages/my/my"
            });
          }
        }
      });
    }
    const topShow = common_vendor.ref(false);
    let loadingStatus = common_vendor.ref(false);
    const topTabbarList = ["\u7F8E\u98DF", "\u76F8\u7EA6", "\u5BB6\u5EAD", "\u5B69\u7AE5"];
    let topNumber = common_vendor.ref(0);
    async function deleteImage(tableName, id) {
      console.log(tableName);
      const res = await js_request.requests({ method: "DELETE", data: { id, tableName }, url: "getWallPaper" });
      console.log(res.data);
    }
    function clickToptabbar(index) {
      topShow.value = false;
      if (imageData[index].imageList.length === 0) {
        myStore.dispatch("wallpaper/getData", imageData[index]["tableName"]);
      }
      topNumber.value = index;
    }
    let heartSwitch = common_vendor.ref(false);
    async function changeCheckbox(e, imageId, tableS, maxImage) {
      if (heartSwitch.value) {
        return;
      }
      heartSwitch.value = true;
      setTimeout(() => {
        heartSwitch.value = false;
      }, 1e3);
      if (!myStore.state.haslogin) {
        judgeLogin();
        return;
      } else {
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
      console.log(data.id);
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
                c: common_vendor.o(($event) => deleteImage(data.tableName, leftImage.id), leftIndex),
                d: common_vendor.o(($event) => changeCheckbox($event, leftImage.id, data.tableS, leftImage.maxImage), leftIndex),
                e: leftIndex
              };
            }),
            b: common_vendor.o(lower, dataIndex),
            c: common_vendor.o(scroll, dataIndex),
            d: dataIndex,
            e: dataIndex === common_vendor.unref(topNumber)
          };
        }),
        d: _ctx.$store.state.URL.replace("api/", "") + "static/set/download.png",
        e: common_vendor.unref(heartSwitch),
        f: scrollTop.value,
        g: common_vendor.s(_ctx.__cssVars()),
        h: topShow.value
      }, topShow.value ? {
        i: common_vendor.p({
          type: "arrow-up",
          size: "35",
          color: "#00F5FF"
        }),
        j: common_vendor.o(backTop),
        k: common_vendor.s(_ctx.__cssVars())
      } : {}, {
        l: common_vendor.p({
          type: "refresh",
          size: "35",
          color: "#00F5FF"
        }),
        m: common_vendor.o(reset),
        n: common_vendor.s(_ctx.__cssVars()),
        o: common_vendor.s(_ctx.__cssVars()),
        p: common_vendor.p({
          status: common_vendor.unref(loadingStatus)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9dfebe0d"], ["__file", "C:/Front_End/diary4/pages/wallpaper/wallpaper.vue"]]);
wx.createPage(MiniProgramPage);
