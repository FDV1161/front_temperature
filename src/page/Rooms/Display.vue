<template>
  <div class="room-details">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-text-field
            label="Название"
            :value="room.name"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Описание"
            :value="room.description"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex align-center field-hader">
          <span>Список датчиков</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TableSensors :sensors="room.sensorList" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn color="" class="mr-5" @click="$router.go(-1)"> назад </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "@/api/index";
import TableSensors from "@/components/Devices/ViewTable.vue";

export default {
  components: {
    TableSensors,
  },

  data() {
    return {
      room: {
        id: null,
        name: "",
        description: "",
        onHome: "",
        sensorOneId: null,
        sensorTwoId: null,
        sensorFreeId: null,
        sensorList: [],
      },
    };
  },

  mounted() {
    this.loadRoom();
  },

  computed: {},

  methods: {
    loadRoom: function () {
      api.rooms.getRoom(this.$route.params.id).then((responce) => {
        this.room = responce.data;
      });
    },
  },
};
</script>

<style scoped>
.field-hader {
  height: 90px;
}
</style>