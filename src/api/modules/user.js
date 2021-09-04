export default function (instance) {
    return {
        login(payload){
            return instance.post('/login', payload)
        },        
    }
}