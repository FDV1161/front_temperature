<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="devices"
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
import { headers } from "@/components/Rooms/Details/Data.js";

export default {
  props: ["devices", "dialog"],
  data: () => ({
    search: "",
    headers: headers,
  }),

  methods: {
    deleteClick(item) {
      this.$emit("deleteClick", item);
    },
    editClick(item) {
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