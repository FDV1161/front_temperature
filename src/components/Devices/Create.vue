<template>
  <base-dialog
    :dialog="dialog"
    :valid="valid"
    @close="close"
    @save="save"
    title="Добавление датчика"
    saveTitle="Добавить"
  >
    <v-form ref="deviceCreateForm" v-model="valid">
      <v-container fluid>
        <input-field v-model="device.name" label="Название" required />
        <input-field v-model="device.description" label="Описание" />

        <v-row>
          <v-col>
            <v-file-input
              id="fileUpload2"
              v-bind="icon"
              @change="selectFile"
              v-show="false"
            ></v-file-input>
            <v-btn tile @click="chooseFiles">Загрузить иконку</v-btn>
            <v-btn icon @click="deleteIcon" v-show="icon || this.device.icon">
              <v-icon color="red"> mdi-delete </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-show="icon || device.icon">
          <v-col>
            <!-- :href="icon_url" target="_blank" -->
            <v-btn icon @click="this.window.open(icon_url)">
              <v-img
                class="ml-4"
                :lazy-src="icon_url"
                max-height="64"
                max-width="64"
                :src="icon_url"
              ></v-img>
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="d-flex">
              <v-select
                :items="controllers"
                menu-props="auto"
                label="Контроллер"
                item-value="id"
                item-text="name"
                v-model="device.controllerId"
                clearable
              ></v-select>
              <v-btn
                icon
                min-height="48"
                min-width="48"
                tile
                @click="controllerDialog = true"
              >
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-expand-transition>
          <v-row v-show="device.controllerId">
            <v-container fluid class="mx-2 elevation-1">
              <v-row>
                <v-col>
                  <v-text-field
                    label="Название"
                    :value="controller.name"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Адрес"
                    :value="controller.address"
                    disabled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Описание"
                    :value="controller.description"
                    disabled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-row>
        </v-expand-transition>
      </v-container>
    </v-form>
    <functions
        :deviceFunctions="device.deviceFunctions"
        @delete="deleteFunction"
        @save="saveFunction"
      />
    <create-controller-dialog
      :dialog="controllerDialog"
      @close="controllerDialogClose"
      @save="controllerDialogSave"
    />
  </base-dialog>
</template>


<script>
import CreateControllerDialog from "@/components/Controllers/Create.vue";
import BaseDialog from "@/components/Base/Dialog.vue";
import InputField from "@/components/Base/Fields/InputField.vue";
import { console_print_error } from "@/utils/index";
import { mapActions } from "vuex";
import Functions from "@/components/Functions/List.vue";

export default {
  props: ["dialog"],
  components: {
    CreateControllerDialog,
    BaseDialog,
    InputField,
    Functions
  },
  data() {
    return {
      controllerDialog: false,
      valid: false,
      icon: null,
      iconChanged: false,
      controllers: [],

      controller: {
        name: "",
        description: "",
        address: null,
      },

      device: {
        roomId: this.$route.params.id,
        name: "",
        description: "",
        address: null,
        controllerId: null,
        deviceFunctions: [],
      },
    };
  },

  created() {
    this.$api.controllers.getAll().then((responce) => {
      this.controllers = responce.data;
    });
  },

  computed: {
    icon_url() {
      if (this.icon != null) {
        return this.device.icon;
      } else if (this.device.icon != null) {
        return "http://127.0.0.1:5000/static/" + this.device.icon;
      }
      return "none";
    },
  },

  watch: {
    "device.controllerId": function (new_val) {
      if (new_val) {
        this.controller = this.controllers.find((d) => d.id == new_val);
      }
    },
  },

  methods: {
    ...mapActions({
      pushNotifications: "notifications/push_notifications",
    }),
     deleteFunction(func) {     
      const func_index =this.device.deviceFunctions.indexOf(func);
      this.device.deviceFunctions.splice(func_index, 1);
    },
    saveFunction(func) {
      const func_index =this.device.deviceFunctions.indexOf(func);
      if (func_index >= 0){
        this.device.deviceFunctions.splice(func_index, 1);
      }      
      this.device.deviceFunctions.push(func);
    },
    selectFile(file) {
      this.icon = file;
      this.device.icon = URL.createObjectURL(file);
      this.iconChanged = true;
    },
    deleteIcon() {
      this.device.icon = null;
      this.icon = null;
    },
    chooseFiles: function () {
      document.getElementById("fileUpload2").click();
    },
    controllerDialogSave(controller) {
      this.controllers.push(controller);
      this.device.controllerId = controller.id;
      this.controllerDialogClose();
    },
    controllerDialogClose() {
      this.controllerDialog = false;
    },
    close() {
      this.$refs.deviceCreateForm.reset();
      this.$emit("close");
    },
    prepare_request(){   
      var request = Object.assign({}, this.device);
      request.deviceFunctions = request.deviceFunctions.map(e => {
        if (e.func != undefined){
          e.idFunc = e.func.id;          
        }
        return e;
      })
      return request
    },
    createDevice() {
      this.$api.devices
        .create(this.prepare_request())
        .then((responce) => {
          this.$refs.deviceCreateForm.reset();
          this.pushNotifications({
            type: "success",
            message: "Датчик создан",
          });
          this.$emit("save", responce.data);
        })
        .catch((error) => {
          this.pushNotifications({
            type: "error",
            message: error.response.data,
          });
          console_print_error(error);
        });
    },
    save() {
      if (this.iconChanged) {
        this.$api.devices.upload_file(this.icon).then((responce) => {
          this.icon = null;
          this.device.icon = responce.data;
          this.createDevice();
        });
      } else {
        this.createDevice();
      }
    },
  },
};
</script>


<style scoped>
.field-hader {
  height: 90px;
}
</style>