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
            :deviceValue="getDeviceValue(deviceFiunction)"
            :measureSymbol="deviceFiunction.func.measureSymbol"
            :functionName="deviceFiunction.func.name"
            :updateTime="getUpdateTime(deviceFiunction)"
            :isSwitch="isSwitchFunction(deviceFiunction.func)"
            @click="openDeviceFiunctionDetail(deviceFiunction)"
            v-for="deviceFiunction in deviceFunctions"
            :key="deviceFiunction.id"
          />
        </div>
      </v-col>
    </v-row>
    <DeviceFunctionDetail :dialog="dialog" :deviceFunction="selectDeviceFunction" @close="closeDialog" />
  </v-container>
</template>

<script>
import DeviceFunctionDetail from "@/page/DeviceFunctionDetail.vue";
import { mapGetters } from "vuex";
import DeviceValueCard from "./DeviceValueCard.vue";

export default {
  props: ["room"],

  components: {
    DeviceValueCard,
    DeviceFunctionDetail,
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
    openDeviceFiunctionDetail(deviceFunction) {
      this.selectDeviceFunction = deviceFunction;   
      this.dialog = true;
    },
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
    closeDialog(){
      this.dialog = false;
    }
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
