<template>
  <v-container fluid v-if="!getLoading">
    <Title :name="deviceFunction.func.name" />
    <Breadcrumbs :items="breadcrumbsItems" />
    <v-row>
      <v-col>
        <v-tabs v-model="tab" class="my-5 custom-tabs">
          <v-tab key="main">Основное</v-tab>
          <v-tab key="chart"> Графики</v-tab>
          <v-tab key="data">Данные</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-tabs-items v-model="tab">
      <v-tab-item key="main">
        {{ deviceFunction }}
      </v-tab-item>
      <v-tab-item key="chart" class="mt-5">
        <v-row>
          <v-col cols="12" sm="4" class="d-flex justify-space-between">
            <div class="d-flex">
              <v-btn
                :loading="chartDownloadLoader"
                tile
                @click="chartDownloadFlag = !chartDownloadFlag"
                >скачать</v-btn
              >
              <v-select
                :items="chartGroupTypes"
                menu-props="auto"
                label="Групировать по"
                v-model="chartGroupTypeSelected"
                class="custom-select ml-3"
              ></v-select>
            </div>
            <v-btn icon @click="clearChartData">
              <v-icon>mdi-autorenew</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4"
            ><TimePicker v-model="chartDateFrom" label="с"
          /></v-col>
          <v-col cols="12" sm="4"
            ><TimePicker v-model="chartDateTo" label="по"
          /></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-progress-circular
              v-if="chartDataLoading"
              indeterminate
              color="primary"
              class="custom-progress-circular"
            ></v-progress-circular>
            <Chart
              style="height: 300px"
              :chartData="chartDataValues"
              :groupBy="chartGroupTypeSelected"
              :downloadChart="chartDownloadFlag"
              :viewPoint="chartViewPoint"
              @onDownload="downloadChart"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-end">
            <v-switch
              v-model="chartViewPoint"
              label="Отображать точки"
            ></v-switch>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item key="data" class="mt-5">
        <v-row>
          <v-col cols="12" sm="4" class="d-flex justify-space-between">
            <v-btn :loading="downloadFileLoader" tile @click="downloadFile"
              >выгрузить</v-btn
            >
            <v-btn icon @click="clearData">
              <v-icon>mdi-autorenew</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4"
            ><TimePicker v-model="dateFrom" label="с"
          /></v-col>
          <v-col cols="12" sm="4"
            ><TimePicker v-model="dateTo" label="по"
          /></v-col>
        </v-row>
        <v-row>
          <v-col>
            <PaginageTable
              :headers="headers"
              :loadFunction="loadTableDataFunction"
              :rerender="rerender"
              dense
              mobile-breakpoint="0"
              class="values-table"
            >
              <template v-slot:no-data>
                <div>Нет данных</div>
              </template>
              <template v-slot:item.updatedAt="{ item }">
                {{ formatDate(item.updatedAt) }}
              </template>
            </PaginageTable>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import moment from "moment";
import Title from "@/components/Base/Title.vue";
import Breadcrumbs from "@/components/Base/Breadcrumbs.vue";
import PaginageTable from "@/components/Base/PaginateTable.vue";
import TimePicker from "@/components/Base/Fields/TimePicker.vue";
import Chart from "@/components/DeviceFunction/Chart.js";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    PaginageTable,
    Breadcrumbs,
    TimePicker,
    Title,
    Chart,
  },

  data() {
    return {
      chartGroupTypes: ["дням", "месяцам", "годам"],
      chartGroupTypeSelected: "дням",
      chartDataLoading: false,
      chartData: [],
      chartDateFrom: null,
      chartDateTo: null,
      chartDownloadFlag: false,
      chartDownloadLoader: false,
      chartViewPoint: true,
      tab: null,
      dateFrom: null,
      dateTo: null,
      rerender: false,
      room: {},
      device: {},
      deviceFunction: {},
      downloadFileLoader: false,
      headers: [
        {
          text: "Дата",
          align: "center",
          sortable: false,
          value: "updatedAt",
        },
        {
          text: "Значение",
          align: "center",
          sortable: false,
          value: "value",
        },
      ],
    };
  },

  watch: {
    dateFrom() {
      this.rerender = !this.rerender;
    },
    dateTo() {
      this.rerender = !this.rerender;
    },
    chartDateFrom() {
      this.loadChartData();
    },
    chartDateTo() {
      this.loadChartData();
    },
  },

  async created() {
    this.setLoading(true);
    this.deviceFunction = (
      await this.$api.deviceFunctions.get(this.$route.params.id)
    ).data;
    this.device = (await this.$api.devices.get(this.deviceFunction.id)).data;
    this.room = (await this.$api.rooms.getRoom(this.device.roomId)).data;
    this.setLoading(false);
    this.loadChartData();
  },

  computed: {
    ...mapGetters({
      getLoading: "loader/getLoading",
    }),
    breadcrumbsItems() {
      return [
        {
          text: "Главная",
          disabled: false,
          to: { name: "home" },
          exact: true,
        },
        {
          text: this.room.name,
          disabled: false,
          to: { name: "room-details", params: { id: this.room.id } },
          exact: true,
        },
        {
          text: this.device.name,
          disabled: true,
        },
        {
          text: this.deviceFunction.func.name,
          disabled: true,
        },
      ];
    },
    chartDataValues() {
      return {
        labels: this.chartData.map((e) => e.updatedAt),
        datasets: [
          {
            data: this.chartData.map((e) => e.value),
          },
        ],
      };
    },
  },

  methods: {
    ...mapActions({
      setLoading: "loader/setLoading",
    }),
    async loadTableDataFunction(sortBy, sortDesc, page, itemsPerPage) {
      var response = await this.$api.journalReadings.getAll({
        deviceFuncId: this.deviceFunction.id,
        paginatePage: page,
        paginationCount: itemsPerPage,
        updatedAtFrom: this.dateFrom ? moment(this.dateFrom).valueOf() : null,
        updatedAtTo: this.dateTo ? moment(this.dateTo).valueOf() : null,
      });
      return [response.data.values, response.data.rowCount];
    },
    loadChartData() {
      this.chartDataLoading = true;
      this.$api.journalReadings
        .getAll({
          deviceFuncId: this.deviceFunction.id,
          updatedAtFrom: this.chartDateFrom
            ? moment(this.chartDateFrom).valueOf()
            : new Date().valueOf(),
          updatedAtTo: this.chartDateTo
            ? moment(this.chartDateTo).valueOf()
            : null,
        })
        .then((response) => {
          this.chartData = response.data.values;
          this.chartDataLoading = false;
        });
    },
    formatDate(date) {
      return moment(date).format("DD.MM.YYYY hh:mm");
    },
    downloadFile() {
      this.downloadFileLoader = true;
      this.$api.journalReadings
        .exportCSV({
          deviceFuncId: this.deviceFunction.id,
          updatedAtFrom: this.dateFrom ? moment(this.dateFrom).valueOf() : null,
          updatedAtTo: this.dateTo ? moment(this.dateTo).valueOf() : null,
        })
        .then((response) => {
          this.downloadFileLoader = false;
          const blob = new Blob([response.data]);
          this.blobToFile(URL.createObjectURL(blob), "export.csv");
        });
    },
    clearData() {
      this.dateFrom = new Date().valueOf();
      this.dateTo = null;
      this.rerender = !this.rerender;
    },
    clearChartData() {
      this.chartDateFrom = null;
      this.chartDateTo = null;
      this.chartViewPoint = true;
      this.loadChartData();
    },
    downloadChart(chart) {
      this.chartDownloadLoader = true;
      var content = chart.toBase64Image();
      this.blobToFile(content, "export.png");
      this.chartDownloadLoader = false;
    },
    blobToFile(content, fileName) {
      const link = document.createElement("a");
      link.href = content;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(link.href);
      link.remove();
    },
  },
};
</script>

<style>
.custom-progress-circular {
  height: 32px;
  width: 32px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  margin-top: 113px;
}
.custom-select.v-input {
  padding-top: 0;
}
.custom-tabs .v-slide-group__prev.v-slide-group__prev--disabled {
  display: none !important;
}
</style>
