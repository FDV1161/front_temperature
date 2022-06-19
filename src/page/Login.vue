<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="8" sm="6" md="6">
        <v-form ref="loginForm" @submit.prevent="authUser">
          <h2 class="h2 text-center">Авторизация</h2>
          <input-field
            v-model.trim="username"
            label="Логин"
            type="text"
            :error-messages="errorMessages"
            required
          />
          <input-field
            v-model.trim="password"
            label="Пароль"
            type="password"
            :error-messages="errorMessages"
            required
          />
          <v-btn class="float-right text-capitalize" tile type="submit">
            Войти
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InputField from "../components/Base/Fields/InputField";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: null,
      password: null,
      errorMessages: [],
    };
  },
  components: {
    InputField,
  },
  methods: {
    ...mapActions({
      signIn: "user/signIn",
    }),

    authUser() {
      if (!this.$refs.loginForm.validate()) return;
      this.$api.auth
        .getToken({
          username: this.username,
          password: this.password,
        })
        .then((responce) => {
          this.logIn(responce.data.token);
        })
        .catch((error) => {
          this.errorMessages = ["Неверный логин или пароль"];
          this.$refs.loginForm.validate();
        });
    },

    logIn(token) {
      localStorage.setItem("token", token);
      this.$api.auth.getMe().then((responce) => {
        this.signIn(responce.data);
        this.$router.push(this.$route.query.redirect || "/");
      });
    },
  },
};
</script>
