"use strict";
const common_vendor = require("../../common/vendor.js");
const js_request = require("../../js/request.js");
const js_way = require("../../js/way.js");
require("../../store/index.js");
require("../../store/writeDiary.js");
require("../../store/wallpaper.js");
require("../../store/readDiary.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  (_easycom_uni_popup2 + _easycom_uni_icons2 + _easycom_uni_segmented_control2)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
if (!Math) {
  (_easycom_uni_popup + _easycom_uni_icons + _easycom_uni_segmented_control + MyDiary + LoveWallpaper)();
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
      "2f1ef635-popupWidth": common_vendor.unref(popupWidth),
      "2f1ef635-loginImageHeight": common_vendor.unref(loginImageHeight)
    }));
    const myStore = common_vendor.useStore();
    const items = ["\u6211\u5199\u7684\u65E5\u8BB0", "\u559C\u6B22\u7684\u56FE\u7247"];
    let switchNickname = common_vendor.ref(true);
    let switchUpNickname = false;
    function startNickName() {
      switchNickname.value = false;
    }
    common_vendor.watch(() => myStore.state.userInfo.nickName, () => {
      switchUpNickname = true;
    });
    async function endNickName() {
      if (switchUpNickname) {
        const res = await js_request.requests({ url: "userup", method: "PUT", data: { nickName: myStore.state.userInfo.nickName } });
        if (res.statusCode == 200) {
          js_way.showToast("\u6635\u79F0\u4FEE\u6539\u6210\u529F", "success");
        }
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        userInfo.nickName = myStore.state.userInfo.nickName;
        common_vendor.index.setStorageSync("userInfo", userInfo);
        switchUpNickname = false;
      }
      switchNickname.value = true;
    }
    const popup = common_vendor.ref("popup");
    function open() {
      popup.value.open("right");
    }
    function outLogin() {
      common_vendor.index.removeStorageSync("userInfo");
      myStore.commit("changeState", { name: "haslogin", value: false });
      myStore.commit("readDiary/empty");
      popup.value.close();
    }
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
    let popupWidth = myStore.state.screenWidth / 1.5 + "px";
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(switchNickname) ? 1 : "",
        b: common_vendor.unref(switchNickname),
        c: _ctx.$store.state.userInfo.nickName,
        d: common_vendor.o(($event) => _ctx.$store.state.userInfo.nickName = $event.detail.value),
        e: common_vendor.unref(switchNickname)
      }, common_vendor.unref(switchNickname) ? {
        f: common_vendor.o(startNickName)
      } : {
        g: common_vendor.o(endNickName)
      }, {
        h: common_vendor.o(outLogin),
        i: common_vendor.sr(popup, "2f1ef635-0", {
          "k": "popup"
        }),
        j: common_vendor.s(_ctx.__cssVars()),
        k: common_vendor.p({
          ["is-mask-click"]: true,
          backgroundColor: "#fff"
        }),
        l: _ctx.$store.state.haslogin
      }, _ctx.$store.state.haslogin ? common_vendor.e({
        o: common_vendor.t(_ctx.$store.state.userInfo.nickName),
        p: _ctx.$store.state.URL.replace("api/", "") + _ctx.$store.state.userInfo.userImage,
        q: common_vendor.p({
          type: "gear",
          size: "30",
          color: "gray"
        }),
        r: common_vendor.o(open)
      }, {
        s: common_vendor.s(_ctx.__cssVars())
      }) : {}, {
        t: common_vendor.o(($event) => onClickItem($event)),
        v: common_vendor.p({
          current: common_vendor.unref(current),
          values: items,
          ["active-color"]: "#6da6be"
        }),
        w: common_vendor.unref(current) === 0
      }, common_vendor.unref(current) === 0 ? {} : {}, {
        x: common_vendor.unref(current) === 1
      }, common_vendor.unref(current) === 1 ? {} : {}, {
        y: common_vendor.s(_ctx.__cssVars()),
        z: !_ctx.$store.state.haslogin
      }, !_ctx.$store.state.haslogin ? {
        A: _ctx.$store.state.URL.replace("api/", "") + "static/set/login.png",
        B: common_vendor.o(login),
        C: common_vendor.s(_ctx.__cssVars())
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"], ["__file", "C:/Front_End/diary4/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
