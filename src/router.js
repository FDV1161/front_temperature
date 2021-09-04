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
            path: '/user-groups',
            name: 'user-groups',
            component: UserGroups,
            meta: { authCheck: true },
        },
        {
            path: '/users',
            name: 'users',
            component: Users,
            meta: { authCheck: true },
        },
        {
            path: '/devices/:id',
            name: 'devices',
            component: Devices,
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
    const userIsAuth = !!localStorage.getItem("user");
    const requireAuth = to.matched.some(record => record.meta.authCheck);
    if (requireAuth && !userIsAuth) {
        next({ name: "login" });
    }else{
        next();
    }    
})


export default router;