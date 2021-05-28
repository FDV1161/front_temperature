<template>
  <v-app>
    <app-bar :drawer="drawer" :menu="menu" />
    <side-bar :drawer="drawer" />
    <v-main app>      
      <notification-list />
      <router-view />      
    </v-main>
    
  </v-app>
</template>


<script>
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

  data: () => ({
    menu: [
      {
        text: "Login",
        icon: "mdi-login-variant",
        link: "/",
      },
    ],
    drawer: {
      side_bar: window.innerWidth > 1264, // in order to not show after a reboots
      nav_bar: false,
    },
  }),  
};
</script>


<style>
</style>