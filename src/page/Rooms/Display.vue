<template>
  <div class="room-details">
    <div v-if="pageIsLoad"></div>
    <v-container fluid v-else>
      <v-row>
        <v-col>
          <v-text-field
            label="Идентификатор"
            :value="room.id"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
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
        <v-col cols="8" class="d-flex align-center">
          <span>Показывать на главном экране</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" class="d-flex justify-end">
          <v-switch v-model="room.on_home" readonly></v-switch>
        </v-col>
      </v-row>
      <!-- <v-expand-transition>
      <v-row v-show="onHomeSwith" class="pt-0">
        <v-col>
          <v-select
            :items="listSensorsName"
            menu-props="auto"
            label="Датчик"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="listSensorsName"
            menu-props="auto"
            label="Датчик"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="listSensorsName"
            menu-props="auto"
            label="Датчик"
          ></v-select>
        </v-col>
      </v-row>
      </v-expand-transition>     -->
      <v-row>
        <v-col class="d-flex align-center field-hader">
          <span>Список датчиков</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TableSensors :sensors="room.sensor_list" />
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
import TableSensors from "@/components/Rooms/Details/Table.vue";

export default {
  components: {
    TableSensors,
  },
  data() {
    return {
      room: null,
    };
  },
  mounted() {
    this.loadRoom();
  },
  computed: {
    pageIsLoad() {
      return !this.room;
    },
  },
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