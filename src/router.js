import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/page/Home.vue'
import RoomsPage from '@/page/Rooms/List.vue'
import FunctionsPage from '@/page/Functions/List.vue'
import FunctionsCreatePage from '@/page/Functions/Create.vue'
import FunctionsEditPage from '@/page/Functions/Edit.vue'
import UserGroups from '@/page/UserGroups.vue'
import Users from '@/page/Users.vue'
import RoomDetailsPage from '@/page/Rooms/Display.vue'
import EditRoom from '@/page/Rooms/Edit.vue'
import CreateRoom from '@/page/Rooms/Create.vue'
import Devices from '@/page/Devices/Display.vue'

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
            path: '/functions/create',
            name: 'functions-create',
            component: FunctionsCreatePage
        },
        {
            path: '/functions/edit/:id',
            name: 'function-edit',
            component: FunctionsEditPage
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
            path: '/devices/:id',
            name: 'devices',
            component: Devices
        },        
        {
            path: '*',
            name: 'not-found',
            component: HomePage
        },
    ]

})
