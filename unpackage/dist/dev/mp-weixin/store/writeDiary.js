"use strict";
const js_way = require("../js/way.js");
const writeDiary = {
  namespaced: true,
  state: {
    address: "",
    weather: "",
    mood: "",
    writeTime: js_way.time(),
    diary: "",
    videoList: [],
    imageList: [],
    videoPhotoList: []
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
      let a = state[obj.name].indexOf(obj.value);
      if (a > -1) {
        state[obj.name].splice(a, 1);
      }
    }
  },
  actions: {}
};
exports.writeDiary = writeDiary;
