<template>
  <v-progress-linear
    indeterminate
    color="primary"
    height="5"
  ></v-progress-linear>
</template>

<script>
export default {
  props: {
    loading: Boolean,
  },
};
</script>
