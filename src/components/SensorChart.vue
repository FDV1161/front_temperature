<template>
  <v-row>     
    <v-col>                      
      <div><v-btn  @click="test_click">click</v-btn></div>
      <canvas ref="canvas" class="canvas"></canvas>                     
    </v-col>            
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
    chartdata: {
      labels: ['2021-02-01 16:16:49.420848', '2021-02-01 16:16:49.421186', '2021-02-01 16:16:49.421194', '2021-02-01 16:16:49.421198', '2021-02-01 16:16:49.421202', '2021-02-01 16:16:49.421207', '2021-02-01 16:16:49.421211', '2021-02-01 16:16:49.421215', '2021-02-01 16:16:49.421219', '2021-02-01 16:16:49.421224', '2021-02-01 16:16:49.421228', '2021-02-01 16:16:49.421232', '2021-02-01 16:16:49.421236', '2021-02-01 16:16:49.421240', '2021-02-01 16:16:49.421243', '2021-02-01 16:16:49.421247', '2021-02-01 16:16:49.421251', '2021-02-01 16:16:49.421255', '2021-02-01 16:16:49.421259', '2021-02-01 16:16:49.421263'],
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
      ],
    },
    options: {
      legend: {
        position: "bottom",
        align: "end",
      },
      xAxes: [
        {
          type: 'time',
        }
      ],
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
  methods: {
    test_click: (event) => {
     const chart = this._chart;     
     console.log(chart.data.labels);
     chart.update();
    }
  },
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