<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="800"
  >
    <v-card>
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
      <v-card-text v-if="deviceFunction">
        <v-container>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <span class="mr-1">Обновлено:</span>
              <span>{{ updatedAt }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-col class="d-flex justify-end">
                <!-- <div class="select">
                  <v-select
                    :items="items"
                    hide-details
                    hide-spin-buttons
                    height="20"
                  ></v-select>
                </div> -->
              </v-col>
              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="4"> </v-col>
              </v-row>
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col class="d-flex justify-center my-5 py-5">
              Допустим тут график
            </v-col>
          </v-row> -->

          <!-- <v-row>
            <v-col>
              <v-sparkline
                :fill="false"
                :line-width="1"
                :smooth="0"
                :value="chartValues"
                auto-draw
              >
                <template v-slot:label="item"> {{ item.value }} </template>
              </v-sparkline>
            </v-col>
          </v-row> -->
          <v-row class="my-3">
            <v-col class="d-flex justify-space-between align-center">
              <span class="font-weight-bold">Текущее значение</span>
              <span class="mr-3 text-h5 font-weight-bold">
                {{ deviceFunction.curVal }} 20
                {{ deviceFunction.func.measureSymbol }}
              </span>
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col>
              <v-row>
                <v-col>
                  <v-span class="font-weight-bold">Статистика</v-span>
                </v-col>
              </v-row>[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]
              <v-row>
                <v-col>
                  <div class="d-flex justify-space-between">
                    <span>Минимальное значение</span>
                    <span> 300 {{ deviceFunction.func.measureSymbol }} </span>
                  </div>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <div class="d-flex justify-space-between">
                    <span>Среднее значение</span>
                    <span> 300 {{ deviceFunction.func.measureSymbol }} </span>
                  </div>
                </v-col>
              </v-row>
              <v-row >
                <v-col cols="12">                  
                  <div class="d-flex justify-space-between">
                    <span>Максимальное значение</span>
                    <span> 300 {{ deviceFunction.func.measureSymbol }} </span>
                  </div>                  
                </v-col>
              </v-row>
            </v-col>
          </v-row> -->

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
                  <span> 300 {{ deviceFunction.func.measureSymbol }} </span>
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="d-flex justify-space-between">
                  <span>Среднее значение</span>
                  <span> 300 {{ deviceFunction.func.measureSymbol }} </span>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="d-flex justify-space-between">
                  <span>Максимальное значение</span>
                  <span> 300 {{ deviceFunction.func.measureSymbol }} </span>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-row>
            <v-col class="font-weight-bold"> История показаний </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-data-table
                dense
                :headers="headers"
                :items="tableData"
                :items-per-page="10"
                mobile-breakpoint="0"
                class="values-table"
              >
                <template v-slot:no-data>
                  <div>Нет данных</div>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              {{ deviceFunction }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              {{ chartData }}
            </v-col>
          </v-row>          
          <v-row v-if="chartData">
            <v-col cols=12>
              {{chartDataValues}}
            </v-col>
            <v-col>
              <LineChart :data="chartDataValues" />
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

export default {
  props: {
    dialog: Boolean,
    deviceFunction: null,
    
  },

  components: {
    LineChart,
  },

  data: () => ({
    headers: ["Дата", "Значение"],
    tableData: [],
    chartData: null,
  }),

  watch: {
    dialog: function (val) {
      if (val) {
        this.$api.journalReadings
          .getAll({
            deviceFuncId: this.deviceFunction.id,
            paginatePage: 1,
            paginationCount: 120,
          })
          .then((response) => {
            this.chartData = response.data.values;
            this.tableData = response.data.values;
          });
      }
    },
  },

  computed: {
    title() {
      return this.deviceFunction
        ? this.deviceFunction.func.name
        : "Выбрана не существующая функция";
    },
    updatedAt() {
      return moment(this.deviceFunction.updatedAt).format("DD.MM.YYYY hh:mm");
    },
    chartDataValues() {
      return {
        labels: this.chartData.map((e) => e.updatedAt ),
        datasets: [
          {
            label: "qwe",
            data: this.chartData.map((e) => e.value),
          },
        ],
      };
      // return this.chartData.map(e => e.value)
    },
  },
};
</script>

<style>
.select {
  width: 200px;
}
.values-table table thead th span {
  font-size: 14px !important;
}
.values-table table tbody tr td {
  /* font-size: 14px !important; */
  color: rgba(0, 0, 0, 0.6);
}
</style>