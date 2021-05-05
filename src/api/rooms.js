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
        createSensor(payload){
            return instance.post('rooms', payload)
        },
        getMeasures(){
            return instance.get('measures')
        },
        getDevices(){
            return instance.get('devices')
        },
        createDevice(payload){
            return instance.post('devices', payload)
        }

        // updateRoom(id, payload){
        //     return instance.post('sensors', payload)
        // },

    }
}