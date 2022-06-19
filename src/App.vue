<template>
  <v-app>
    <app-bar :drawer="drawer" />
    <side-bar v-if="isAuth" :drawer="drawer" />
    <v-main app>
      <notification-list />
      <ProgressLoading />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppBar from "@/components/Navigations/AppBar.vue";
import SideBar from "@/components/Navigations/SideBar.vue";
import NotificationList from "@/components/Notification/NotificationList";
import ProgressLoading from "@/components/Base/ProgressLoading.vue";

export default {
  name: "App",

  components: {
    AppBar,
    SideBar,
    NotificationList,
    ProgressLoading,
  },

  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.logIn(token);
    } else {
      this.logOut();
    }
  },

  data: () => ({
    drawer: {
      side_bar: window.innerWidth > 1264, // in order to not show after a reboots
      nav_bar: false,
    },
  }),

  computed: {
    ...mapGetters({
      isAuth: "user/isAuth",
    }),
  },

  methods: {
    ...mapActions({
      signIn: "user/signIn",
      signOut: "user/signOut",
    }),
    logIn(token) {
      localStorage.setItem("token", token);
      this.$api.auth.getMe().then((responce) => {
        this.signIn(responce.data);
      });
    },
    logOut() {
      this.signOut();
      localStorage.removeItem("token");
    },
  },
};
</script>

<style>
.description-content {
  border-radius: 5px 5px 5px 5px;
  padding: 5px 10px 5px 10px;
  margin: 10px 10px 10px 10px;
}
.custom-slider .v-messages {
  display: none;
}
.custom-switch .v-messages {
  display: none;
}
</style>
