"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "loading",
  props: ["status"],
  setup(__props) {
    const props = __props;
    common_vendor.useCssVars((_ctx) => ({
      "d56252fb-lodingMeasure": common_vendor.unref(lodingMeasure)
    }));
    let lodingMeasure = "20rpx";
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.status
      }, props.status ? {
        b: common_vendor.s(_ctx.__cssVars())
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d56252fb"], ["__file", "C:/Front_End/diary4/components/loading.vue"]]);
wx.createComponent(Component);
