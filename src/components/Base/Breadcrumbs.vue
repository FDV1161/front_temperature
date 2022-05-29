<template>
  <v-row class="relative">
    <v-col class="indent">
      <v-breadcrumbs class="breadcrumbs" :items="items" divider=">"></v-breadcrumbs>
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
  background-color: #eeeeee;
  border-radius: 5px 5px 5px 5px;
  padding: 5px 3px 3px 5px;
}
</style>