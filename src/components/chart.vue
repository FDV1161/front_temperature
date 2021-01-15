<template>
  <v-row>
    <v-container>
      <!-- <v-row class="ml-10">Title</v-row> -->
      <v-row >
        <v-col cols="12" >
          <v-row class="pl-9 ma-0"><v-col class="pa-0">Title</v-col></v-row>
          <v-row class="ma-0">
            <v-col cols="11" class="pa-0">
              <canvas ref="canvas" class="canvas"></canvas>
            </v-col>
            <v-col>
              <v-card rounded="0" color="blue" class="max-wh"> ds </v-card>
            </v-col>
          </v-row>          
          
        </v-col>
        
      </v-row>
    </v-container>
  </v-row>
</template>



<script>
import { Line } from "vue-chartjs";
import List from "@/components/list.vue";

let one_data = [
  -25,
  44,
  -53,
  -91,
  -30,
  -56,
  -70,
  79,
  -35,
  52,
  -48,
  -52,
  -81,
  75,
  -2,
  36,
  59,
  -57,
  27,
  21,
];
// let timerId = setInterval(() => one_data.push( Math.random() * (100 + 100) - 100), 1000);
// setTimeout(() => { clearInterval(timerId); alert('stop'); }, 20000);
// [-25, 44, -53, -91, -30, -56, -70, 79, -35, 52, -48, -52, -81, 75, -2, 36, 59, -57, 27, 21]

export default {
  extends: Line,

  components: {
    List,
  },

  data: () => ({
    menu: [
      {
        icon: "mdi-delete",
        text: "Delete",
      },
      {
        icon: "mdi-cog",
        text: "Settings",
      },
    ],
    chartdata: {
      labels: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
      ],
      datasets: [
        {
          label: "Data One",
          fill: false,
          borderWidth: 2,
          backgroundColor: "#f87979",
          borderColor: "black",
          data: one_data,
          cubicInterpolationMode: "default",
        },
        {
          label: "Data One",
          fill: false,
          borderWidth: 2,
          backgroundColor: "#f87979",
          borderColor: "blue",
          data: [
            35,
            4,
            82,
            26,
            19,
            81,
            22,
            5,
            51,
            6,
            96,
            66,
            44,
            79,
            31,
            25,
            95,
            32,
            98,
            54,
          ],
        },
      ],
    },
    options: {
      legend: {
        position: "bottom",
        align: "end",
      },
      title: {
        display: false,
        position: "top",
        text: "Custom Chart Title",
      },
      tooltips: {
        intersect: false,
      },
    },
  }),

  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>


<style scoped>
.max-wh {
  width: 100%;
  height: 100%;
}
.max-width {
  width: 100%;
}
.canvas {
  max-height: 400px;
}
</style>