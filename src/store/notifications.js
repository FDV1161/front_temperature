export default {
    namespaced: true,
    state: {
        notifications: [],
        rooms: []
    },
    getters: {

    },
    mutations: {
        PUSH_NOTIFICATIONS(state, payload) {
            state.notifications.push(payload);
        },
        REMOVE_NOTIFICATIONS(state, payload) {
            state.notifications = state.notifications.filter(notification => {
                return notification.id != payload.id;
            })
        }
    },
    actions: {
        push_notifications({ commit, dispatch }, payload) {
            commit('PUSH_NOTIFICATIONS', {
                ...payload,
                id: 'id' + (new Date()).getTime()
            });
        },
        remove_notifications({ commit }, payload) {
            commit('REMOVE_NOTIFICATIONS', payload)
        }
    }
}