<template>
  <v-container class="px-0" fluid v-show="writeableDevices.length > 0">
    <div v-for="device in writeableDevices" :key="device.id">
      <v-subheader class="px-0">
        <span class="title capitalize-first">{{ trim(device.name) }}</span>
      </v-subheader>
      <RunnerField
        v-for="df in device.deviceFunctions"
        :key="df.id"
        :deviceFunction="df"
        v-if="df.writeEnable"
        class="mx-2"
      />
    </div>
  </v-container>
</template>

<script>
import RunnerField from "@/components/Functions/RunnerField";
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
    },
  },

  methods: {
    trim(value) {
      return value.trim();
    },
  },
};
</script>

<style scoped>
.capitalize-first::first-letter {
  text-transform: capitalize;
}
.title {
  font-weight: 500;
  font-size: 16px !important;
  color: #000000de;
}
</style>
