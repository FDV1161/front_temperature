import { dictFromArray } from "@/utils/index";

export default {
  namespaced: true,
  state: {
    isConnect: false,
    data: {},
  },
  getters: {
    getCurValues: (state) => state.data,
    getCurValue: (state) => (deviceFunctionId) => {
      return state.data[deviceFunctionId];
    },
  },
  mutations: {
    SOCKET_CONNECT(state, payload) {
      state.isConnect = true;
    },
    SOCKET_DISCONNECT(state, payload) {
      state.isConnect = false;
    },
    SOCKET_MESSAGE(state, payload) {
      state.data = dictFromArray(payload, "id");
    },
  },
  actions: {
    socket_connect({ commit }, payload) {
      commit("SOCKET_CONNECT", payload);
    },
    socket_disconnect({ commit }, payload) {
      commit("SOCKET_DISCONNECT", payload);
    },
    socket_message({ commit }, payload) {
      commit("SOCKET_MESSAGE", payload);
    },
  },
};
