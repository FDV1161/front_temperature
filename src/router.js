import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/page/Home.vue'
import Charts from '@/page/Charts.vue'
import Sensors from '@/page/Sensors.vue'
import NotCharts from '@/page/NotCharts.vue'
import RoomsPage from '@/page/Rooms/List.vue'
import FunctionsPage from '@/page/Functions.vue'
import UserGroups from '@/page/UserGroups.vue'
import Users from '@/page/Users.vue'
// import RoomDetailsPage from '@/page/RoomDetailsPage.vue'
import RoomDetailsPage from '@/page/Rooms/Display.vue'
import EditRoom from '@/page/Rooms/Edit.vue'
import CreateRoom from '@/page/Rooms/Create.vue'
import Sensor from '@/page/Sensors/Display.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {            
            path: '/rooms',
            name: 'rooms',
            component: RoomsPage
        },
        {            
            path: '/rooms/:id',
            name: 'room-details',
            component: RoomDetailsPage
        },
        {            
            path: '/edit-room/:id',
            name: 'edit-room',
            component: EditRoom
        },
        {            
            path: '/create-room',
            name: 'create-room',
            component: CreateRoom
        },
        {            
            path: '/functions',
            name: 'functions',
            component: FunctionsPage
        },
        {            
            path: '/user-groups',
            name: 'user-groups',
            component: UserGroups
        },
        {            
            path: '/users',
            name: 'users',
            component: Users
        },
        {
            path: '/charts',
            name: 'charts',
            component: Charts

        },
        {
            path: '/sensors',
            name: 'sensors',
            component: Sensors
        },
        {
            path: '/sensor/:id',
            name: 'sensor',
            component: Sensor
        },
        {
            path: '*',
            name: 'not-found',
            component: Sensors
        },
    ]

})