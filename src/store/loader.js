export default {
  namespaced: true,
  state: {
    loading: false,
  },
  getters: {
    // getLoading: (state) => state.loading,
    getLoading(state) {
      return state.loading;
    },
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit("SET_LOADING", payload);
    },
  },
};
