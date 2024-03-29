import Vue from "vue";
import Vuex from "vuex";
import notifications from "./notifications";
import rooms from "./rooms";
import currentReadings from "./currentReadings";
import functions from "./functions";
import user from "./user";
import soketio from "./soketio";
import loader from "./loader"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loader,
    notifications,
    rooms,
    currentReadings,
    functions,
    user,
    soketio,    
  },
});
