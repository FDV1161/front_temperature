<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex align-center field-header">
        <span>Текущие показания</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
            :headers="headers"
            :items="getData"
            hide-default-footer
            mobile-breakpoint="0"
        >
          <template v-slot:item.name="{ item }">
            <router-link :to="{ name: 'devices', params: { id: item.id } }" class="table-link">
              {{ item.name }}
            </router-link>
          </template>
          <template v-slot:no-data>
            <div>Список устройств пуст</div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import {headers} from "./data";
import moment from "moment";

export default {
  props: ["devices"],
  data: () => ({
    headers: headers,
  }),

  computed: {
    getData() {
      let new_devices = [];
      for (let device of this.devices) {
        for (let df of device.deviceFunctions) {
          let new_device = {
            id: device.id,
            name: device.name,
            value: df.curVal,
            measure: this.getMeasureName(df),
            updatedAt: this.formatDate(df.updatedAt),
          }
          new_devices.push(new_device);
        }
      }
      return new_devices;
    }
  },

  methods: {
    getMeasureName(df) {
      let measureName = "";
      if (df.func.measureName) {
        measureName += df.func.measureName;
      }
      if (df.func.measureSymbol) {
        measureName += " (" + df.func.measureSymbol + ")";
      }
      return measureName;
    },
    formatDate(date) {
      return moment(date).format("MM.DD.YYYY hh:mm");
    }
  },
};
</script>


<style scoped>
.table-link {
  color: black;
  text-decoration: none;
}
</style>