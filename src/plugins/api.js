import api from '@/api/index'
import instance  from '../api/instance'

export default {
    install(Vue) {
        Vue.prototype.$api = api,
        Vue.prototype.$axios = instance
    }
}