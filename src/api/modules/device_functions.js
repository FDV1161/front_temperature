export default function (instance) {
    return {
        create(payload) {
            return instance.post('device_functions', payload)
        },
        delete(payload) {
            return instance.delete('device_functions/' + payload)
        },
        update(payload) {
            return instance.put('device_functions/' + payload.id, payload)
        },
    }
}