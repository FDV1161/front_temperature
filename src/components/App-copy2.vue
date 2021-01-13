<template>
  <v-app>
    <v-app-bar 
      app
      color=orange            
      clipped-left
    />
    
    <v-navigation-drawer 
      app
      clipped
      color=blue
    />
    
    

    <v-content 
      app            
    >

    <v-card app color=red bottom>
    </v-card>
      

    <v-toolbar        
      
      color=green      
      bottom        
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-toolbar>
    

    </v-content>

  
    
  

      
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
