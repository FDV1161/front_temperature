<template>
  <v-container fluid v-if="!getLoading">
    <Title :name="deviceFunction.func.name" />
    <Breadcrumbs :items="breadcrumbsItems" />

    <v-row class="mt-4">
      <v-col class="updated-date d-flex justify-end align-center mr-3">
        <span class="mr-1">Обновлено:</span>
        <span>{{ updatedAt() }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-space-between align-center">
        <span class="font-weight-bold">Текущее значение</span>
        <span class="mr-3 text-h5 font-weight-bold">
          {{ currentValue() }}
          {{ deviceFunction.func.measureSymbol }}
        </span>
      </v-col>
    </v-row>

    <StatisticValues
      class="mt-1 mb-4"
      :avgValue="dynamicChartAvgCurrentValue()"
      :minValue="dynamicChartMinCurrentValue()"
      :maxValue="dynamicChartMaxCurrentValue()"
      :measureSymbol="deviceFunction.func.measureSymbol"
    />

    <v-row v-if="dynamicChartDataValues">
      <v-col>
        <LineChart style="height: 200px" :chartData="dynamicChartDataValues" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-tabs v-model="tab" class="custom-tabs">
          <v-tab key="chart">Графики</v-tab>
          <v-tab key="data">Данные</v-tab>
          <v-tab
            v-if="
              deviceFunction.writeEnable &&
                [EDITOR, ADMIN].includes(user.group.id)
            "
            key="management"
            >Управление</v-tab
          >
        </v-tabs>
      </v-col>
    </v-row>

    <v-tabs-items v-model="tab">
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
            <StatisticValues
              class="mt-0"
              :avgValue="chartAvgCurrentValue"
              :minValue="chartMinCurrentValue"
              :maxValue="chartMaxCurrentValue"
              :measureSymbol="deviceFunction.func.measureSymbol"
            />
          </v-col>
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
            <StatisticValues
              :avgValue="tableAvgCurrentValue"
              :minValue="tableMinCurrentValue"
              :maxValue="tableMaxCurrentValue"
              :measureSymbol="deviceFunction.func.measureSymbol"
            />
          </v-col>
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
      <v-tab-item key="management" class="mt-5">
        <v-row>
          <v-col>
            <RunnerField :deviceFunction="deviceFunction" />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { ADMIN, EDITOR } from "@/settings.js";
import moment from "moment";
import Title from "@/components/Base/Title.vue";
import Breadcrumbs from "@/components/Base/Breadcrumbs.vue";
import PaginageTable from "@/components/Base/PaginateTable.vue";
import TimePicker from "@/components/Base/Fields/TimePicker.vue";
import Chart from "@/components/DeviceFunction/Chart.js";
import { mapActions, mapGetters } from "vuex";
import LineChart from "@/components/Home/Chart.js";
import StatisticValues from "@/components/Base/StatisticValues.vue";
import RunnerField from "@/components/Functions/RunnerField.vue";

import {
  calcMaxValue,
  calcMinValue,
  calcAvgValue,
  toFixedNumber,
} from "@/utils/index.js";

export default {
  components: {
    PaginageTable,
    Breadcrumbs,
    TimePicker,
    Title,
    Chart,
    LineChart,
    StatisticValues,
    RunnerField,
  },

  data() {
    return {
      ADMIN: ADMIN,
      EDITOR: EDITOR,
      chartGroupTypes: ["дням", "месяцам", "годам"],
      chartGroupTypeSelected: "дням",
      chartDataLoading: false,
      chartData: [],
      chartDateFrom: null,
      chartDateTo: null,
      chartDownloadFlag: false,
      chartDownloadLoader: false,
      chartViewPoint: true,
      dynamicChartData: [],
      chartMaxCurrentValue: null,
      chartMinCurrentValue: null,
      chartAvgCurrentValue: null,
      tableMaxCurrentValue: null,
      tableMinCurrentValue: null,
      tableAvgCurrentValue: null,
      tab: null,
      dateFrom: null,
      dateTo: null,
      rerender: false,
      room: {},
      device: {},
      deviceFunction: {},
      downloadFileLoader: false,
      tableDataValues: [],
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

  mounted() {
    this.sockets.subscribe("message", (device_function) => {
      if (device_function.id == this.deviceFunction.id) {
        this.dynamicChartData.push({
          id: null,
          value: device_function.cur_val,
          deviceFuncId: device_function.id,
          updatedAt: device_function.updated_at,
        });
      }
    });
  },

  destroyed() {
    this.sockets.unsubscribe("message");
  },

  async created() {
    this.setLoading(true);
    this.deviceFunction = (
      await this.$api.deviceFunctions.get(this.$route.params.id)
    ).data;
    this.device = (
      await this.$api.devices.get(this.deviceFunction.idDevice)
    ).data;
    this.room = (await this.$api.rooms.getRoom(this.device.roomId)).data;
    this.setLoading(false);
    this.loadChartData();
  },

  computed: {
    ...mapGetters({
      getLoading: "loader/getLoading",
      getCurValues: "soketio/getCurValues",
      soketValue: "soketio/getCurValue",
      user: "user/getUser",
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
    dynamicChartDataValues() {
      return {
        labels: this.dynamicChartData.map((e) => e.updatedAt),
        datasets: [
          {
            data: this.dynamicChartData.map((e) => e.value),
          },
        ],
      };
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
      this.tableDataValues = response.data.values;
      this.tableMaxCurrentValue = toFixedNumber(response.data.maxValue);
      this.tableMinCurrentValue = toFixedNumber(response.data.minValue);
      this.tableAvgCurrentValue = toFixedNumber(response.data.avgValue);
      return [response.data.values, response.data.rowCount];
    },
    dynamicChartMaxCurrentValue() {
      return calcMaxValue(this.dynamicChartData.map((v) => v.value));
    },
    dynamicChartMinCurrentValue() {
      return calcMinValue(this.dynamicChartData.map((v) => v.value));
    },
    dynamicChartAvgCurrentValue() {
      return calcAvgValue(this.dynamicChartData.map((v) => v.value));
    },
    updatedAt() {
      var updatedAtValue = this.deviceFunction.updatedAt;
      const soketValue = this.soketValue(this.deviceFunction.id);
      if (soketValue && soketValue.cur_val) {
        updatedAtValue = soketValue.updated_at;
      }
      return moment(updatedAtValue).format("DD.MM.YYYY hh:mm");
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
          this.chartMaxCurrentValue = toFixedNumber(response.data.maxValue);
          this.chartMinCurrentValue = toFixedNumber(response.data.minValue);
          this.chartAvgCurrentValue = toFixedNumber(response.data.avgValue);
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
    currentValue() {
      const soketValue = this.soketValue(this.deviceFunction.id);
      if (soketValue && soketValue.cur_val) {
        return soketValue.cur_val;
      }
      return this.deviceFunction.curVal;
    },
  },
};
</script>

<style>
.updated-date {
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
}
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
.custom-select .v-text-field__details {
  display: none;
}
.custom-tabs .v-slide-group__prev.v-slide-group__prev--disabled {
  display: none !important;
}
</style>
