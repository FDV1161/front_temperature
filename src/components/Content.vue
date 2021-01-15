<template>
<!-- // #f7f0f0 -->
  <v-container fluid class="main-color">    
        <MyChart />        
        <!-- <MyChart />         -->
        <!-- <MyChart />         -->
  </v-container>
</template>

<script>
import MyChart from "@/components/chart.vue";
export default {
    components: {
        MyChart,
  },
};
</script>


<style>
/* .main-color {
    background-color: #fafafa;
    
} */
</style>