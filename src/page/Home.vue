<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="3" v-for="room in rooms" :key="room.id">
          <Card :room="room"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Card from "../components/Home/Card";

export default {
  data(){
    return {
      // rooms: {
      //   id: null,
      //   name: null,
      //   currentValues: [
      //     {
      //       id: null,
      //       minValue: null,
      //       maxValue: null,
      //       icon: null,
      //       measureSymbol: null,
      //       writeEnable: null,
      //       cur_val: null
      //     }
      //   ]
      // },
      rooms: null,
    }
  },
  components: {
    Card,
  },
  created() {
    this.$api.home.getCurrentReadings()
        .then(response => {
          this.rooms = response.data;
        })
  },
};
</script>
