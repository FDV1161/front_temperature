<template>
  <v-container fluid v-if="!getLoading">
    <Title :name="device.name" />
    <Breadcrumbs :items="breadcrumbsItems" />

    <!-- <input-field v-model="device.name" label="Название" readonly /> -->
    <input-field v-model="device.description" label="Описание" readonly />

    <v-data-table
      :headers="headers"
      :items="journalReadings"
      :options.sync="options"
      :server-items-length="rowCount"
      :loading="valuesLoading"
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
import Breadcrumbs from "@/components/Base/Breadcrumbs.vue";
import ProgressLoading from "@/components/Base/ProgressLoading.vue";
import Title from "@/components/Base/Title.vue";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    InputField,
    Breadcrumbs,
    ProgressLoading,
    Title,
  },

  data() {
    return {
      valuesLoading: false,
      room: null,
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
    this.setLoading(true);
    this.$api.devices.get(this.$route.params.id).then((response) => {
      this.device = response.data;
      this.$api.rooms.getRoom(this.device.roomId).then((response) => {
        this.room = response.data;
        this.setLoading(false);
      });
      if (this.device.deviceFunctions) {
        this.selectDeviceFunction(this.device.deviceFunctions[0].id);
      }
    });
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
          disabled: false,
        },
      ];
    },
  },

  methods: {
    ...mapActions({
      setLoading: "loader/setLoading",
    }),
    selectDeviceFunction(selectedDeviceFunction) {
      this.selectedDeviceFunction = selectedDeviceFunction;
      this.loadDeviceFunctionValues();
    },

    loadDeviceFunctionValues() {
      if (!this.selectedDeviceFunction) {
        return;
      }
      this.valuesLoading = true;
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
          this.valuesLoading = false;
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
          link.download = "export.csv";
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

