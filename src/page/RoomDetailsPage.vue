<template>
  <div class="room-details">
    <v-container fluid>
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
    </v-container>
  </div>
</template>

<script>
import api from "@/api/index";
import MainContent from "@/components/Content.vue";

export default {
  data: () => ({
    room: [],
  }),
  created() {
    this.LoadRoom();
  },
  methods: {
    LoadRoom: function () {
      api.rooms.getRoom(this.$route.params.id).then((responce) => {
        this.room = responce.data;
        console.log(this.room);
      });
    },
  },
};
</script>