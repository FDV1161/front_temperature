export default function (instance){
    return {
        getRooms(payload){
            return instance.get('rooms/', payload)
        },
        getRoom(payload){
            return instance.get('rooms/' + payload)
        },
    }
}