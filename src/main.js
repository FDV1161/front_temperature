import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import apiPlugin from './plugins/api';
import settingsPlugin from './plugins/settings';
import store from './store/index';

Vue.config.productionTip = false
Vue.use(apiPlugin)
Vue.use(settingsPlugin)


new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
