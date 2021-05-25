<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-text-field :value="sensor.id" label="Идентификатор" readonly />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field :value="sensor.name" label="Название" readonly />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field :value="sensor.description" label="Описание" readonly />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field :value="sensor.address" label="Адрес" readonly />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="field-title">Физическая величина</div>
        <div class="d-flex mx-2">
          <v-text-field
            :value="sensor.measure.name"
            label="Название"
            readonly
          />
          <div class="pl-1 field-limited-size">
            <v-text-field
              class=""
              :value="sensor.measure.symbol"
              label="Символ"
              readonly
            />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <IndicationsTable :journalList="sensor.journalList" :measure="sensor.measure" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <!-- <MainContent :chart_data="chart_data" /> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn color="" class="mr-5" @click="$router.go(-1)"> назад </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MainContent from "@/components/SensorChart.vue";
import IndicationsTable from "@/components/Sensors/Indications/index.vue";
import api from "@/api/index";

export default {
  components: {
    MainContent,
    IndicationsTable,
  },

  data: () => ({
    sensor: {
      id: null,
      name: "",
      description: "",
      address: null,
      deviceId: null,
      onHome: false,
      roomId: null,
      journalList: [],
      measure: {
        id: null,
        name: "",
        symbol: "",
      },
    },
  }),

  mounted() {
    this.loadSensor();
  },
  methods: {
    loadSensor() {
      api.rooms.getSensor(this.$route.params.id).then((responce) => {
        this.sensor = responce.data;
      });
    },
  },
};
</script>

<style scoped>
.field-title {
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
}
.field-limited-size {
  width: 100px;
}
</style>