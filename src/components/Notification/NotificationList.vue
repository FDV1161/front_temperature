<template>
  <div class="notification-list">
    <notification-message
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>


<script>
import NotificationMessage from "./NotificationMessage";
import { mapState } from "vuex";

export default {
  components: {
    NotificationMessage,
  },
  computed: {
    ...mapState('notifications', ["notifications"]),
  },
};
</script>


<style scope>
.notification-list {
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 15px;
  width: 320px;
  z-index: 10000;
}
</style>