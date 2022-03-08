<template>
  <v-progress-linear
    indeterminate
    color="primary"
    height="5"
    v-if="getLoading"
  ></v-progress-linear>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getLoading: "loader/getLoading",
    }),
  },
};
</script>
