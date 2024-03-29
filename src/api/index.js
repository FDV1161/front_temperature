import instance from './instance';
import roomsModule from './modules/rooms';
import devicesModule from './modules/devices';
import controllersModule from './modules/controllers';
import functionsModule from './modules/functions';
import currentReadingsModule from './modules/current_readings';
import journalReadingsModule from './modules/journal_readings';
import deviceFunctionsModule from './modules/device_functions';
import homeModule from './modules/home';
import usersModule from './modules/users';
import authModule from './modules/auth';
import groupsModule from './modules/groups';

export default {
    rooms: roomsModule(instance),
    devices: devicesModule(instance),
    controllers: controllersModule(instance),
    functions: functionsModule(instance),
    currentReadings: currentReadingsModule(instance),
    journalReadings: journalReadingsModule(instance),
    deviceFunctions: deviceFunctionsModule(instance),
    home: homeModule(instance),
    users: usersModule(instance),    
    auth: authModule(instance),
    groups: groupsModule(instance)
}
