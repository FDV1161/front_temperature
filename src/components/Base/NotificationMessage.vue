<template>
  <v-alert :type="notification.type" dismissible @click="click">
    {{ notification.message }}
  </v-alert>
</template>


<script>
import { mapActions } from "vuex";

export default {
  props: ["notification"],
  data() {
    return {
      timeout: null,
    };
  },

  created() {
    this.timeout = setTimeout(() => {
      this.remove_notifications(this.notification);
    }, 15000);
  },

  beforeDestroy() {
    clearTimeout(this.timeout);
  },

  methods: {
    ...mapActions({
      remove_notifications: "notifications/remove_notifications",
    }),
    click() {
      this.remove_notifications(this.notification);
    },
  },
};
</script>


<style scope>
</style>