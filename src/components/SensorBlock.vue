<template>
  <v-card class="block_height pa-3 my_color"  elevation="17">
    <v-card-title class="headline"> {{ title }} </v-card-title>
    <v-card-subtitle class="description ">
      {{ description }}
    </v-card-subtitle>
    <v-card-text class="display-2 text-center pa-0">
      <v-badge color="">
        {{ value }}
        <template v-slot:badge> &deg;C </template>
      </v-badge>
    </v-card-text>
    <v-card-actions class="pt-5">
      <v-btn text> Details </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["title", "description", "value"],
};
</script>


<style scoped>

.description {
  /* overflow: hidden; */
  /* height: 100px;
  text-overflow: ellipsis;
  overflow-wrap: break-word; */
  /* hyphens: auto; */
  height: 45px;
  margin-bottom: 15px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  

  
}

.my_color {
  background-color: #fafafa;
  /* background: rgb(29,52,96);
  background: radial-gradient(circle, rgba(29,52,96,1) 0%, rgba(52,95,173,1) 0%, rgba(29,52,96,1) 100%); */
  
}

.max_height {
  height: 100%;
}

.color1 {
  background-color: green;
}

.color2 {
  background-color: blue;
}
</style>