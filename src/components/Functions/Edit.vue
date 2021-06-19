<template>
  <base-dialog
      :dialog="dialog"
      :valid="valid"
      @close="close"
      @save="save"
      title="Подключение функции"
      saveTitle="Добавить"
  >
    <v-form ref="deviceFunctionEditForm" v-model="valid">
      <v-container fluid>
        <input-field v-model="editDeviceFunction.address" label="Адрес" required/>

        <v-row>
          <v-col cols="8" class="d-flex align-center">
            <span>Показывать на главном экране</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4" class="d-flex justify-end">
            <v-switch v-model="editDeviceFunction.onHome"></v-switch>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="d-flex">
              <v-select
                  :items="functions"
                  menu-props="auto"
                  label="Функция"
                  item-value="id"
                  item-text="name"
                  v-model="editDeviceFunction.idFunc"
                  clearable
                  class="required"
                  :rules="[(value) => !!value || 'Обязательное поле']"
              ></v-select>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </base-dialog>
</template>


<script>
import BaseDialog from "../../components/Base/Dialog.vue";
import InputField from "../../components/Base/Fields/InputField.vue";
import {console_print_error} from "@/utils/index";
import {mapActions} from "vuex";

export default {
  components: {
    BaseDialog,
    InputField,
  },

  props: {
    deviceFunction: Object,
    dialog: Boolean,
  },

  data() {
    return {
      valid: false,
      functions: [],
      editDeviceFunction: {
        address: "",
        onHome: false,
        idFunc: null,
        idDevice: null
      }
    };
  },

  watch: {
    "dialog": function (new_val) {
      const editDeviceFunction = JSON.parse(JSON.stringify(this.deviceFunction));
      this.editDeviceFunction = Object.assign({}, editDeviceFunction);
      this.editDeviceFunction.idFunc = this.deviceFunction.func.id;
    },
  },

  created() {
    this.$api.functions.getAll().then((response) => {
      this.functions = response.data;
    });
  },

  methods: {
    ...mapActions({
      pushNotifications: "notifications/push_notifications",
    }),
    close() {
      this.$emit("close");
      this.$refs.deviceFunctionEditForm.reset();
    },
    save() {
      this.$api.deviceFunctions.update(this.editDeviceFunction)
          .then(response => {
            this.$refs.deviceFunctionEditForm.reset();
            this.pushNotifications({
              type: "success",
              message: "Функция обновлена",
            });
            this.$emit("save", response.data);
          })
          .catch((error) => {
            this.pushNotifications({
              type: "error",
              message: "Не удалось обновить функцию",
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