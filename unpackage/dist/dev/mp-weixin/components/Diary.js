"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "Diary",
  setup(__props) {
    const myStore = common_vendor.useStore();
    let diary = common_vendor.ref("");
    common_vendor.watch(diary, () => {
      let value = diary.value;
      let judge = diary.value.match(/^\s+$/);
      if (judge !== null) {
        return false;
      }
      myStore.commit("writeDiary/changeState", { name: "diary", value });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(diary),
        b: common_vendor.o(($event) => common_vendor.isRef(diary) ? diary.value = $event.detail.value : diary = $event.detail.value)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f7dd7eb9"], ["__file", "C:/Front_End/diary4/components/Diary.vue"]]);
wx.createComponent(Component);
