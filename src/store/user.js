export default {
    namespaced: true,
    state: {
        user: null
    },
    getters: {
        getUser: state => state.user,
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload;
        },
        REMOVE_USER(state, payload){
            state.user = null;
        }
    },
    actions: {
        setUser({ commit }, payload) {
            commit('SET_USER', payload)
        },
        removeUser({commit}, payload){
            commit('REMOVE_USER', payload)
        }
    }
}