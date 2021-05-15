<template>
  <v-form v-model="valid">
    <v-container fluid>
      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn class="mr-2" @click="$router.go(-1)"> Отмена </v-btn>
          <v-btn color="primary" v-on:click="createRoom" :disabled="!valid">
            Сохранить
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="room.name"
            :rules="[(v) => !!v || 'Обязательное поле']"
            required
          >
            <template #label>
              <span class="red--text"><strong>* </strong></span>Название
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Описание"
            v-model="room.description"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import api from "@/api/index";

export default {
  data() {
    return {
      valid: false,
      room: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    createRoom: function () {
      api.rooms
        .createRoom(this.room)
        .then((responce) => {
          this.$router.push({
            name: "edit-room",
            params: { id: responce.data.id },
          });
        })
        .catch((error) => {
          // console.log(error.response.data);
          if (error.response) {
            alert(error.response.data);
          } else if (error.request) {
            alert(error.request);
          } else {
            alert("Error", error.message);
          }
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