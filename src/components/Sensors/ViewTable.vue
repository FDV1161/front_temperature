<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="sensorsDataTable"
      :search="search"
      hide-default-footer
      mobile-breakpoint="0"
    >
      <template v-slot:item.actions="{ item }">
        <div class="d-flex">
          <v-btn icon small>
            <v-icon small @click="editClick(item)"> mdi-pencil </v-icon>
          </v-btn>
          <v-btn icon small @click="deleteClick(item)">
            <v-icon small> mdi-delete </v-icon>
          </v-btn>
        </div>
      </template>

      <template v-slot:no-data>
        <div>Список датчиков пуст</div>
      </template>
    </v-data-table>
  </div>
</template>



<script>
import { headers } from "@/components/Sensors/data.js";

export default {
  props: ["sensors"],
  data: () => ({
    search: "",
    headers: headers,
  }),
  computed: {
    sensorsDataTable() {
      return this.sensors.map((s) => ({
        id: s.id,
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
    deleteClick(item) {
      this.$emit("deleteClick", item);
    },
    editClick() {
      this.$emit("editClick", item);
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