export default function (instance) {
    return {
        getAll(payload) {
            return instance.get(`journal_readings/?deviceFuncId=${payload.deviceFuncId}&paginatePage=${payload.paginatePage}&paginationCount=${payload.paginationCount}`)
        },
    }
}