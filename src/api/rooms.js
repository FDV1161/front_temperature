export default function (instance){
    return {
        getRooms(){
            return instance.get('rooms')
        },
        getRoom(payload){
            return instance.get('rooms/' + payload)
        },
        getSensors(){
            return instance.get('sensors')
        },
        createRoom(payload){
            return instance.post('rooms', payload)
        },
        // updateRoom(id, payload){
        //     return instance.post('sensors', payload)
        // },

    }
}