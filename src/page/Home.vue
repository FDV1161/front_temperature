<template>
  <div class="home">
    <template v-if="!loading">
      <RoomPreviewCard :room="room" v-for="room in rooms" :key="room.id" />
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { dictFromArray } from "@/utils/index";

import RoomPreviewCard from "../components/Home/RoomPreviewCard.vue";
import Breadcrumbs from "../components/Base/Breadcrumbs.vue";

export default {
  data() {
    return {
      roomsLoading: true,
      functionLoading: true,
      rooms: null,
    };
  },

  computed: {
    loading() {
      var loadingValue = this.roomsLoading | this.functionLoading;
      this.setLoading(loadingValue);
      return loadingValue;
    },
  },

  components: {
    RoomPreviewCard,
    Breadcrumbs,
  },

  created() {
    this.setLoading(true);
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
      setLoading: "loader/setLoading",
    }),
  },
};
</script>
