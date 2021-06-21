<template>
  <v-row>
    <v-col v-if="!isSwitch">
      <v-slider
          class="mx-4"
          thumb-label="always"
          v-model="value"
          :label="deviceFunction.func.name"
          ticks
          :max="deviceFunction.func.maxValue"
          :min="deviceFunction.func.minValue"
      ></v-slider>
    </v-col>
    <v-col v-else class="d-flex justify-space-between align-center">
      <v-subheader class="d-flex align-start">
        <span class="subtitle-1 subheader">{{ deviceFunction.func.name }}</span>
      </v-subheader>
      <v-switch class="mt-0 mx-4"></v-switch>
    </v-col>
  </v-row>
</template>


<script>
export default {
  props: ["deviceFunction"],
  computed: {
    isSwitch() {
      return this.deviceFunction.func.minValue === 0 && this.deviceFunction.func.maxValue === 1;
    },
  },
  data() {
    return {
      value: 0,
    };
  },
};
</script>


<style scoped>
.subheader {
  height: 24px;
  margin-bottom: 8px;
}
</style>