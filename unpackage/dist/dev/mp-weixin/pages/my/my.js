"use strict";
const common_vendor = require("../../common/vendor.js");
const js_request = require("../../js/request.js");
const js_way = require("../../js/way.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  _easycom_uni_segmented_control2();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
if (!Math) {
  (_easycom_uni_segmented_control + MyDiary + LoveWallpaper)();
}
const MyDiary = () => "../../components/myDiary.js";
const LoveWallpaper = () => "../../components/loveWallpaper.js";
const __default__ = {
  data() {
    return {};
  },
  methods: {}
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "my",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "2f1ef635-loginImageHeight": common_vendor.unref(loginImageHeight)
    }));
    const myStore = common_vendor.useStore();
    const items = ["\u6211\u5199\u7684\u65E5\u8BB0", "\u559C\u6B22\u7684\u56FE\u7247"];
    let current = common_vendor.ref(0);
    function onClickItem(e) {
      if (current.value !== e.currentIndex) {
        current.value = e.currentIndex;
      }
    }
    async function login() {
      let loginRes = await common_vendor.index.login();
      console.log(loginRes);
      let code = loginRes.code;
      let addTime = new Date().getTime();
      const respone = await js_request.requests({ method: "POST", url: "login", data: { code, addTime } });
      const resData = respone.data;
      let status = respone.statusCode === 200 ? true : false;
      if (status) {
        common_vendor.index.removeStorageSync("wallpaper");
        common_vendor.index.setStorageSync("userInfo", resData);
        myStore.commit("changeState", { name: "haslogin", value: true });
        myStore.commit("changeUserInfo", { name: "nickName", value: resData.nickName });
        myStore.commit("changeUserInfo", { name: "id", value: resData.userId });
        myStore.commit("changeUserInfo", { name: "userImage", value: resData.userImage });
        myStore.commit("wallpaper/changeState", { name: "loveImage", value: resData.heartWallpapwer });
        myStore.dispatch("readDiary/getDairy");
      } else {
        js_way.showToast("\u767B\u5F55\u8BF7\u6C42\u5931\u8D25", "error");
      }
    }
    let loginImageHeight = myStore.state.screenHeight - myStore.state.tabbarheight + "px";
    console.log(loginImageHeight);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.$store.state.haslogin
      }, _ctx.$store.state.haslogin ? common_vendor.e({
        d: common_vendor.t(_ctx.$store.state.userInfo.nickName),
        e: _ctx.$store.state.URL.replace("api/", "") + _ctx.$store.state.userInfo.userImage
      }, {
        f: common_vendor.s(_ctx.__cssVars())
      }) : {}, {
        g: common_vendor.o(($event) => onClickItem($event)),
        h: common_vendor.p({
          current: common_vendor.unref(current),
          values: items,
          ["active-color"]: "#6da6be"
        }),
        i: common_vendor.unref(current) === 0
      }, common_vendor.unref(current) === 0 ? {} : {}, {
        j: common_vendor.unref(current) === 1
      }, common_vendor.unref(current) === 1 ? {} : {}, {
        k: common_vendor.s(_ctx.__cssVars()),
        l: !_ctx.$store.state.haslogin
      }, !_ctx.$store.state.haslogin ? {
        m: _ctx.$store.state.URL.replace("api/", "") + "static/set/login.png",
        n: common_vendor.o(login),
        o: common_vendor.s(_ctx.__cssVars())
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"], ["__file", "C:/Front_End/diary4/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
