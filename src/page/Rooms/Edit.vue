<template>
  <v-form v-model="valid">
    <v-container fluid>
      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn class="mr-2" @click="$router.go(-1)"> Отмена </v-btn>
          <v-btn color="primary" v-on:click="updateRoom" :disabled="!valid">
            Сохранить
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="room.name"
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
            v-model="room.description"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" class="d-flex align-center">
          <span>Показывать на главном экране</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" class="d-flex justify-end">
          <v-switch v-model="room.onHome"></v-switch>
        </v-col>
      </v-row>
      <v-expand-transition>
        <v-row v-show="room.onHome" class="pt-0">
          <v-col>
            <v-select
              :items="room.sensorList"
              menu-props="auto"
              label="Датчик"
              item-value="id"
              item-text="name"
              v-model="room.sensorOneId"
              clearable
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              :items="room.sensorList"
              menu-props="auto"
              label="Датчик"
              item-value="id"
              item-text="name"
              v-model="room.sensorTwoId"
              clearable
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              :items="room.sensorList"
              menu-props="auto"
              label="Датчик"
              item-value="id"
              item-text="name"
              v-model="room.sensorFreeId"
              clearable
            ></v-select>
          </v-col>
        </v-row>
      </v-expand-transition>
      <v-row>
        <v-col class="d-flex align-center field-hader">
          <span>Список датчиков</span>
          <v-spacer></v-spacer>
          <v-btn
            icon
            tile
            min-height="48"
            min-width="48"
            @click="openSensorDialog"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TableSensors
            :sensors="room.sensorList"
            @deleteClick="openDeleteSensorDialog"
            @editClick="editSensor"
          />
          <CreateSensor
            :dialog="dialogs.createSensor"
            @close="closeSensorDialog"
            @save="sensorDialogSave"
          />
          <DeleteDialog
            :dialog="dialogs.deleteSensor"
            :name="activeSensorName"
            @close="closeDeleteSensorDialog"
            @ok="deleteSensor"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import api from "@/api/index";
import TableSensors from "@/components/Rooms/Details/Table.vue";
import CreateSensor from "@/components/Sensors/Create.vue";
import DeleteDialog from "@/components/Base/DeleteDialog.vue";

export default {
  components: {
    TableSensors,
    CreateSensor,
    DeleteDialog,
  },
  data() {
    return {
      dialogs: {
        createSensor: false,
        deleteSensor: false,
      },
      valid: false,
      room: {
        name: "",
        description: "",
        onHome: "",
        sensorOneId: null,
        sensorTwoId: null,
        sensorFreeId: null,
        sensorList: [],
      },
      activeSensor: null,
    };
  },
  mounted() {
    this.loadRoom();
  },
  computed: {
    activeSensorName() {
      if (this.activeSensor) {
        return this.activeSensor.name;
      }
      return "";
    },
  },
  methods: {
    loadRoom() {
      api.rooms.getRoom(this.$route.params.id).then((responce) => {
        this.room = responce.data;
      });
    },
    sensorDialogSave(sensor) {
      this.room.sensorList.push(sensor);
      this.closeSensorDialog();
    },
    openSensorDialog() {
      this.dialogs.createSensor = true;
    },
    closeSensorDialog() {
      this.dialogs.createSensor = false;
    },
    openDeleteSensorDialog(item) {
      this.activeSensor = item;
      this.dialogs.deleteSensor = true;
    },
    closeDeleteSensorDialog() {
      this.activeSensor = null;
      this.dialogs.deleteSensor = false;
    },
    updateRoom() {
      api.rooms.updateRoom(this.room).then((responce) => {
        console.log(responce);
        alert("Аудитория обновлена");
      });
    },
    deleteSensor() {
      api.rooms
        .deleteSensor(this.activeSensor.id)
        .then((responce) => {
          const index = this.room.sensorList.findIndex(
            (s) => s.id == this.activeSensor.id
          );
          this.room.sensorList.splice(index, 1);
          this.activeSensor = null;
          this.closeDeleteSensorDialog();
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response) {
            alert(error.response.data);
          } else if (error.request) {
            alert(error.request);
          } else {
            alert("Error", error.message);
          }
        });
    },
    editSensor() {},
  },
};
</script>

<style scoped>
.field-hader {
  height: 90px;
}
</style>