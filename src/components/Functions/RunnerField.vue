<template>
  <v-row>
    <v-col v-if="!isSwitch" class="">
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
//   <!-- <v-col class="d-flex flex-column justify-center">
//             <v-subheader class="subtitle-1">{{ deviceFunction.func.name }}</v-subheader>
//         </v-col>
//         <v-col class="d-flex justify-end">
//             <v-switch class="mx-10"></v-switch>
//         </v-col>     -->

//   <v-row>
//     <v-col class="d-flex flex-column justify-center">
//       <v-subheader>{{ deviceFunction.func.name }}</v-subheader>

//       <div class="px-10 d-flex align-center">
//         <v-subheader class="subheader">{{ value }}</v-subheader>
//         <v-slider
//           thumb-label="always"
//           v-model="value"
//           ticks
//           max="100"
//           min="-100"
//         ></v-slider>
//       </div>
//     </v-col>
//     <v-col class="d-flex justify-end">
//       <v-switch class="mx-10"></v-switch>
//     </v-col>
//   </v-row>

export default {
  props: ["deviceFunction"],
  computed: {
    isSwitch() {
      return (
        this.deviceFunction.func.minValue == 0 &&
        this.deviceFunction.func.maxValue == 1
      );
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