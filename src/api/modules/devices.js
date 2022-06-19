export default function (instance) {
    return {
        getAll() {
            return instance.get('device/')
        },
        get(payload){
            return instance.get('device/'+ payload)
        },
        create(payload) {
            return instance.post('device/', payload)
        },
        delete(payload) {
            return instance.delete('device/' + payload)
        },
        update(payload) {
            return instance.put('device/' + payload.id, payload)
        },
        upload_file(file) {
            var formData = new FormData();
            formData.append("file", file);
            return instance.post('device/upload_file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        // upload_file(device_id, file) {
        //     var formData = new FormData();
        //     formData.append("file", file);
        //     return instance.post('device/'+ device_id + '/upload_file', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     })
        // },
        // delete_file(device_id){
        //     var formData = new FormData();
        //     formData.append("file", null);
        //     return instance.post('device/'+ device_id + '/upload_file', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     })
        // }
    }
}