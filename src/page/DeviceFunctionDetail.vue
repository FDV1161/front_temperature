<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="800"
  >
    <v-card v-if="dialog">
      <v-toolbar light dense color="secondary">
        <v-toolbar-items>
          <v-btn icon @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-title> {{ title }} </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text v-if="deviceFunction" class="px-0 px-sm-6">
        <v-container>
          <v-row>
            <v-col
              order="2"
              order-sm="1"
              cols="12"
              sm="8"
              class="d-flex justify-start align-center"
            >
              <span class="mr-1">Обновлено:</span>
              <span>{{ updatedAt() }}</span>
            </v-col>
            <v-col
              order="1"
              order-sm="2"
              cols="12"
              sm="4"
              class="d-flex justify-end"
            >
              <v-btn
                text
                small
                depressed
                color="blue"
                @click="
                  $router.push({ name: 'room-details', params: { id: 1 } })
                "
              >
                подробнее
                <v-icon small>mdi-arrow-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="chartData">
            <v-col>
              <LineChart style="height: 300px" :chartData="chartDataValues" />
            </v-col>
          </v-row>
          <v-row class="mt-3" v-if="deviceFunction.writeEnable">
            <v-col>
              <span class="font-weight-bold">Управление</span>
            </v-col>
            <v-col cols="12">
              <RunnerField :deviceFunction="deviceFunction" />
            </v-col>
          </v-row>
          <v-row class="my-3">
            <v-col class="d-flex justify-space-between align-center">
              <span class="font-weight-bold">Текущее значение</span>
              <span class="mr-3 text-h5 font-weight-bold">
                {{ currentValue() }}
                {{ deviceFunction.func.measureSymbol }}
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span class="font-weight-bold">Статистика</span>
            </v-col>
          </v-row>
          <v-container>
            <v-row>
              <v-col>
                <div class="d-flex justify-space-between">
                  <span>Минимальное значение</span>
                  <span>
                    {{ minCurrentValue() }}
                    {{ deviceFunction.func.measureSymbol }}
                  </span>
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="d-flex justify-space-between">
                  <span>Среднее значение</span>
                  <span>
                    {{ avgCurrentValue() }}
                    {{ deviceFunction.func.measureSymbol }}
                  </span>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="d-flex justify-space-between">
                  <span>Максимальное значение</span>
                  <span>
                    {{ maxCurrentValue() }}
                    {{ deviceFunction.func.measureSymbol }}
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-row>
            <v-col class="font-weight-bold"> История показаний </v-col>
          </v-row>
          <v-row>
            <v-col>
              <PaginageTable
                :headers="headers"
                :loadFunction="loadTableData"
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
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
import LineChart from "@/components/Home/Chart.js";
import PaginageTable from "@/components/Base/PaginateTable.vue";
import RunnerField from "@/components/Functions/RunnerField.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    dialog: Boolean,
    deviceFunction: null,
  },

  components: {
    LineChart,
    PaginageTable,
    RunnerField,
  },

  data: () => ({
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
    chartData: [],
    chartDataLoading: false,
    testValues: [],
  }),

  mounted() {
    this.sockets.subscribe("message", (device_function) => {
      if (device_function.id == this.deviceFunction.id) {
        this.chartData.push({
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

  computed: {
    ...mapGetters({
      getCurValues: "soketio/getCurValues",
      soketValue: "soketio/getCurValue",
    }),

    title() {
      return this.deviceFunction
        ? this.deviceFunction.func.name
        : "Выбрана не существующая функция";
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
    maxCurrentValue() {
      if (!this.chartData.length) {
        return "";
      }
      return Math.max(...this.chartData.map((v) => v.value)).toFixed(2);
    },
    minCurrentValue() {
      if (!this.chartData.length) {
        return "";
      }
      return Math.min(...this.chartData.map((v) => v.value)).toFixed(2);
    },
    avgCurrentValue() {
      if (!this.chartData.length) {
        return "";
      }
      return (
        this.chartData.reduce((a, b, index) => {
          if (index == 1) {
            return a.value + b.value;
          }
          return a + b.value;
        }) / this.chartData.length
      ).toFixed(2);
    },
    updatedAt() {
      var updatedAtValue = this.deviceFunction.updatedAt;
      const soketValue = this.soketValue(this.deviceFunction.id);
      if (soketValue && soketValue.cur_val) {
        updatedAtValue = soketValue.updated_at;
      }
      return moment(updatedAtValue).format("DD.MM.YYYY hh:mm");
    },
    currentValue() {
      const soketValue = this.soketValue(this.deviceFunction.id);
      if (soketValue && soketValue.cur_val) {
        return soketValue.cur_val;
      }
      return this.deviceFunction.curVal;
    },
    formatDate(date) {
      return moment(date).format("MM.DD.YYYY hh:mm");
    },
    // loadChartData() {
    //   this.$api.journalReadings
    //     .getAll({
    //       deviceFuncId: this.deviceFunction.id,
    //       updatedAtFrom: new Date().toISOString(),
    //     })
    //     .then((response) => {
    //       this.chartData = response.data.values;
    //     });
    // },
    async loadTableData(sortBy, sortDesc, page, itemsPerPage) {
      var response = await this.$api.journalReadings.getAll({
        deviceFuncId: this.deviceFunction.id,
        paginatePage: page,
        paginationCount: itemsPerPage,
      });
      return [response.data.values, response.data.rowCount];
    },
  },
};
</script>

<style>
.values-table table thead th span {
  font-size: 14px !important;
}
.values-table table tbody tr td {
  /* font-size: 14px !important; */
  color: rgba(0, 0, 0, 0.6);
}
.detail-url {
  color: blue;
}
.detail-url:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
