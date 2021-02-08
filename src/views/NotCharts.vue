<template>
  <v-conteiner class="NotCharts">
    <v-row class="pa-5">
      <v-col class="col-xl-4 col-lg-5 col-md-6 col-sm-12 col-xs-12 col-12">
      <SensorBlock 
        title="Sensor one"
        description="Listen to your favorite artists and albums whenever and wherever,
            online and offline."
        value="2128"
      />
      </v-col>
      <v-col class="col-xl-4 col-lg-5 col-md-6 col-sm-12 col-xs-12 col-12">
      <SensorBlock 
        title="Sensor one"
        description=""
        value="2128"
      />
      </v-col>
      <v-col class="col-xl-4 col-lg-5 col-md-6 col-sm-12 col-xs-12 col-12">
      <SensorBlock 
        title="Sensor one"
        description="Listen to your favorite artists and albums whenever and wherever,
            online and offline.Listen to your favorite artists and albums whenever and wherever,
            online and offline.Listen to your favorite artists and albums whenever and wherever,
            online and offline.Listen to your favorite artists and albums whenever and wherever,
            online and offline." 
        value="2128"
      />
      </v-col>
    </v-row>
  </v-conteiner>
</template>

<script>
import SensorBlock from "@/components/SensorBlock.vue";
export default {
  components: {
    SensorBlock,
  },
};
</script>

<style scoped>
.description_height {
  height: 44px;
}
</style>