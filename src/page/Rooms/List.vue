<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="rooms" :search="search">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Список аудиторий</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Поиск"
                hide-details
                class="mr-5"
              ></v-text-field>
              <v-btn icon tile router @click="dialog = true">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <create-room-modal
                :dialog="dialog"
                @close="closeRoomModal"
                @save="saveRoomModal"
              />
            </v-toolbar>
          </template>

          <template v-slot:item.name="{ item }">
            <router-link
              :to="{ name: 'room-details', params: { id: item.id } }"
              class="table-link"
            >
              {{ item.name }}
            </router-link>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>

          <template v-slot:no-data>
            <div>Список аудиторий пуст</div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import api from "@/api/index";
import CreateRoomModal from "@/components/Rooms/Create.vue";

export default {
  components: {
    CreateRoomModal,
  },
  data: () => ({
    rooms: [],
    search: "",
    dialog: false,
    headers: [
      {
        text: "Название",
        align: "start",
        value: "name",
      },
      {
        text: "Actions",
        value: "actions",
        align: "start",
        width: "80px",
        sortable: false,
      },
    ],
  }),

  computed: {},

  mounted() {
    this.LoadRooms();
  },

  methods: {
    LoadRooms() {
      api.rooms.getRooms().then((responce) => {
        this.rooms = responce.data;
      });
    },
    closeRoomModal() {
      this.dialog = false;
    },
    saveRoomModal(data) {
      console.log(data);

      this.rooms.push(data);
      this.closeRoomModal();
    },
  },
};
</script>

<style scoped>
.table-link {
  color: black;
  text-decoration: none;
}
</style>