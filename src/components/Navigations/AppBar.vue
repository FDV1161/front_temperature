<template>
  <v-app-bar app dense clipped-left color="secondary"> <!-- dark :color="color" -->
    <v-toolbar dense flat color="secondary"> <!-- color="#fff0" -->
      <v-app-bar-nav-icon tile @click.stop="drawer.side_bar = !drawer.side_bar"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span>Title</span> <!-- class="font-weight-light" -->
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- hidden-md-and-up <v-app-bar-nav-icon tile plain></v-app-bar-nav-icon> -->
      <v-toolbar-items class="hidden-md-and-up">
          <v-app-bar-nav-icon @click="drawer.nav_bar = !drawer.nav_bar"></v-app-bar-nav-icon>
        <!-- <v-btn text @click="drawer.nav_bar = !drawer.nav_bar">           -->
          <!-- <span class="text-capitalize"> Menu </span> -->
          <!-- <v-app-bar-nav-icon disabled></v-app-bar-nav-icon> -->
        <!-- </v-btn> -->
      </v-toolbar-items>

      <v-toolbar-items class="hidden-sm-and-down" v-for="(item, i) in menu" :key="i" router>
        <v-btn text router :to='item.link'>
          <v-icon left>{{item.icon}}</v-icon>
          <span class="text-capitalize"> {{item.text}} </span>
        </v-btn>        
      </v-toolbar-items>
      <!-- <v-btn flat text class="text-capitalize"> NotChart </v-btn>
        <v-btn flat text class="text-capitalize"> LogIn </v-btn> -->
    </v-toolbar>

    <v-dialog
      v-model="drawer.nav_bar"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark flat :color="color" class="px-4">
          <v-toolbar-title class="text-uppercase">
            <span>Title</span> <!-- class="font-weight-light" -->
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          <v-btn text icon @click.native="drawer.nav_bar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-list>
            <v-list-item-group >
          <v-list-item v-for="(item, i) in menu" :key="i" router :to='item.link'>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </v-list-item-group>
        </v-list>


      </v-card>
    </v-dialog>
  </v-app-bar>
</template>


<script>
export default {
  props: ["color", "drawer", "menu"],
  
  watch:{
        $route (to, from){
            this.drawer.nav_bar = false;
        }
    },


  data: () => ({
    
  }),
};
</script>


<style >
.icon_width {
    width: 48;
}
.menu_bar {
  z-index: 100;
}
</style>