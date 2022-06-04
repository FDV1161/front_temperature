<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="d-flex justify-space-between">
          <span>Минимальное значение</span>
          <v-progress-circular
            v-if="isNotSet(minValue)"
            indeterminate
            color="primary"
            :size="20"
          ></v-progress-circular>
          <span v-else>
            {{ minValue }}
            {{ measureSymbol }}
          </span>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <div class="d-flex justify-space-between">
          <span>Среднее значение</span>
          <v-progress-circular
            v-if="isNotSet(avgValue)"
            indeterminate
            color="primary"
            :size="20"
          ></v-progress-circular>
          <span v-else>
            {{ avgValue }}
            {{ measureSymbol }}
          </span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between">
          <span>Максимальное значение</span>

          <v-progress-circular
            v-if="isNotSet(maxValue)"
            indeterminate
            color="primary"
            :size="20"
          ></v-progress-circular>
          <span v-else>
            {{ maxValue }}
            {{ measureSymbol }}
          </span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["measureSymbol", "maxValue", "minValue", "avgValue"],
  methods: {
    isNotSet(value) {
      if (value || value === 0) {
        return false;
      }
      return true;
    },
  },
};
</script>
