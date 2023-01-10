"use strict";
const common_vendor = require("../common/vendor.js");
const js_way = require("../js/way.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const __default__ = {
  options: {
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "weatherAndMood",
  setup(__props) {
    const myStore = common_vendor.useStore();
    const writeDiary = myStore.state.writeDiary;
    setInterval(() => {
      myStore.commit("writeDiary/changeTime", js_way.time());
    }, 1e3);
    async function getAddress() {
      const res = await common_vendor.index.chooseLocation();
      let address = res.name;
      myStore.commit("writeDiary/changeState", { name: "address", value: address });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(writeDiary).writeTime),
        b: common_vendor.unref(writeDiary).address,
        c: common_vendor.o(($event) => common_vendor.unref(writeDiary).address = $event.detail.value),
        d: common_vendor.o(($event) => getAddress()),
        e: common_vendor.p({
          type: "location-filled",
          size: "30",
          color: "red"
        }),
        f: common_vendor.unref(writeDiary).weather,
        g: common_vendor.o(($event) => common_vendor.unref(writeDiary).weather = $event.detail.value),
        h: common_vendor.unref(writeDiary).mood,
        i: common_vendor.o(($event) => common_vendor.unref(writeDiary).mood = $event.detail.value)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9a97fe15"], ["__file", "C:/Front_End/diary4/components/weatherAndMood.vue"]]);
wx.createComponent(Component);
