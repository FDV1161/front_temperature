<template>
  <base-dialog
    :dialog="dialog"
    :valid="valid"
    @close="close"
    @save="save"
    title="Добавление датчика"
    saveTitle="Добавить"
  >
    <v-form ref="sensorCreateForm" v-model="valid">
      <v-container fluid>
        <v-row>
          <v-col>
            <v-text-field
              v-model="sensor.name"
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
              v-model="sensor.description"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Адрес" v-model="sensor.address"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              :items="measureList"
              menu-props="auto"
              label="Физическая величина"
              item-value="id"
              item-text="full_name"
              v-model="sensor.measureId"
              clearable
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="d-flex">
              <v-select
                :items="deviceList"
                menu-props="auto"
                label="Оборудование"
                item-value="id"
                item-text="name"
                v-model="sensor.deviceId"
                clearable
              ></v-select>
              <v-btn
                icon
                min-height="48"
                min-width="48"
                tile
                @click="deviceDialog = true"
              >
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </div>
            <create-device
              :dialog="deviceDialog"
              @close="deviceDialogClose"
              @save="deviceDialogSave"
            />
          </v-col>
        </v-row>
        <v-expand-transition>
          <v-row v-show="sensor.deviceId">
            <v-container fluid class="mx-2 elevation-1">
              <v-row>
                <v-col>
                  <v-text-field
                    label="Название"
                    :value="device.name"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Адрес"
                    :value="device.address"
                    disabled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Описание"
                    :value="device.description"
                    disabled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-row>
        </v-expand-transition>
      </v-container>
    </v-form>
  </base-dialog>
</template>


<script>
import api from "@/api/index";
import CreateDevice from "@/components/Device/Create.vue";
import BaseDialog from "@/components/Base/Dialog.vue";

export default {
  props: ["dialog"],
  components: {
    CreateDevice,
    BaseDialog,
  },
  data() {
    return {
      deviceDialog: false,
      valid: false,

      deviceList: [],
      measureList: [],

      device: {
        name: "",
        description: "",
        address: null,
      },

      sensor: {
        roomId: this.$route.params.id,
        name: "",
        description: "",
        address: null,
        measureId: null,
        deviceId: null,
      },
    };
  },
  mounted() {
    this.loadMeasures();
    this.loadDevices();
  },

  watch: {
    "sensor.deviceId": function (new_val) {
      if (new_val) {
        this.device = this.deviceList.find((d) => d.id == new_val);
      }
    },
  },

  methods: {
    deviceDialogSave(device) {
      this.deviceList.push(device);
      this.sensor.deviceId = device.id;
      this.deviceDialogClose();
    },
    deviceDialogClose() {
      this.deviceDialog = false;
    },
    loadMeasures() {
      api.rooms.getMeasures().then((responce) => {
        this.measureList = responce.data.map((m) => ({
          ...m,
          full_name: `${m.name} (${m.symbol})`,
        }));
      });
    },
    loadDevices() {
      api.rooms.getDevices().then((responce) => {
        this.deviceList = responce.data;
      });
    },
    close() {
      this.$refs.sensorCreateForm.reset();
      this.$emit("close");
    },
    save() {
      api.rooms
        .createSensor(this.sensor)
        .then((responce) => {
          this.$refs.sensorCreateForm.reset();
          this.$emit("save", responce.data);
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
  },
};
</script>


<style scoped>
.field-hader {
  height: 90px;
}
</style>