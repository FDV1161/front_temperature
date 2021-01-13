<template>
    <div>    
        <canvas ref="canvas"></canvas>
    </div>    
</template>



<script>
import { Line } from 'vue-chartjs'

let one_data = [-25, 44, -53, -91, -30, -56, -70, 79, -35, 52, -48, -52, -81, 75, -2, 36, 59, -57, 27, 21];
let timerId = setInterval(() => one_data.push( Math.random() * (100 + 100) - 100), 1000);
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 20000);
// [-25, 44, -53, -91, -30, -56, -70, 79, -35, 52, -48, -52, -81, 75, -2, 36, 59, -57, 27, 21]                              

export default {
  extends: Line,
  data: () => ({
    chartdata: {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      datasets: [
        {
          label: 'Data One',
          fill: false,
          borderWidth: 2, 
          backgroundColor: '#f87979',
          borderColor: "black",          
          data: one_data 
        },
        {
            label: 'Data One',
            fill: false,
            borderWidth: 2, 
            backgroundColor: '#f87979',
            borderColor: "blue",
            data: [35, 4, -82, 26, -19, 81, -22, -5, 51, -6, 96, -66, 44, 79, 31, -25, -95, -32, 98, -54]
        }
      ]
    },
    options: {
      
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}


</script>