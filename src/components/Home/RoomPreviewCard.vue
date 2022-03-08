<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <div class="name">
          <v-btn tile text class="text-capitalize" @click="redirectToDetail">
            {{ room.name }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="devices">
          <DeviceValueCard
            :deviceValue="getDeviceValue(deviceFiunction)"
            :measureSymbol="deviceFiunction.func.measureSymbol"
            :functionName="deviceFiunction.func.name"
            :updateTime="getUpdateTime(deviceFiunction)"
            :isSwitch="isSwitchFunction(deviceFiunction.func)"
            v-for="deviceFiunction in deviceFunctions"
            :key="deviceFiunction.id"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import DeviceValueCard from "./DeviceValueCard.vue";

export default {
  props: ["room"],

  components: {
    DeviceValueCard,
  },

  computed: {
    ...mapGetters({
      soketValues: "soketio/getCurValues",
      soketValue: "soketio/getCurValue",
    }),

    deviceFunctions() {
      var deviceFiunctions = [];
      this.room.devices.forEach((device) => {
        device.deviceFunctions.forEach((deviceFiunction) => {
          deviceFiunctions.push(deviceFiunction);
        });
      });
      return deviceFiunctions;
    },
  },

  methods: {
    getDeviceValue(deviceFiunction) {
      const sdf = this.soketValue(deviceFiunction.id);
      if (sdf && sdf.cur_val) {
        return sdf.cur_val;
      }
      return deviceFiunction.curVal;
    },
    getUpdateTime(deviceFiunction) {
      const sdf = this.soketValue(deviceFiunction.id);
      if (sdf && sdf.updated_at) {
        return sdf.updated_at;
      }
      return deviceFiunction.updated_at;
    },
    isSwitchFunction(func) {
      return func.minValue == 0 && func.maxValue === 1;
    },
    functionName(func) {
      if (func) {
        console.log(func.name);
        return func.name;
      }
      return "";
    },
    redirectToDetail() {
      return this.$router.push({
        name: "room-details",
        params: { id: this.room.id },
      });
    },
  },
};
</script>

<style scoped>
.devices {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
.name > .v-btn.v-size--default {
  font-size: inherit !important;
}
</style>
