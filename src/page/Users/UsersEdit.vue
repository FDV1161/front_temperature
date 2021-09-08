<template>
  <v-form v-model="valid">
    <v-container fluid>
      <v-row>
        <v-col class="px-0">
          <v-toolbar flat>
            <v-toolbar-title>Редакторование пользователя</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="mr-2" text tile @click="$router.go(-1)">
              Назад
            </v-btn>
            <v-btn
              color="primary"
              tile
              v-on:click="updateItem"
              :disabled="!valid"
            >
              <v-icon left> mdi-content-save </v-icon>
              Сохранить
            </v-btn>
          </v-toolbar>
        </v-col>
      </v-row>

      <input-field v-model="user.login" label="Username" required />      
      <input-field v-model="user.name" label="Имя" />
      <input-field v-model="user.surname" label="Фамилия" />
      <input-field v-model="user.patronymic" label="Отчество" />
      

      <input-field v-model="user.password" label="Пароль" />
      <input-field v-model="user.confirm_password" label="Повторите пароль" />
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
      groups: [],
      user: {
        login: "",
        name: "",
        surname: "",
        group_id: "",
        patronymic: "",
        password: "",
        confirm_password: "",
      },
    };
  },

  created() {
    this.$api.groups.getList().then((responce) => {
      this.groups = responce.data;
    });
    this.$api.users.get(this.$route.params.id).then((responce) => {
      console.log(responce.data);
      this.user = responce.data;
    });
  },

  methods: {
    ...mapActions({
      pushNotifications: "notifications/push_notifications",
    }),
    updateItem() {
      this.$api.users
        .update(this.user)
        .then((responce) => {
          this.pushNotifications({
            type: "success",
            message: "Пользователь обновлен",
          });
          this.$router.push({
            name: "users",
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
.field-header {
  height: 90px;
}
</style>