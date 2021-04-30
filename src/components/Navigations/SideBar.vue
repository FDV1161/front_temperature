<template>
  <v-navigation-drawer
    app
    clipped    
    v-model="drawer.side_bar"
    color="secondary"
  >
    <NavigationList />
  </v-navigation-drawer>
</template>


<script>
import NavigationList from "@/components/Navigations/List.vue";

export default {
  components: {
    NavigationList,    
  },
  props: ["drawer", "app_settings"],

  data: () => ({}),
};
</script>
