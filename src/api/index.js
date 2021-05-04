import instance from './instance'
import roomsModule from './rooms'

getSensors: (instance) => {
    instance.get('sensors')
}

export default {
    rooms: roomsModule(instance), 
    // getSensors(){
    //     return instance.get('sensors')
    // },
}
