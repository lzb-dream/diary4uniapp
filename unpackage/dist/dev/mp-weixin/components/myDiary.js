"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "myDiary",
  setup(__props) {
    const myStore = common_vendor.useStore();
    myStore.state.readDiary;
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-acde24a9"], ["__file", "C:/Front_End/diary4/components/myDiary.vue"]]);
wx.createComponent(Component);
