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
              label="Загрузка иконки"
              prepend-icon="mdi-file-image"
            ></v-file-input>
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

export default {
  props: ["dialog"],
  components: {
    CreateControllerDialog,
    BaseDialog,
    InputField,
  },
  data() {
    return {
      controllerDialog: false,
      valid: false,

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
    save() {
      this.$api.devices
        .create(this.device)
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
  },
};
</script>


<style scoped>
.field-hader {
  height: 90px;
}
</style>