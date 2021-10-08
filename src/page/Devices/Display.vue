<template>
  <v-container fluid>
    <v-row>
      <v-col class="px-0">
        <v-toolbar flat>
          <v-toolbar-title>Просмотр устройства</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" text tile @click="$router.go(-1)"> Назад</v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <input-field v-model="device.name" label="Название" readonly />
    <input-field v-model="device.description" label="Описание" readonly />

    <v-data-table
      :headers="headers"
      :items="journalReadings"
      :options.sync="options"
      :server-items-length="rowCount"
      :loading="loading"
      :items-per-page="10"
      :footer-props="{ 'items-per-page-options': [10, 20, 50, 100] }"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat d-flex align-center>
          <v-toolbar-title class="subtitle-1 font-weight-regular mb-3">
            История показаний
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <div>
            <v-select
              :items="device.deviceFunctions"
              menu-props="auto"
              label="Функции"
              item-value="id"
              item-text="func.name"
              v-on:change="selectDeviceFunction"
              :value="selectedDeviceFunction"
              clearable
            ></v-select>
          </div>
          <v-btn class="mb-3" text tile @click="downloadFile">
            Экспорт
            <v-icon right> mdi-cloud-upload </v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.updatedAt="{ item }">
        {{ dateFormat(item.updatedAt) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import InputField from "../../components/Base/Fields/InputField.vue";
import moment from "moment";

export default {
  components: {
    InputField,
  },

  data() {
    return {
      device: {
        roomId: null,
        name: "",
        description: "",
        address: null,
        controllerId: null,
        deviceFunctions: [],
      },
      options: {},
      journalReadings: [],
      selectedDeviceFunction: null,
      rowCount: 0,
      loading: false,
      headers: [
        { text: "Дата", value: "updatedAt" },
        { text: "Показания", value: "value" },
      ],
    };
  },

  watch: {
    options: {
      handler() {
        this.loadDeviceFunctionValues();
      },
      deep: true,
    },
  },

  created() {
    this.$api.devices.get(this.$route.params.id).then((response) => {
      this.device = response.data;
      if (this.device.deviceFunctions) {
        this.selectDeviceFunction(this.device.deviceFunctions[0].id);
      }
    });
  },

  computed: {},

  methods: {
    selectDeviceFunction(selectedDeviceFunction) {
      this.selectedDeviceFunction = selectedDeviceFunction;
      this.loadDeviceFunctionValues();
    },

    loadDeviceFunctionValues() {
      if (!this.selectedDeviceFunction) {
        return;
      }
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      this.$api.journalReadings
        .getAll({
          deviceFuncId: this.selectedDeviceFunction,
          paginatePage: page,
          paginationCount: itemsPerPage,
        })
        .then((response) => {
          this.journalReadings = response.data.values;
          this.rowCount = response.data.rowCount;
          this.loading = false;
        });
    },

    dateFormat(date) {
      return moment(date).format("MM.DD.YYYY hh:mm");
    },

    downloadFile() {
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      this.$api.journalReadings
        .exportCSV({
          deviceFuncId: this.selectedDeviceFunction,
          paginatePage: page,
          paginationCount: itemsPerPage,
        })
        .then((response) => {
          const blob = new Blob([response.data]);
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = 'export.csv';
          link.click();
          URL.revokeObjectURL(link.href);
        });
    },
  },
};
</script>

<style scoped>
.field-header {
  height: 90px;
}
</style>

