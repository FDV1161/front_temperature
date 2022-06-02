import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData"],
  mounted() {
    this.renderChart(this.chartData, {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      maintainAspectRatio: false,
      repsonsive: true,
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              unit: "second",
              displayFormats: {
                minute: "HH:mm",
                second: "HH:mm:ss",
              },
              tooltipFormat: "DD.MM.YYYY hh:mm:ss",
            },
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    });
  },
};
