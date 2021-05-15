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
      <div v-if="pageLoading"></div>
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
          <v-col>
            <v-text-field label="Адрес" v-model:value="address"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              :items="measuresSelected"
              menu-props="auto"
              label="Физическая величина"
              item-value="key"
              item-text="name"
              v-model="measure"
              clearable
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="d-flex">
              <v-select
                :items="devices"
                menu-props="auto"
                label="Оборудование"
                item-value="id"
                item-text="name"
                v-model="deviceSelect"
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
          <v-row v-show="deviceSelect">
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
      measures: null,
      devices: null,
      deviceSelect: null,

      name: null,
      description: null,
      address: null,
      measure: null,
    };
  },
  mounted() {
    this.loadMeasures();
    this.loadDevices();
  },

  computed: {
    measuresSelected() {
      return this.measures.map((m, index) => ({
        key: index,
        name: `${m.name} (${m.symbol})`,
      }));
    },
    pageLoading() {
      return !(this.devices && this.measures);
    },
    device() {
      var base_device = {
        id: "",
        name: "",
        description: "",
        address: "",
      };
      return this.devices.find((d) => d.id == this.deviceSelect) || base_device;
    },
  },

  methods: {
    deviceDialogSave(device) {
      this.deviceSelect = device.id;
      this.devices.push(device);
      this.deviceDialog = false;
    },
    deviceDialogClose() {
      this.deviceDialog = false;
    },
    loadMeasures() {
      api.rooms.getMeasures().then((responce) => {
        this.measures = responce.data;
      });
    },
    loadDevices() {
      api.rooms.getDevices().then((responce) => {
        this.devices = responce.data;
      });
    },
    close() {
      this.$refs.sensorCreateForm.reset();
      this.$emit("close");
    },
    save() {
      this.$emit("save", {
        name: this.name,
        description: this.description,
        address: this.address,
        measure: this.measures[this.measure],
        device: this.deviceSelect,
      });
      this.$refs.sensorCreateForm.reset();
    },
  },
};
</script>


<style scoped>
.field-hader {
  height: 90px;
}
</style>