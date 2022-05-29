<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <div class="name">
          <v-btn tile text class="text-capitalize" @click="onTitleClick">
            {{ title }}
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
            @click="deviceFunctionDialogOpen(deviceFunction)"
            v-for="deviceFunction in deviceFunctions"
            :key="deviceFunction.id"
          />
        </div>
      </v-col>
    </v-row>
    <DeviceFunctionDetail
      :dialog="deviceFunctionDialog"
      :deviceFunction="deviceFunctionSelected"
      @close="deviceFunctionDialogClose"
      v-if="deviceFunctionDialog"
    />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import DeviceFunctionDetail from "@/page/DeviceFunctionDetail.vue";
import DeviceValueCard from "@/components/Home/DeviceValueCard.vue";

export default {
  props: ["item", "title", "deviceFunctions"],

  components: {
    DeviceValueCard,
    DeviceFunctionDetail,
  },

  computed: {
    ...mapGetters({
      soketValue: "soketio/getCurValue",
    }),
  },

  data: () => ({
    deviceFunctionDialog: false,
    deviceFunctionSelected: null,
  }),

  methods: {
    getDeviceValue(deviceFunction) {
      const sdf = this.soketValue(deviceFunction.id);
      if (sdf && sdf.cur_val) {
        return sdf.cur_val;
      }
      return deviceFunction.curVal;
    },
    getUpdateTime(deviceFunction) {
      const sdf = this.soketValue(deviceFunction.id);
      if (sdf && sdf.updated_at) {
        return sdf.updated_at;
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
    onTitleClick() {
      this.$emit("onTitleClick", this.item);
    },
    redirectToDetail() {
      return this.$router.push({
        name: "room-details",
        params: { id: this.room.id },
      });
    },
    deviceFunctionDialogClose() {
      this.deviceFunctionDialog = false;
    },
    deviceFunctionDialogOpen(deviceFunction) {
      this.deviceFunctionSelected = deviceFunction;
      this.deviceFunctionDialog = true;
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
