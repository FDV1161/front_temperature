export default function (instance) {
    return {
        getRooms() {
            return instance.get('room')
        },
        getRoom(payload) {
            return instance.get('room/' + payload)
        },
        getSensors() {
            return instance.get('sensors')
        },
        getSensor(payload) {
            return instance.get('sensors/' + payload)
        },
        createRoom(payload) {
            return instance.post('room', payload)
        },
        deleteRoom(payload) {
            return instance.delete('room/' + payload)
        },
        createSensor(payload) {
            return instance.post('sensors', payload)
        },
        getMeasures() {
            return instance.get('measures')
        },
        getDevices() {
            return instance.get('devices')
        },
        createDevice(payload) {
            return instance.post('devices', payload)
        },
        updateRoom(payload) {
            return instance.put('room/' + payload.id, payload)
        },
        deleteSensor(payload){
            return instance.delete('sensors/' + payload)
        },

    }
}