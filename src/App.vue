<template>
  <v-app >    
    <AppBar :drawer="drawer" :menu="menu" />    
    <SideBar :drawer="drawer" />

    <v-content app class="">
      <!-- this.$route.name -->
      <!-- <v-breadcrumbs
        :items="menu"
        large
      >

      </v-breadcrumbs> -->
      <router-view/>
    </v-content>

    <!-- <v-footer app inset class="pa-0 footer_color">
      <v-toolbar dark fluid flat color="#fff0">
        <v-toolbar-items>
        <v-btn icon @click="drawer.side_bar = !drawer.side_bar">
        <v-icon> mdi-dots-vertical </v-icon>
      </v-btn>
      </v-toolbar-items>
        <v-toolbar-items>
          <v-btn text>
            <v-icon>mdi-plus</v-icon>
            <span class="text-capitalize"> Append chart </span>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-footer> -->
  </v-app>
</template>


<script>

import List from "@/components/Navigations/List.vue";
import AppBar from "@/components/Navigations/AppBar.vue";
import SideBar from "@/components/Navigations/SideBar.vue";

export default {
  name: "App",

  components: {
    List,
    AppBar,
    SideBar,    
  },

  data: () => ({
    menu: [
      {        
        text: "Sensors",
        icon: "mdi-thermometer-lines",
        link: "Sensors",
        breadcrumbs: [{
          text: 'Sensors',
          disabled: true,
          href: 'Sensors',
        }]
        // bolt camcorder camera-timer cog-transfer consolidate cpu-32-bit home-automation pulse thermometer-lines
      },
      {        
        text: "Charts",
        icon: "mdi-chart-bell-curve",
        link: "Charts",
        breadcrumbs: [{
          text: 'Charts',
          disabled: true,
          href: 'Charts',
        }]
      },
      {        
        text: "NotCharts",
        icon: "mdi-chart-bubble",
        link: "NotCharts",
        breadcrumbs: [{
          text: 'NotCharts',
          disabled: true,
          href: 'NotCharts',
        }]
      },
      {        
        text: "Login",
        icon: "mdi-login-variant",
        link: "/",        
      }
    ], 

    drawer: {
      side_bar: window.innerWidth > 1264, // in order to not show after a reboots
      nav_bar: false,
    },
    // app_settings: {
    //   app_color: "main_color",
    // },
  }),
};
</script>


<style>

.inherited {
  background: #fff0;
}

.main_color {
  background: rgb(30,49,86);
  background: linear-gradient(90deg, rgba(30,49,86,1) 0%, rgba(29,55,105,1) 50%, rgba(25,56,116,1) 100%);
}

.footer_color {
   background: rgb(25,56,115);
  background: linear-gradient(90deg, rgba(25,56,115,1) 0%, rgba(29,55,105,1) 50%, rgba(30,49,86,1) 100%); 
}

.content_color {
  background-color: #f9f9f9;
}

</style>