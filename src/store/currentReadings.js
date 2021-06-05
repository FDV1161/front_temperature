export default {
    namespaced: true,
    state: {
        currentReadings: []
    },
    getters: {
        getReadingById: state => id => {
            return state.currentReadings.find(reading => reading.deviceFuncId === id);
        }
    },
    mutations: {
        LOAD_CURRENT_READINGS(state, payload) {
            state.currentReadings = payload;
        },
    },
    actions: {
        loadCurrentReadings({ commit }, payload) {
            commit('LOAD_CURRENT_READINGS', payload)
        },
    }
}