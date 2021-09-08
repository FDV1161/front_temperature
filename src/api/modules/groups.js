export default function (instance) {
    return {        
        getList(payload){
            return instance.get('group')
        },       
    }
}