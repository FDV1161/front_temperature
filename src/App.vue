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

  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      this.signIn(token);
    } else {
      this.signOut();
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
      user: "user/getUser",
      isAuth: "user/isAuth",
      values: "soketio/values",
    }),
  },

  methods: {
    ...mapActions({
      signIn: "user/signIn",
      signOut: "user/signOut",
      setFunctions: "functions/loadFunctions",
    }),
  },
};
</script>

<style></style>
