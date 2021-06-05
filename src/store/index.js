import Vue from 'vue';
import Vuex from 'vuex';
import notifications from "./notifications";
import rooms from "./rooms";
import currentReadings from "./currentReadings";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        notifications,
        rooms,
        currentReadings,
    }
})