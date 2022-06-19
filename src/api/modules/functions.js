export default function (instance) {
    return {
        getAll() {
            return instance.get('function/')
        },
        get(payload) {
            return instance.get('function/' + payload)
        },
        create(payload) {
            return instance.post('function/', payload)
        },
        delete(payload) {
            return instance.delete('function/' + payload)
        },    
        update(payload) {
            return instance.put('function/' + payload.id, payload)
        },    
    }
}