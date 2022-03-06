<template>
  <div class="home">
    <ProgressLoading v-if="roomsLoading | functionLoading" />
    <RoomPreviewCard v-else :room="room" v-for="room in rooms" :key="room.id" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { dictFromArray } from "@/utils/index";

import RoomPreviewCard from "../components/Home/RoomPreviewCard";
import ProgressLoading from "../components/Base/ProgressLoading.vue";

export default {
  data() {
    return {
      roomsLoading: true,
      functionLoading: true,
      rooms: null,
    };
  },

  components: {
    RoomPreviewCard,
    ProgressLoading,
  },

  created() {
    this.$api.rooms.getRooms({ on_home: true }).then((response) => {
      this.rooms = response.data;
      this.roomsLoading = false;
    });

    this.$api.functions.getAll().then((response) => {
      this.functionLoading = false;
      this.setFunctions(dictFromArray(response.data, "id"));
    });
  },

  methods: {
    ...mapActions({
      setFunctions: "functions/loadFunctions",
    }),
  },
};
</script>
