"use strict";
const common_vendor = require("../common/vendor.js");
const js_request = require("../js/request.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  _easycom_uni_notice_bar2();
}
const _easycom_uni_notice_bar = () => "../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
if (!Math) {
  _easycom_uni_notice_bar();
}
const _sfc_main = {
  __name: "notice",
  setup(__props) {
    let text = common_vendor.ref("");
    js_request.requests({ url: "speack", method: "GET" }).then((res) => {
      text.value = res.data.txt;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-icon"]: true,
          scrollable: true,
          speed: 60,
          text: common_vendor.unref(text),
          backgroundColor: "transparent"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Front_End/diary4/components/notice.vue"]]);
wx.createComponent(Component);
