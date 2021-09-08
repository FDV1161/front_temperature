export default function (instance) {
    return {
        getToken(payload){            
            return instance.get('/token', {
                auth: payload
            })
        },
        getMe(){
            return instance.get('/get_me')
        }
    }
}