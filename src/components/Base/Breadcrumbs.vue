<template>
  <v-row class="relative">
    <v-col>
      <v-breadcrumbs class="ml-2" :items="items" divider=">"></v-breadcrumbs>
    </v-col>
  </v-row>
</template>


<script>
export default {
  props: ["items"],
};
</script>

<style scoped>
.relative {
  position: relative;
}
.v-breadcrumbs {
  padding: 0px;
}
</style>