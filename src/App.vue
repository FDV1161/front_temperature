<template>
  <v-app>
    <app-bar :drawer="drawer" />    
    <side-bar v-if="isAuth" :drawer="drawer" />
    <v-main app>
      <notification-list />
      <router-view />
    </v-main>
  </v-app>
</template>


<script>
import { mapGetters } from "vuex";
import AppBar from "@/components/Navigations/AppBar.vue";
import SideBar from "@/components/Navigations/SideBar.vue";
import NotificationList from "@/components/Notification/NotificationList";

export default {
  name: "App",

  components: {
    AppBar,
    SideBar,
    NotificationList,
  },

  created() {
    this.$store.dispatch(
      "user/setUser",
      JSON.parse(localStorage.getItem("user"))
    );
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
    }),
    isAuth(){
      return !!this.user;
    }
  }
};
</script>


<style>
</style>