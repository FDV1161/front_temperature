<template>
  <v-form v-model="valid">
    <v-container fluid>
      <v-row>
        <v-col class="px-0">
          <v-toolbar flat>
            <v-toolbar-title>Создание функции</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="mr-2" text tile @click="$router.go(-1)">
              Назад
            </v-btn>
            <v-btn
              color="primary"
              tile
              v-on:click="createItem"
              :disabled="!valid"
            >
              <v-icon left> mdi-content-save </v-icon>
              Сохранить
            </v-btn>
          </v-toolbar>
        </v-col>
      </v-row>

      <input-field v-model="func.name" label="Название" required />
      <input-field v-model="func.minValue" label="Минимальное значение" type="number" required />
      <input-field v-model="func.maxValue" label="Максимальное значение" type="number" required />
      <input-field v-model="func.measureName" label="Физическая величина"  />
      <input-field v-model="func.measureSymbol" label="Символ"  />
      <input-field v-model="func.description" label="Описание" />
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import { console_print_error } from "@/utils/index";
import InputField from "@/components/Base/Fields/InputField.vue";

export default {
  components: {
    InputField,
  },
  data() {
    return {
      valid: false,
      func: {
        name: "",
        minValue: null,
        maxValue: null,
        measureName: "",
        measureSymbol: "",
        description: "",
      },
    };
  },
  methods: {
    ...mapActions({
      pushNotifications: "notifications/push_notifications",
    }),
    createItem: function () {
      this.$api.functions
        .create(this.func)
        .then((responce) => {
          this.pushNotifications({
            type: "success",
            message: "Аудитория создана",
          });
          this.$router.push({
            name: "functions",            
          });
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