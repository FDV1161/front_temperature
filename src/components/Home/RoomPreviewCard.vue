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
      <v-col class="indent">
        <div class="devices">
          <DeviceValueCard
            :deviceValue="getDeviceValue(deviceFunction)"
            :measureSymbol="deviceFunction.func.measureSymbol"
            :functionName="deviceFunction.func.name"
            :updateTime="getUpdateTime(deviceFunction)"
            :isSwitch="isSwitchFunction(deviceFunction.func)"
            @click="$router.push({ name: 'deviceFunction', params: { id: deviceFunction.id } })"
            v-for="deviceFunction in deviceFunctions"
            :key="deviceFunction.id"
          />
        </div>
      </v-col>
    </v-row>    
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import DeviceValueCard from "./DeviceValueCard.vue";
import DeviceFunctionModal from "@/components/DeviceFunction/Modal.vue";

export default {
  props: ["room"],

  components: {
    DeviceValueCard,
    DeviceFunctionModal,
  },

  data: () => ({
    dialog: false,
    selectDeviceFunction: null,
  }),

  computed: {
    ...mapGetters({
      soketValues: "soketio/getCurValues",
      soketValue: "soketio/getCurValue",
    }),

    deviceFunctions() {
      var deviceFunctions = [];
      this.room.devices.forEach((device) => {
        device.deviceFunctions.forEach((deviceFunction) => {
          deviceFunctions.push(deviceFunction);
        });
      });
      return deviceFunctions;
    },
  },

  methods: {
    openDeviceFunctionModal(deviceFunction) {
      this.selectDeviceFunction = deviceFunction;
      this.dialog = true;
    },
    getDeviceValue(deviceFunction) {
      const sdf = this.soketValue(deviceFunction.id);
      if (sdf && sdf.cur_val) {
        return sdf.cur_val;
      }
      return deviceFunction.curVal;
    },
    getUpdateTime(deviceFunction) {
      const sdf = this.soketValue(deviceFunction.id);
      if (sdf && sdf.updatedAt) {
        return sdf.updatedAt;
      }
      return deviceFunction.updatedAt;
    },
    isSwitchFunction(func) {
      return func.minValue == 0 && func.maxValue === 1;
    },
    functionName(func) {
      if (func) {        
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
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.indent {
  margin-top: -12px;
}
.devices {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
.name {
  margin-left: -16px;
}
.name > .v-btn.v-size--default {
  font-size: inherit !important;
}
</style>
