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
    deviceFunction: {
      id: null,
      address: null,
      idFunc: null,
      onHome: false,
      writeEnable: false,
    },
    dialog: Boolean,
  },

  data() {
    return {
      valid: false,
      functions: [],
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
      this.$refs.deviceFunctionEditForm.reset();
    },
    save() {
      this.$api.deviceFunctions.update(this.deviceFunction)
          .then(response => {
            this.pushNotifications({
              type: "success",
              message: "Функция обновлена",
            });
            this.$emit("save", response.data);
            this.$refs.deviceFunctionEditForm.reset();
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