<template>
  <v-container fluid v-show="writeableDevices.length > 0">
    <v-row>
      <v-col class="d-flex align-center field-header">
        <span>Запуск функций</span>
      </v-col>
    </v-row>
    <div v-for="device in writeableDevices" :key="device.id">
      <v-subheader class="subtitle-1 font-weight-black">{{ device.name }}</v-subheader>
      <runner-field v-for="df in device.deviceFunctions" :key="df.id" :deviceFunction="df" v-if="df.writeEnable" class="mx-2"/>
    </div>
  </v-container>
</template>

<script>
import RunnerField from "../../components/Functions/RunnerField";
export default {
  components: {
    RunnerField,
  },
  name: "RunnerBlock",
  props: ["room"],

  computed: {
    writeableDevices() {
      let writeableDevices = [];
      for (let device of this.room.devices) {
        for (let df of device.deviceFunctions) {
          if (df.writeEnable) {
            writeableDevices.push(device);
            break;
          }
        }
      }
      return writeableDevices;
    }
  },

}
</script>

<style scoped>

</style>