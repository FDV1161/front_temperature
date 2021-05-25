import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        notifications: []
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

            // setTimeout(() => {
            //     dispatch('remove_notifications', notification);
            // }, 15000);
        },
        remove_notifications({ commit }, payload) {
            commit('REMOVE_NOTIFICATIONS', payload)
        }
    }
})