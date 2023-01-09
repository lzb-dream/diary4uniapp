"use strict";
const js_way = require("../js/way.js");
const writeDiary = {
  namespaced: true,
  state: {
    address: "",
    videoList: [],
    imageList: [],
    videoPhotoList: [],
    writeTime: js_way.time(),
    diary: ""
  },
  getters: {},
  mutations: {
    changeTime(state, value) {
      state["writeTime"] = value;
    },
    changeState(state, obj) {
      state[obj.name] = obj.value;
    },
    push(state, obj) {
      state[obj.name].push(obj.value);
    },
    pop(state, obj) {
      state[obj.name].splice(obj.index, 1);
    }
  },
  actions: {}
};
exports.writeDiary = writeDiary;
