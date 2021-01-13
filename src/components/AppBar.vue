<template>
  <v-app-bar app :color="color" clipped-left>
    <v-toolbar flat :color="color">
      <v-toolbar-title>
        <span>Title</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text> 
            <v-icon left>mdi-chart-bell-curve-cumulative</v-icon>
            <span class="text-capitalize"> Chart </span>            
        </v-btn>
        <v-btn text class="text-capitalize"> NotChart </v-btn>
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