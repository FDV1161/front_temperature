export default {
    namespaced: true,
    state: {
        rooms: []
    },
    getters: {        
        getRooms: state => state.rooms,
    },
    mutations: {
        LOAD_ROOMS(state, payload) {
            state.rooms = payload;
        },
        ADD_ROOM(state, payload) {
            state.rooms.push(payload);
        },
        REMOVE_ROOM(state, payload) {
            state.rooms = state.rooms.filter(room => {
                return room.id != payload.id;
            })
        }
    },
    actions: {
        loadRooms({ commit }, payload) {
            commit('LOAD_ROOMS', payload)
        },
        addRoom({ commit }, payload) {
            commit('ADD_ROOM', payload)
        },
        removeRoom({ commit }, payload) {
            commit('REMOVE_ROOM', payload)
        },
    }
}