<template>
  <v-app-bar app :color="color" clipped-left>
    <v-toolbar flat :color="color">
      <v-btn icon @click="drawer.side_bar = !drawer.side_bar">
        <v-icon> mdi-dots-vertical </v-icon>
      </v-btn>

      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Title</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- hidden-md-and-up <v-app-bar-nav-icon tile plain></v-app-bar-nav-icon> -->
      <v-toolbar-items class="hidden-md-and-up">
        <v-btn text @click="drawer.nav_bar = !drawer.nav_bar">
          <v-app-bar-nav-icon disabled></v-app-bar-nav-icon>
          <span class="text-capitalize"> Menu </span>
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text>
          <v-icon left>mdi-chart-bell-curve-cumulative</v-icon>
          <span class="text-capitalize"> Charts </span>
        </v-btn>
        <v-btn flat text class="text-capitalize"> NotChart </v-btn>
        <v-btn flat text class="text-capitalize"> LogIn </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-dialog
      v-model="drawer.nav_bar"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar flat :color="color">
          <v-toolbar-title class="text-uppercase">
            <span class="font-weight-light">Title</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="drawer.nav_bar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-item v-for="(item, i) in nav" :key="i">
            <v-list-item-icon>
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>


<script>
export default {
  props: ["color", "drawer"],

  data: () => ({
    nav: [
      {
        icon: "home",
        text: "Home",
        title: "Back to Home page",
        active: true,
      },
      {
        icon: "info",
        text: "About",
        title: "About this demo",
        active: false,
      },
    ],
  }),
};
</script>


<style scoped>
</style>