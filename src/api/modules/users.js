export default function (instance) {
    return {        
        getList(payload){
            return instance.get('users')
        },
        get(payload) {
            return instance.get('users/' + payload)
        },
        create(payload) {
            return instance.post('users', payload)
        },
        delete(payload) {
            return instance.delete('users/' + payload)
        },    
        update(payload) {
            return instance.put('users/' + payload.id, payload)
        },    

    }
}