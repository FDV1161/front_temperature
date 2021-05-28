export default function (instance) {
    return {
        getAll(){
            return instance.get('controller')
        },
        create(payload) {
            return instance.post('controller', payload)
        },
    }
}