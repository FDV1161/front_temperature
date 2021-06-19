export default {
    namespaced: true,
    state: {
        functions: []
    },
    getters: {

    },
    mutations: {
        LOAD_FUNCTIONS(state, payload) {
            state.functions = payload;
        },
        ADD_FUNCTIONS(state, payload) {
            state.functions.push(payload);
        },
        REMOVE_FUNCTIONS(state, payload) {
            state.functions = state.functions.filter(func => {
                return func.id != payload.id;
            })
        }
    },
    actions: {
        loadFunctions({ commit }, payload) {
            commit('LOAD_FUNCTIONS', payload)
        },
        addFunction({ commit }, payload) {
            commit('ADD_FUNCTIONS', payload)
        },
        removeFunction({ commit }, payload) {
            commit('REMOVE_FUNCTIONS', payload)
        },
    }
}