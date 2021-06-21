<template>
  <v-container fluid>
    <v-row>
      <v-col class="px-0">
        <v-toolbar flat>
          <v-toolbar-title>Просмотр аудитории</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" text tile @click="$router.go(-1)">Назад</v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <input-field v-model="room.name" label="Название" readonly/>
    <input-field v-model="room.description" label="Описание" readonly/>
    <current-device-values :devices="room.devices" class="px-0"/>
    <runner-block :room="room"/>

  </v-container>
</template>

<script>

import CurrentDeviceValues from "../../components/Devices/CurrentValues";
import RunnerBlock from "../../components/Devices/RunnerBlock";
import InputField from "../../components/Base/Fields/InputField";
import {mapActions} from "vuex";

export default {
  components: {
    CurrentDeviceValues,
    InputField,
    RunnerBlock
  },

  data() {
    return {
      room: {
        id: null,
        name: "",
        description: "",
        devices: []
      },
    };
  },

  created() {
    this.$api.rooms.getRoom(this.$route.params.id).then(response => {
      this.room = response.data;
      console.log(response.data)
    });
  },

  methods: {
    ...mapActions({
      loadCurrentReadings: 'currentReadings/loadCurrentReadings',
    }),

  },
};
</script>

<style scoped>
.field-header {
  height: 90px;
}
</style>

