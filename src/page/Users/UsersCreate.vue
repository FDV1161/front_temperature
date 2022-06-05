<template>
  <v-form v-model="formValid">
    <v-container fluid>
      <Title
        name="Создание пользователя"
        :showSaveBtn="true"
        @onSaveBtnClick="onSave"
        :saveBtnValid="formValid"
      />

      <input-field v-model="user.login" label="Username" required />
      <input-field v-model="user.name" label="Имя" />
      <input-field v-model="user.surname" label="Фамилия" />
      <input-field v-model="user.patronymic" label="Отчество" />
      <v-select
        :items="groups"
        menu-props="auto"
        label="Роль пользователя"
        v-model="user.groupId"
        item-value="id"
        item-text="name"
      ></v-select>
      <input-field v-model="user.password" label="Пароль" required />
      <input-field
        v-model="user.confirmPassword"
        label="Повторите пароль"
        required
      />
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import { console_print_error } from "@/utils/index";
import { EDITOR, VIEWER } from "@/settings.js";
import InputField from "@/components/Base/Fields/InputField.vue";
import Title from "@/components/Base/Title.vue";

export default {
  components: {
    InputField,
    Title,
  },
  data() {
    return {
      formValid: false,
      groups: [
        { id: EDITOR, name: "editor" },
        { id: VIEWER, name: "viewer" },
      ],
      user: {
        login: "",
        name: "",
        surname: "",
        groupId: "",
        patronymic: "",
        password: "",
        confirmPassword: "",
      },
    };
  },

  methods: {
    ...mapActions({
      pushNotifications: "notifications/push_notifications",
    }),
    onSave() {
      this.$api.users
        .create(this.user)
        .then((response) => {
          this.pushNotifications({
            type: "success",
            message: "Пользователь создан",
          });
          this.$router.push({ name: "users" });
        })
        .catch((error) => {
          var errorMessage = error.response.data;
          if (typeof error.response.data === "object") {
            errorMessage =
              error.response.data["validation_error"]["body_params"][0].msg;
          }
          this.pushNotifications({
            type: "error",
            message: errorMessage,
          });
          console_print_error(error);
        });
    },
  },
};
</script>
