<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="sensorsDataTable"
      :search="search"
      hide-default-footer
    >
      <template v-slot:no-data>
        <div>Список датчиков пуст</div>
      </template>
    </v-data-table>
  </div>
</template>



<script>
import { headers } from "@/components/Rooms/Details/Data.js";

export default {
  props: ["sensors", "dialog"],
  data: () => ({
    search: "",
    headers: headers,
  }),
  computed: {
    sensorsDataTable() {
      return this.sensors.map((s) => ({
        name: s.name,
        address: s.address,
        measure: this.getMeasureName(s),
      }));
    },
  },
  methods: {
    getMeasureName(sensor) {
      if (sensor.measure != null) {
        return `${sensor.measure.name} (${sensor.measure.symbol})`;
      }
      return "";
    },
    clickAdd() {
      this.$emit("clickAdd");
    },
  },
};
</script>

<style scoped>
.table-link {
  color: black;
  text-decoration: none;
}
</style>