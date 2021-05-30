<template>
  <v-row>
    <v-col>
      <v-text-field
        :value="value"
        :label="label"
        @input="(v) => $emit('input', v)"
        :class="{ required: required }"
        :rules="rules"
        v-bind="$attrs"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      
    },
    label: String,
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    rules() {
      return [
        ...(this.required == true
          ? [(value) => !!value || "Обязательное поле"]
          : []),
      ];
    },
  },
};
</script>

<style>
.required label::before {
  content: "* ";
  color: red;
}
</style>
