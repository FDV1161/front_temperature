<template>
  <div class="home">    
    <v-container fluid>
      <v-row>
        <v-col md="3" v-for="room in this.rooms" :key="room.id" >          
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
    rooms: null
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
        this.rooms = responce.data.filter(room => room.onHome == true);
      });
    },
  },
};
</script>
