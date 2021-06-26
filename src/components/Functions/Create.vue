<template>
  <base-dialog
      :dialog="dialog"
      :valid="valid"
      @close="close"
      @save="save"
      title="Подключение функции"
      saveTitle="Добавить"
  >
    <v-form ref="deviceFunctionCreateForm" v-model="valid">
      <v-container fluid>
        <input-field v-model="deviceFunction.address" label="Адрес" required/>
        <switch-field v-model="deviceFunction.onHome" label="Показывать на главном экране"/>
        <switch-field v-model="deviceFunction.writeEnable" label="Разрешено исполнять"/>

        <v-row>
          <v-col>
            <div class="d-flex">
              <v-select
                  :items="functions"
                  menu-props="auto"
                  label="Функция"
                  item-value="id"
                  item-text="name"
                  v-model="deviceFunction.idFunc"
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
import {console_print_error} from "../../utils/index";
import {mapActions} from "vuex";

export default {
  components: {
    BaseDialog,
    InputField,
    SwitchField
  },

  props: {
    dialog: Boolean,
    deviceId: Number,
  },

  data() {
    return {
      valid: false,
      functions: [],
      deviceFunction: {
        address: "",
        onHome: false,
        idFunc: null,
        idDevice: this.deviceId,
        writeEnable: false,
      }
    };
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
      this.$refs.deviceFunctionCreateForm.reset();
    },
    save() {
      this.$api.deviceFunctions.create(this.deviceFunction)
          .then(response => {
            this.$refs.deviceFunctionCreateForm.reset();
            this.pushNotifications({
              type: "success",
              message: "Функция подключена",
            });
            this.$emit("save", response.data);
          })
          .catch((error) => {
            this.pushNotifications({
              type: "error",
              message: "Не удалось подключить функцию",
            });
            console_print_error(error);
          });
    },
  },
};
</script>

<style scoped>

</style>