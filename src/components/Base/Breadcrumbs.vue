<template>
  <v-row class="relative">
    <v-col class="indent">
      <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
    </v-col>
  </v-row>
</template>


<script>
export default {
  props: ["items"],
};
</script>

<style scoped>
.indent {
  margin-top: -12px;
}
.relative {
  position: relative;  
}
.v-breadcrumbs {
  padding: 0px;
}
</style>