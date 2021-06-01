<template>
  <v-form v-model="valid">
    <v-container fluid>
      <v-row>
        <v-col class="px-0">
          <v-toolbar flat>
            <v-toolbar-title>Редактирование аудитории</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="mr-2" text tile @click="$router.go(-1)">
              Назад
            </v-btn>
            <v-btn
              color="primary"
              tile
              v-on:click="updateRoom"
              :disabled="!valid"
            >
              <v-icon left> mdi-content-save </v-icon>
              Сохранить
            </v-btn>
          </v-toolbar>
        </v-col>
      </v-row>

      <input-field v-model="room.name" label="Название" required />
      <input-field v-model="room.description" label="Описание" />

      <v-row>
        <v-col class="d-flex align-center field-hader">
          <span>Список датчиков</span>
          <v-spacer></v-spacer>
          <v-btn
            icon
            tile
            min-height="48"
            min-width="48"
            @click="openDeviceDialog"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <table-devices
            :devices="room.devices"
            @deleteClick="openDeleteDeviceDialog"
            @editClick="openEditDeviceDialog"
          />
        </v-col>
      </v-row>
    </v-container>
    <create-device
      :dialog="dialogs.createDevice"
      @close="closeDeviceDialog"
      @save="sensorDialogSave"
    />
    <edit-device
      :dialog="dialogs.editDevice"
      :device="activeDevice"
      @close="closeEditDeviceDialog"
      @save="saveEditDeviceDialog"
    />
    <delete-dialog
      :dialog="dialogs.deleteDevice"
      :name="activeDevice.name"
      @close="closeDeleteSensorDialog"
      @ok="deleteDevice"
    />
  </v-form>
</template>

<script>
import TableDevices from "@/components/Rooms/Details/Table.vue";
import CreateDevice from "@/components/Devices/Create.vue";
import EditDevice from "@/components/Devices/Edit.vue";
import DeleteDialog from "@/components/Base/DeleteDialog.vue";
import { console_print_error } from "@/utils/index";
import InputField from "@/components/Base/Fields/InputField.vue";
import { mapActions } from "vuex";

export default {
  components: {
    TableDevices,
    CreateDevice,
    DeleteDialog,
    InputField,
    EditDevice,
  },

  data() {
    return {
      dialogs: {
        createDevice: false,
        deleteDevice: false,
        editDevice: false,
      },
      valid: false,
      room: {
        name: "",
        description: "",
        onHome: "",
        devices: [],
      },
      // activeDevice: null,

      activeDevice: {
        name: "",
        description: "",
        roomId: null,
        address: null,
        controllerId: null,
        deviceFunctions: [],
      },
    };
  },

  created() {
    this.$api.rooms.getRoom(this.$route.params.id).then((responce) => {
      this.room = responce.data;
      console.log(this.room);
    });    
  },

  methods: {
    ...mapActions({
      pushNotifications: "notifications/push_notifications",
    }),
    sensorDialogSave(sensor) {
      this.room.devices.push(sensor);
      this.closeDeviceDialog();
    },
    openDeviceDialog() {
      this.dialogs.createDevice = true;
    },
    closeDeviceDialog() {
      this.dialogs.createDevice = false;
    },
    openDeleteDeviceDialog(item) {
      this.activeDevice = { ...item };
      this.dialogs.deleteDevice = true;
    },
    openEditDeviceDialog(item) {
      this.activeDevice = { ...item };
      this.dialogs.editDevice = true;
    },
    saveEditDeviceDialog(item) {
      console.log(item);
      this.room.devices = this.room.devices.filter((device) => {
        return device.id != item.id;
      });
      this.room.devices.push(item);
      this.dialogs.editDevice = false;
      this.closeEditDeviceDialog();
    },
    closeDeleteSensorDialog() {
      // this.activeDevice = null;
      this.dialogs.deleteDevice = false;
    },
    closeEditDeviceDialog() {
      // this.activeDevice = null;
      this.dialogs.editDevice = false;
    },
    updateRoom() {
      this.$api.rooms.updateRoom(this.room).then((responce) => {
        this.pushNotifications({
          type: "success",
          message: "Аудитория обновлена",
        });
      });
    },
    deleteDevice() {
      this.$api.devices
        .delete(this.activeDevice.id)
        .then((responce) => {
          this.room.devices = this.room.devices.filter((s) => {
            return s.id != this.activeDevice.id;
          });
          this.pushNotifications({
            type: "success",
            message: "Датчик удален",
          });
          this.closeDeleteSensorDialog();
        })
        .catch((error) => {
          console_print_error(error);
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