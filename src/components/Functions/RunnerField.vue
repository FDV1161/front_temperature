<template>
  <v-row>
    <v-col v-if="!isSwitch">
      <v-slider
          ticks
          class="mx-4"
          thumb-label="always"
          :value="deviceFunction.curVal"
          :label="deviceFunction.func.name"
          :max="deviceFunction.func.maxValue"
          :min="deviceFunction.func.minValue"
          :readonly="loading"
          :loading="loading"
          @end="run"
      ></v-slider>
    </v-col>
    <v-col v-else class="d-flex justify-space-between align-center">
      <v-subheader class="d-flex align-start">
        <span class="subtitle-1 subheader">{{ deviceFunction.func.name }}</span>
      </v-subheader>
      <v-switch
          class="mt-0 mx-4"
          :value="deviceFunction.curVal"
          :readonly="loading"
          :loading="loading"
          @change="run"
      ></v-switch>
    </v-col>
  </v-row>
</template>


<script>
import {console_print_error} from "../../utils";
import {mapActions} from "vuex";

export default {
  props: ["deviceFunction"],

  computed: {
    isSwitch() {
      return this.deviceFunction.func.minValue === 0 && this.deviceFunction.func.maxValue === 1;
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      pushNotifications: "notifications/push_notifications",
    }),
    run(value) {
      if (!this.loading) {
        this.loading = true
        this.$api.deviceFunctions.run({
          id: this.deviceFunction.id,
          value: value,
        }).catch((error) => {
          this.pushNotifications({
            type: "error",
            message: "Не запустить функцию",
          });
          console_print_error(error);
        }).finally(() => {
          this.loading = false;
        })
      }
    }
  }
};
</script>


<style scoped>
.subheader {
  height: 24px;
  margin-bottom: 8px;
}
.subheader::first-letter {
  text-transform: capitalize;
}
</style>