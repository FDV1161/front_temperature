<template>
  <v-container fluid class="room-detail">
    <Title :name="room.name" />
    <Breadcrumbs :items="breadcrumbsItems" />

    <v-row class="my-5" v-if="room.description">
      <v-col>
        <div class="description">Описание</div>
        <div class="description-content">{{ room.description }}</div>
      </v-col>
    </v-row>    

    <DevicePreviewCard
      class="px-0 py-0 my-5"
      :item="device"
      :title="device.name"
      :description="device.description"
      :deviceFunctions="device.deviceFunctions"
      @onTitleClick="redirectToDeviceDetail"
      v-for="device in room.devices"
      :key="device.id"
    />

    <RunnerBlock class="my-5" :room="room" />
  </v-container>
</template>

<script>
import RunnerBlock from "@/components/Devices/RunnerBlock.vue";
import InputField from "../../components/Base/Fields/InputField";
import Title from "../../components/Base/Title.vue";
import Breadcrumbs from "@/components/Base/Breadcrumbs.vue";
import DevicePreviewCard from "@/components/Devices/DevicePreviewCard.vue";
import { mapActions } from "vuex";

export default {
  components: {
    InputField,
    RunnerBlock,
    Breadcrumbs,
    Title,
    DevicePreviewCard,
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
    redirectToDeviceDetail(item) {
      this.$router.push({ name: "devices", params: { id: item.id } });
    },
  },
};
</script>

<style scoped>
.row-indent {
  margin-top: 20px;
  margin-bottom: 5px;
}
.description {
  font-weight: 500;
}
.field-header {
  height: 90px;
}
</style>
