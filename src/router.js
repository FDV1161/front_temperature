import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/page/Home.vue'
import RoomsPage from '@/page/Rooms/List.vue'
import FunctionsPage from '@/page/Functions/List.vue'
import FunctionsCreatePage from '@/page/Functions/Create.vue'
import FunctionsEditPage from '@/page/Functions/Edit.vue'
import UsersList from '@/page/Users/UsersList.vue'
import RoomDetailsPage from '@/page/Rooms/Display.vue'
import EditRoom from '@/page/Rooms/Edit.vue'
import CreateRoom from '@/page/Rooms/Create.vue'
import Devices from '@/page/Devices/Display.vue'
import deviceFunction from '@/page/DeviceFunction.vue'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
            meta: { authCheck: true },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/page/Login')
        },
        {
            path: '/rooms',
            name: 'rooms',
            component: RoomsPage,
            meta: { authCheck: true },
        },
        {
            path: '/rooms/:id',
            name: 'room-details',
            component: RoomDetailsPage,
            meta: { authCheck: true },
        },
        {
            path: '/edit-room/:id',
            name: 'edit-room',
            component: EditRoom,
            meta: { authCheck: true },
        },
        {
            path: '/create-room',
            name: 'create-room',
            component: CreateRoom,
            meta: { authCheck: true },
        },
        {
            path: '/functions',
            name: 'functions',
            component: FunctionsPage,
            meta: { authCheck: true },
        },
        {
            path: '/functions/create',
            name: 'functions-create',
            component: FunctionsCreatePage,
            meta: { authCheck: true },
        },
        {
            path: '/functions/edit/:id',
            name: 'function-edit',
            component: FunctionsEditPage,
            meta: { authCheck: true },
        },        
        {
            path: '/users',
            name: 'users',
            component: UsersList,
            meta: { authCheck: true },
        },        
        {
            path: '/users/:id',
            name: 'usersEdit',
            component: () => import('@/page/Users/UsersEdit'),
            meta: { authCheck: true },
        },
        {
            path: '/users/create',
            name: 'usersCreate',
            component: () => import('@/page/Users/UsersCreate'),
            meta: { authCheck: true },
        },
        {
            path: '/devices/:id',
            name: 'devices',
            component: Devices,
            meta: { authCheck: true },
        },
        {
            path: '/device-function/:id',
            name: 'deviceFunction',
            component: deviceFunction,
            meta: { authCheck: true },
        },
        {
            path: '*',
            name: 'not-found',
            component: HomePage,
            component: () => import('@/page/NotFound')
        },
    ]

})

router.beforeEach((to, from, next) => {
    const {"user/isAuth": userIsAuth} = store.getters;    
    const requireAuth = to.matched.some(record => record.meta.authCheck);
    if (requireAuth && !userIsAuth) {
        next({ name: "login" });
    }else{
        next();
    }    
})


export default router;