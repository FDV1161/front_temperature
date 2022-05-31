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
      <v-tab-item key="chart">
        Графики
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
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    PaginageTable,
    Breadcrumbs,
    TimePicker,
    Title,
  },

  data() {
    return {
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
  },

  async created() {
    this.setLoading(true);
    this.deviceFunction = (
      await this.$api.deviceFunctions.get(this.$route.params.id)
    ).data;
    this.device = (await this.$api.devices.get(this.deviceFunction.id)).data;
    this.room = (await this.$api.rooms.getRoom(this.device.roomId)).data;
    this.setLoading(false);
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
    formatDate(date) {
      return moment(date).format("DD.MM.YYYY hh:mm");
    },
    downloadFile() {
      this.downloadFileLoader = true;

      this.$api.journalReadings
        .exportCSV({
          deviceFuncId: this.deviceFunction.id,
          updatedAtFrom: this.dateFrom
            ? moment(this.dateFrom).toISOString()
            : null,
          updatedAtTo: this.dateTo ? moment(this.dateTo).toISOString() : null,
        })
        .then((response) => {
          this.downloadFileLoader = false;
          const blob = new Blob([response.data]);
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "export.csv";
          link.click();
          URL.revokeObjectURL(link.href);
        });
    },
    clearData() {
      this.dateFrom = null;
      this.dateTo = null;
      this.rerender = !this.rerender;
    },
  },
};
</script>

<style>
.custom-tabs .v-slide-group__prev.v-slide-group__prev--disabled {
  display: none !important;
}
</style>
