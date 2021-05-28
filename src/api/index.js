import instance from './instance';
import roomsModule from './modules/rooms';
import devicesModule from './modules/devices';
import controllersModule from './modules/controllers';

export default {  
    rooms: roomsModule(instance),
    devices: devicesModule(instance),
    controllers: controllersModule(instance),
}
