<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="journalList"
      :items-per-page="15"
      mobile-breakpoint="0"
    >
       <!-- <template v-slot:item.value="{ item }">
        {{ item.value }} 
        <span>({{ measure.symbol }})</span>
      </template> -->
      <template v-slot:item.updatedAt="{ item }">
        {{ dateFormat(item) }}
      </template>
      <template v-slot:no-data>
        <div>Данных нет</div>
      </template>
    </v-data-table>
  </div>
</template>



<script>
import { headers } from "./data.js";
import moment from "moment";

export default {
  props: {
    journalList: {
      default: [],
    },
    measure: {
      id: null,
      name: "",
      symbol: "",
    },
  },
  data: () => ({
    headers: headers,
  }),
  computed: {},
  methods: {
    dateFormat(value) {
      return moment(value).format("MM.DD.YYYY hh:mm");
    },
  },
};
</script>

