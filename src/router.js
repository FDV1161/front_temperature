import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/page/Home.vue'
import Charts from '@/page/Charts.vue'
import Sensors from '@/page/Sensors.vue'
import NotCharts from '@/page/NotCharts.vue'
import RoomsPage from '@/page/Rooms.vue'
import FunctionsPage from '@/page/Functions.vue'
import UserGroups from '@/page/UserGroups.vue'
import Users from '@/page/Users.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage
        },
        {            
            path: '/rooms',
            name: 'Rooms',
            component: RoomsPage
        },
        {            
            path: '/functions',
            name: 'Functions',
            component: FunctionsPage
        },
        {            
            path: '/user-groups',
            name: 'UserGroups',
            component: UserGroups
        },
        {            
            path: '/users',
            name: 'Users',
            component: Users
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
        },
    ]

})
