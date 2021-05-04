<template>
  <div class="room-details">     
    <div v-if="pageIsLoad"></div>
    <v-container fluid v-else>
      <v-row>
        <v-col>
          <v-text-field label="Название" :value="room.name"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Описание"
            :value="room.description"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Идентификатор" :value="room.id"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" class="d-flex align-center">
          <span>Показывать на главном экране</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" class="d-flex justify-end">
          <v-switch
             v-model="onHomeSwith"             
          ></v-switch>
        </v-col>
      </v-row>
      <v-expand-transition>
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
      </v-expand-transition>
      <!-- <v-row>
        <v-col cols="8" class="d-flex align-center">
          <span>Список датчиков</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4">            
            <v-text-field
            append-icon="mdi-magnify"
            label="Поиск"            
            class="mr-5"            
          ></v-text-field>          
        </v-col>
      </v-row> -->
      <v-row>
        <v-col class="d-flex align-center field-hader">
          <span >Список датчиков</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TableSensors :sensors="room.sensor_list" />
        </v-col>        
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "@/api/index";
import MainContent from "@/components/Content.vue";
import TableSensors from "@/components/Rooms/Details/Table.vue"

export default {
  components: {
    TableSensors
  },
  data() {
    return {
      room: null,
      sensors: null,
      onHomeSwith: true,
    };
  },  
  mounted() {
    this.loadRoom();
    this.loadSensors();
  },
  computed: {
    listSensorsName () {
      return this.sensors.map(s => s.name);
    },
    pageIsLoad() {
      return !(this.room && this.sensors)
    }
  },
  methods: {    
    loadRoom: function () {
      api.rooms.getRoom(this.$route.params.id).then((responce) => {
        this.room = responce.data;
      });
    },
    loadSensors: function () {
      api.rooms.getSensors().then((responce) => {
        this.sensors = responce.data;
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