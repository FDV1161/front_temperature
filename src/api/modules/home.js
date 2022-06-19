export default function (instance) {
    return {
        getCurrentReadings() {
            return instance.get('home/current_readings/')
        },
    }
}