<template>
  <v-app-bar app :color="color" clipped-left>
    <v-toolbar flat :color="color">
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text> Chart </v-btn>
        <v-btn text> NotChart </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-app-bar>
</template>


<script>
export default {
  props: ["color"],
};
</script>


<style scoped>
</style>