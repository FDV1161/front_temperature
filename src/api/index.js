import instance from './instance'
import roomsModule from './modules/rooms'
import devicesModule from './modules/devices'


export default {
    rooms: roomsModule(instance),
    devices: devicesModule(instance),
}
