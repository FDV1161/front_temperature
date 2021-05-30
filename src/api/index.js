import instance from './instance';
import roomsModule from './modules/rooms';
import devicesModule from './modules/devices';
import controllersModule from './modules/controllers';
import functionsModule from './modules/functions';

export default {  
    rooms: roomsModule(instance),
    devices: devicesModule(instance),
    controllers: controllersModule(instance),
    functions: functionsModule(instance),
}
