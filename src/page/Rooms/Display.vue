<template>
  <v-container fluid>
    <v-row>
      <v-col class="px-0">
        <v-toolbar flat>
          <v-toolbar-title>Просмотр аудитории</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" text tile @click="$router.go(-1)"> Назад </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <input-field v-model="room.name" label="Название" readonly />
    <input-field v-model="room.description" label="Описание" readonly />

    <v-row>
      <v-col class="d-flex align-center field-hader">
        <span>Текущие показания</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <table-sensors :devices="room.devices" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex align-center field-hader">
        <span>Запуск функций</span>
      </v-col>
    </v-row>
    <div>
    </div>    

    <div  v-for="device in room.devices" :key="device.id" >
      <v-subheader class="subtitle-1 font-weight-black">{{device.name}}</v-subheader>      
      <runner-field v-for="deviceFunction in device.deviceFunctions" :key="deviceFunction.id" :deviceFunction="deviceFunction" class="mx-2"/>
    </div>    
    
    <v-row>
      <v-col>
        {{ room }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/api/index";
import TableSensors from "@/components/Devices/ViewTable.vue";
import InputField from "@/components/Base/Fields/InputField.vue";
import { mapActions } from "vuex";
import RunnerField from "@/components/Functions/RunnerField.vue";

export default {
  components: {
    TableSensors,
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
      // room: {
      //   name: "",
      //   description: "",
      //   id: null,
      //   devices: [
      //     {
      //       name: "12312",
      //       roomId: 1,
      //       controllerId: 1,
      //       description: "",
      //       icon: "253124531_lamp_1.svg",
      //       deviceFunctions: [
      //         {
      //           id: 7,
      //           func: {
      //             id: 5,
      //             name: "Управление температурой",
      //             measureSymbol: "℃",
      //           },
      //           idDevice: 17,
      //           address: 12312,
      //           onHome: true,
      //         },
      //       ],
      //       id: 17,
      //     },
      //   ],
      // },
    };
  },

  mounted() {
    this.loadRoom();
  },

  computed: {},

  methods: {
     ...mapActions({
      loadCurrentReadings: 'currentReadings/loadCurrentReadings',     
    }),
    loadRoom: function () {
      api.rooms.getRoom(this.$route.params.id).then((responce) => {
        this.room = responce.data;
      });
      api.currentReadings.getAll().then(responce => {
        this.loadCurrentReadings(responce.data);
      })  
    },
  },
};
</script>

<style scoped>
.field-hader {
  height: 90px;
}
</style>

