<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="3" v-for="room in rooms" :key="room.id">
          <Card :data="room" />
        </v-col>
      </v-row>
      
    </v-container>
  </div>
</template>

<script>
import Card from "@/components/Home/Card";
import api from "@/api/index";

export default {
  data: () => ({
    rooms: null,
  }),
  components: {
    Card,
  },
  created() {
    this.LoadRoom();
  },
  methods: {
    LoadRoom: function () {
      api.rooms.getRooms().then((responce) => {
        // this.rooms = responce.data;
        this.rooms = responce.data.filter((room) => {
          let result = false;          
          if ("devices" in room) {
            result = room.devices.some((device) => {              
              if ("deviceFunctions" in device) {
                return device.deviceFunctions.some((df) => {
                    return df.onHome;                                     
                });
              }          
            });           
          }         
          return result;
        });        
      });
    },
  },
};
</script>
