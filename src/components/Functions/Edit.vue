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
        <switch-field v-model="editDeviceFunction.onHome" label="Показывать на главном экране"/>
        <switch-field v-model="editDeviceFunction.writeEnable" label="Разрешено исполнять"/>
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
import SwitchField from "../../components/Base/Fields/SwitchField";
import {console_print_error} from "@/utils/index";
import {mapActions} from "vuex";

export default {
  components: {
    BaseDialog,
    InputField,
    SwitchField
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
        idDevice: null,
        writeEnable: false,
      }
    };
  },

  watch: {
    "dialog": function (new_val) {
      console.log(this.deviceFunction);
      const editDeviceFunction = JSON.parse(JSON.stringify(this.deviceFunction));
      console.log(editDeviceFunction);
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
.field-header {
  height: 90px;
}

</style>