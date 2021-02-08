<template>
  <v-conteiner class="sensors">
    <v-row class="px-10 pt-5">
      <v-col color="green">
        <div>
          <!-- <h2></h2> -->
          <div text class="d-flex">
            <v-icon left>mdi-thermometer-lines</v-icon>
            <span class="text-capitalize"> <h2>Sensor: First_sensor</h2> </span>
          </div>

          <v-breadcrumbs :items="breadcrumbs" class="pa-0"> </v-breadcrumbs>
        </div>
      </v-col>
    </v-row>
    
    <v-row class="px-2">
      <v-col><hr /></v-col>
    </v-row>
    

    <v-row class="pa-5">
      <v-col>
        
        <div class="chart">
          <MainContent :chart_data="chart_data" />
        </div>
        
      </v-col>      
    </v-row>
    <v-row class="pa-5">
      <v-col>
          <v-data-table
          :headers="headers"
          :items="chart_data"
          :items-per-page="All"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>



  </v-conteiner>
  <!-- <v-avatar color="grey lighten-2" size="80" </v-avatar> -->
</template>

<script>
import MainContent from "@/components/SensorChart.vue";
export default {
  components: {
    MainContent,
  },

  data: () => ({
    breadcrumbs: [
      {
        text: "Main",
        disabled: false,
        href: "/",
      },
      {
        text: "Sensors",
        disabled: true,
        href: "Sensors",
      },
    ],
    headers: [
      {
        text: "Date",
        align: "start",
        sortable: false,
        value: "date",
      },
      { text: "Value", value: "value" },
    ],
    chart_data: [
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 159,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 237,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 262,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 305,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 356,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 375,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 392,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 408,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 452,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 518,
      },
    ],
  }),
};
</script>

<style scoped>
.my_color {
  /* background: green; */
}

.chart {
  height: 300px;
}
</style>