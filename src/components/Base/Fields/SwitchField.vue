<template>
  <v-row>
    <v-col cols="8" class="d-flex align-center">
      <span>{{label}}</span>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="4" class="d-flex justify-end">
      <v-switch
          :input-value="value"
          @change="(v) => $emit('change', v)"
          :class="{ required: required }"
          :rules="rules"
          v-bind="$attrs"
      ></v-switch>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SwitchField",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: [Number, Boolean],
    label: String,
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    rules() {
      return [
        ...(this.required === true
            ? [(value) => !!value || "Обязательное поле"]
            : []),
      ];
    },
  },
}
</script>

<style>
.required label::before {
  content: "* ";
  color: red;
}
</style>