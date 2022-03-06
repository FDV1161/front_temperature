export default function (instance) {
    return {
        getRooms(payload) {
            return instance.get('room', payload)
        },
        getRoom(payload) {
            return instance.get('room/' + payload)
        },
        createRoom(payload) {
            return instance.post('room', payload)
        },
        deleteRoom(payload) {
            return instance.delete('room/' + payload)
        },
        updateRoom(payload) {
            return instance.put('room/' + payload.id, payload)
        },
    }
}