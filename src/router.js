import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import Charts from '@/views/Charts.vue'
import Sensors from '@/views/Sensors.vue'



Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/charts',
            name: 'Charts',
            component: Charts

        },
        {
            path: '/sensors',
            name: 'Sensors',
            component: Sensors
        }
    ]

})
