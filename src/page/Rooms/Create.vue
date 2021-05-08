<template>
  <v-form v-model="valid">
    <div v-if="pageIsLoad"></div>
    <v-container fluid v-else>
      <v-row>
        <v-col>
          <v-text-field
            v-model:value="name"
            :rules="[(v) => !!v || 'Обязательное поле']"
            required
          >
            <template #label>
              <span class="red--text"><strong>* </strong></span>Название
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Описание"
            v-model:value="description"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" class="d-flex align-center">
          <span>Показывать на главном экране</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" class="d-flex justify-end">
          <v-switch v-model="onHome"></v-switch>
        </v-col>
      </v-row>
      <v-expand-transition>
        <v-row v-show="onHome" class="pt-0">
          <v-col>
            <v-select
              :items="listSensorsName"
              menu-props="auto"
              label="Датчик"
              item-value="key"
              item-text="name"
              v-model="onHomeSensor1"
              clearable
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              :items="listSensorsName"
              menu-props="auto"
              label="Датчик"
              item-value="key"
              item-text="name"
              v-model="onHomeSensor2"
              clearable
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              :items="listSensorsName"
              menu-props="auto"
              label="Датчик"
              item-value="key"
              item-text="name"
              v-model="onHomeSensor3"
              clearable
            ></v-select>
          </v-col>
        </v-row>
      </v-expand-transition>
      <v-row>
        <v-col class="d-flex align-center field-hader">
          <span>Список датчиков</span>
          <v-spacer></v-spacer>
          <v-btn icon tile min-height="48" min-width="48" @click="sensorsClickAdd">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TableSensors :sensors="[]" @clickAdd="sensorsClickAdd" />
          <CreateSensor :dialog="sensorDialog" @close="closeSensorDialog" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn color="primary" class="mr-2" @click="$router.go(-1)">
            Отмена
          </v-btn>
          <v-btn color="primary" v-on:click="createRoom" :disabled="!valid">
            Сохранить
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import api from "@/api/index";
import TableSensors from "@/components/Rooms/Details/Table.vue";
import CreateSensor from "@/components/Sensors/Create.vue";

export default {
  components: {
    TableSensors,
    CreateSensor,
  },
  data() {
    return {
      sensorDialog: false,
      valid: false,
      sensors: null,

      name: null,
      description: null,
      onHome: false,
      onHomeSensor1: null,
      onHomeSensor2: null,
      onHomeSensor3: null,
    };
  },
  mounted() {
    this.loadSensors();
  },
  computed: {
    listSensorsName() {
      return this.sensors.map((s) => ({
        key: s.id,
        name: s.name,
      }));
    },
    pageIsLoad() {
      return !this.sensors;
    },
  },
  methods: {
    sensorsClickAdd() {
      this.sensorDialog = true;
    },
    closeSensorDialog() {
      this.sensorDialog = false;
    },
    getOnHomeSensors: function () {
      return [
        this.onHomeSensor1,
        this.onHomeSensor2,
        this.onHomeSensor3,
      ].filter((v) => v !== null);
    },
    loadSensors: function () {
      api.rooms.getSensors().then((responce) => {
        this.sensors = responce.data;
      });
    },
    createRoom: function () {
      var payload = {
        name: this.name,
        description: this.description,
        on_home: this.onHome,
        sensor_list: this.getOnHomeSensors(),
      };
      api.rooms.createRoom(payload).then((responce) => {
        console.log(responce);
      });
    },
  },
};
</script>

<style scoped>
.field-hader {
  height: 90px;
}
</style>