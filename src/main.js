import Vue from "vue";
import App from "./App.vue";
import Chart from "chart.js";
import vuetify from "./plugins/vuetify";
import router from "./router";
import apiPlugin from "./plugins/api";
import store from "./store/index";
import socketio from "socket.io-client";
import { baseURL } from "./settings";

export const SocketInstance = socketio(baseURL);
import VueSocketIO from "vue-socket.io";

Chart.pluginService.register({
  beforeDraw: function(chart, easing) {
    if (
      chart.config.options.chartArea &&
      chart.config.options.chartArea.backgroundColor
    ) {
      var ctx = chart.chart.ctx;
      ctx.save();
      ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
      ctx.fillRect(0, 0, chart.canvas.width, chart.canvas.height);
      ctx.restore();
    }
  },
});

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: SocketInstance,
    vuex: {
      store,
      actionPrefix: "socket_",
      mutationPrefix: "SOCKET_",
    },
  })
);

Vue.use(apiPlugin);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
