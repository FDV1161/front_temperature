<template>
  <base-dialog
    :dialog="dialog"
    :valid="valid"
    @close="close"
    @save="save"
    title="Создание контроллера"
  >
    <v-form ref="controllerCreateForm" v-model="valid">
      <v-container fluid>
        <input-field v-model="controller.name" label="Название" required />
        <input-field
          type="number"
          v-model="controller.address"
          label="Адрес"
          required
        />
        <input-field
          type="number"
          v-model="controller.protocol"
          label="Протокол"
          required
        />
        <input-field v-model="controller.port" label="Порт" required />
        <input-field v-model="controller.description" label="Описание" />
      </v-container>
    </v-form>
  </base-dialog>
</template>


<script>
import BaseDialog from "@/components/Base/Dialog.vue";
import InputField from "@/components/Base/Fields/InputField.vue";
import { console_print_error } from "@/utils/index";
import { mapActions } from "vuex";

export default {
  props: ["dialog"],
  components: {
    BaseDialog,
    InputField,
  },
  data() {
    return {
      valid: false,
      controller: {
        name: "",
        description: "",
        address: null,
        protocol: null,
        port: "",
      },
    };
  },
  mounted() {},

  methods: {
    ...mapActions({
      pushNotifications: "notifications/push_notifications",
    }),
    close() {
      this.$refs.controllerCreateForm.reset();
      this.$emit("close", true);
    },
    save() {
      this.$api.controllers
        .create(this.controller)
        .then((responce) => {
          this.$refs.controllerCreateForm.reset();
          this.pushNotifications({
            type: "success",
            message: "Контроллер создан",
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
</style>
