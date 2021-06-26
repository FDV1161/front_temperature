const SETTINGS = {
    baseIconURL: "http://192.168.0.135:5000/static",
}


export default {
    install(Vue) {
        Vue.prototype.$settings = SETTINGS
    }
}