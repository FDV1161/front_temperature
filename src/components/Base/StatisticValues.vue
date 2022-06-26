<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <div class="d-flex justify-space-between">
          <span>Минимальное значение</span>
          <v-progress-circular
            v-if="maxLoading"
            indeterminate
            color="primary"
            :size="20"
          ></v-progress-circular>
          <span v-else-if="isNotSet(minValue)">
            <v-icon size="16">mdi-help</v-icon>
          </span>
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
            v-if="avgLoading"
            indeterminate
            color="primary"
            :size="20"
          ></v-progress-circular>
          <span v-else-if="isNotSet(avgValue)">
            <v-icon size="16">mdi-help</v-icon>
          </span>
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
            v-if="maxLoading"
            indeterminate
            color="primary"
            :size="20"
          ></v-progress-circular>
          <span v-else-if="isNotSet(maxValue)">
            <v-icon size="16">mdi-help</v-icon>
          </span>
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
  props: [
    "measureSymbol",
    "maxValue",
    "minValue",
    "avgValue",
    "maxLoading",
    "minLoading",
    "avgLoading",
  ],
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
