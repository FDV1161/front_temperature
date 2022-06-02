import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData", "groupBy", "downloadChart", "viewPoint"],

  watch: {
    viewPoint() {
      if (this.viewPoint) {
        this.$data._chart.options.elements.point.radius = 1;
      } else {
        this.$data._chart.options.elements.point.radius = 0;
      }
      this.$data._chart.update();
    },
    groupBy() {
      const units = { дням: "day", месяцам: "month", годам: "year" };
      this.$data._chart.options.scales.xAxes[0].time.unit = this.getUnit();
      this.$data._chart.update();
    },
    downloadChart() {
      this.$emit("onDownload", this.$data._chart);
    },
  },

  methods: {
    getUnit() {
      const units = { дням: "day", месяцам: "month", годам: "year" };
      return units[this.groupBy];
    },
  },

  mounted() {
    this.renderChart(this.chartData, {
      elements: {
        point: {
          radius: 1,
        },
      },
      chartArea: {
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
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
              unit: this.getUnit(),
              displayFormats: {
                year: "YYYY",
                month: "MM",
                day: "DD.MM",
                hour: "HH:mm",
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
