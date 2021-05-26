export default function (instance) {
    return {     
        getDevices() {
            return instance.get('devices')
        },
        createDevice(payload) {
            return instance.post('devices', payload)
        },
    }
}