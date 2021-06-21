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

    <v-row>
      <v-col class="d-flex align-center field-header">
        <span>Запуск функций</span>
      </v-col>
    </v-row>
    <div v-for="device in room.devices" :key="device.id">
      <v-subheader class="subtitle-1 font-weight-black">{{ device.name }}</v-subheader>
      <runner-field v-for="deviceFunction in device.deviceFunctions" :key="deviceFunction.id"
                    :deviceFunction="deviceFunction" class="mx-2"/>
    </div>
  </v-container>
</template>

<script>

import CurrentDeviceValues from "../../components/Devices/CurrentValues.vue";
import InputField from "../../components/Base/Fields/InputField.vue";
import RunnerField from "../../components/Functions/RunnerField.vue";
import {mapActions} from "vuex";

export default {
  components: {
    CurrentDeviceValues,
    InputField,
    RunnerField
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

