import instance from "../api/instance";
import api from "../api/index";
import router from "../router";

export default {
  namespaced: true,
  state: {
    user: null,
    isAuth: false,
  },
  getters: {
    getUser: (state) => state.user,
    isAuth: (state) => !!state.user,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    REMOVE_USER(state) {
      state.user = null;
    },
  },
  actions: {
    setUser({ commit }, payload) {
      commit("SET_USER", payload);
    },
    removeUser({ commit }, payload) {
      commit("REMOVE_USER", payload);
    },
    signIn({ commit }, userData) {
      commit("SET_USER", userData);
    },
    signOut({ commit }) {
      commit("REMOVE_USER");
    },
  },
};
