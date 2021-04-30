import instance from './instance'
import roomsModule from './rooms'

export default {
    rooms: roomsModule(instance)
}