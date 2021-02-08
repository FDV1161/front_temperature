<template>
                     
      
      <canvas ref="canvas" class="canvas"></canvas>                     
  
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

export default {
  props: ["chart_data"],  
  extends: Line,
  

  components: {
    List,
  },

  data: () => ({    
    // chartdata: {
      // labels: this.chart_data.map(e => e.date),  //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      // datasets: [
      //   {
      //     label: "Data One",
      //     fill: false,
      //     borderWidth: 2,
      //     backgroundColor: "#f87979",
      //     borderColor: "black",
      //     data: this.chart_data.map(e => e.value), //one_data,          
      //   },        
      // ],
    // },
    options: {
      maintainAspectRatio: false,
      defaultFontSize: 20,
      legend: {
        position: "right",
        align: "start",
      }      
    },
  }),
  // computed:{
  //   commitChartOptions(){
  //     let localOptions = Object.assign({}, this.options)
  //     console.log(this.chart_data.map(e => e.date));
  //     label = this.chart_data.map(e => e.date);
  //     data = this.chart_data.map(e => e.value);
  //     // localOptions.datasets[0]
      
  //     return localOptions;
  //   }
  // },

  computed: {
    chart_date(){
      return this.chart_data.map(e => e.date);
    },
    chart_value(){
      return this.chart_data.map(e => e.value);
    }
  },

  mounted() {
    // this.chartdata.labels = this.chart_data.map(e => e.date)
    // this.chartdata.datasets[0].data = this.chart_data.map(e => e.value)
    // let label = this.chart_data.filter(e => e.date); //.map(e => e.date);
    // let data = this.chart_data.filter(e => e.value); //.map(e => e.value);
   
    console.log(this.chart_date);
    
    let chartdata = {
        labels: this.chart_date,
        datasets: [
        {
          label: "Data One",
          fill: false,
          borderWidth: 2,
          backgroundColor: "#f87979",
          borderColor: "black",
          data: this.chart_value
        },        
      ],
      };
      console.log(chartdata);

    this.renderChart(chartdata, this.options);
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