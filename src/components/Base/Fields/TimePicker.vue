<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        class="custom-text-field"
        readonly
        v-model="dateFormatted"
        :label="label"
        persistent-hint
        prepend-icon="mdi-calendar"
        v-bind="attrs"
        @blur="date = parseDate(dateFormatted)"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      :value="date"
      @change="(v) => $emit('change', v)"
      no-title
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  model: {
    prop: "date",
    event: "change",
  },
  props: {
    label: { type: String },
    date: { type: String },
  },
  data: () => ({
    menu: false,
  }),

  computed: {
    dateFormatted() {
      return this.formatDate(this.date);
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>

<style>
.custom-text-field {
  padding-top: 0;
  margin-top: 0;
}
.custom-text-field .v-text-field__details {
  display: none;
}
</style>
