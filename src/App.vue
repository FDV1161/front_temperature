<template>
  <v-app>
    <!-- <v-app-bar 
      app
      color=orange            
      clipped-left
    /> -->
    <AppBar :color=app_settings.app_color />
    
    <v-navigation-drawer 
      app
      clipped
      :color=app_settings.app_color
    >

    <List />

    </v-navigation-drawer>
    

    <v-content 
      app            
    >
    <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col align="center">
        <v-sheet
          color="white"
          elevation="10"
          height="142"
          width="166"
        >    
      </v-sheet>  
      </v-col>
          

    
    </v-row>

    <v-row>
      <v-col align="center">        
      <MyChart />
      </v-col>
    </v-row>

    </v-container>

    

    

    </v-content>


    <v-footer
      app
      color=green      
      inset
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-footer>

  
  
    
  

      
  </v-app>
</template>


<script>
// import HelloWorld from './components/HelloWorld';
import MyChart from "@/components/chart.vue"
import List from "@/components/list.vue"
import AppBar from "@/components/AppBar.vue"

export default {
  name: 'App',



  components: {
    // HelloWorld,
    MyChart,
    List,
    AppBar
  },

  data: () => ({
    //
    app_settings: {
      app_color: "green",
    }
  }),
};
</script>
