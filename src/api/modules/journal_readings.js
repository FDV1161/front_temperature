export default function (instance) {
    return {
        getAll(payload) {           
            return instance.get('journal_readings', {params: payload})

            // return instance.get(`journal_readings/?deviceFuncId=${payload.deviceFuncId}&paginatePage=${payload.paginatePage}&paginationCount=${payload.paginationCount}`)
        },
        exportCSV(payload) {
            return instance.get(`journal_readings/export_csv/?deviceFuncId=${payload.deviceFuncId}`)
        },
    }
}