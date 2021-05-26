<template>
  <v-form v-model="valid">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-toolbar flat>
            <v-toolbar-title>Создание аудитории</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text tile v-on:click="createRoom" :disabled="!valid">
              <v-icon left> mdi-content-save </v-icon>
              Сохранить
            </v-btn>
          </v-toolbar>
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
import { mapActions } from "vuex";
import { console_print_error } from "@/utils/index";

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
    ...mapActions({
      pushNotifications: "notifications/push_notifications",
    }),
    createRoom: function () {
      this.$api.rooms
        .createRoom(this.room)
        .then((responce) => {
          this.pushNotifications({
            type: "success",
            message: "Аудитория создана",
          });
          this.$router.push({
            name: "edit-room",
            params: { id: responce.data.id },
          });
        })
        .catch((error) => {
          this.pushNotifications({
            type: "error",
            message: error.response.data,
          });
          console_print_error(error);
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