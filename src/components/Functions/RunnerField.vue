<template>
  <div>
    <div v-if="!isSwitch">
      <v-slider
        ticks
        thumb-label="always"
        class="pt-5 custom-slider"
        :value="deviceFunction.curVal"
        :max="deviceFunction.func.maxValue"
        :min="deviceFunction.func.minValue"
        :readonly="loading"
        :loading="loading"
        @end="run"
      ></v-slider>
    </div>
    <div v-else class="d-flex justify-space-between align-center">
      <span class="subheader">выкл/вкл</span>
      <v-switch
        class="custom-switch mt-0"
        :value="deviceFunction.curVal"
        :readonly="loading"
        :loading="loading"
        @change="run"
      ></v-switch>
    </div>
  </div>
</template>

<script>
import { console_print_error } from "../../utils";
import { mapActions } from "vuex";

export default {
  props: ["deviceFunction"],

  computed: {
    isSwitch() {
      return (
        this.deviceFunction.func.minValue === 0 &&
        this.deviceFunction.func.maxValue === 1
      );
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
        this.loading = true;
        this.$api.deviceFunctions
          .run({
            id: this.deviceFunction.id,
            value: value,
          })
          .catch((error) => {
            this.pushNotifications({
              type: "error",
              message: "Не запустить функцию",
            });
            console_print_error(error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style scoped>
.subheader {
  font-size: 14px;
}
.subheader::first-letter {
  text-transform: capitalize;
}
</style>
