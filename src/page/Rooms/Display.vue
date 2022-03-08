<template>
  <v-container fluid class="room-detail">
    
    <Title :name="room.name" />
    <Breadcrumbs :items="breadcrumbsItems" />

    <input-field v-model="room.description" label="Описание" readonly />
    <current-device-values :devices="room.devices" class="px-0" />
    <runner-block :room="room" />
  </v-container>
</template>

<script>
import CurrentDeviceValues from "../../components/Devices/CurrentValues";
import RunnerBlock from "../../components/Devices/RunnerBlock";
import InputField from "../../components/Base/Fields/InputField";
import Title from "../../components/Base/Title.vue";
import Breadcrumbs from "@/components/Base/Breadcrumbs.vue";
import { mapActions } from "vuex";

export default {
  components: {
    CurrentDeviceValues,
    InputField,
    RunnerBlock,
    Breadcrumbs,
    Title,
  },

  data() {
    return {
      room: {
        id: null,
        name: "",
        description: "",
        devices: [],
      },
    };
  },

  computed: {
    breadcrumbsItems() {
      return [
        {
          text: "Главная",
          disabled: false,
          to: { name: "home" },
          exact: true,
        },
        {
          text: this.room.name,
          disabled: false,
        },
      ];
    },
  },

  created() {
    this.setLoading(true);
    this.$api.rooms.getRoom(this.$route.params.id).then((response) => {
      this.setLoading(false);
      this.room = response.data;
    });
  },

  methods: {
    ...mapActions({
      loadCurrentReadings: "currentReadings/loadCurrentReadings",
      setLoading: "loader/setLoading",
    }),
  },
};
</script>

<style scoped>
.field-header {
  height: 90px;
}
</style>

