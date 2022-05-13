import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["data"],
  data: () => ({
    options: {
      scales: {
        xAxes: [
          {
            type: "time",
            // bounds: "ticks",
            // distribution: "series",
            time: {              
              min: "2022-03-31T00:00:00",
              max: "2022-03-31T24:00:00",
              unit: "minute",
              stepSize: 60,
              minUnit: "minute",
              displayFormats: {
                minute: 'HH:mm'
              }
              
            },
          },
        ],
      },
    },
  }),
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
