<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="rooms"
          :search="search"
          hide-default-footer
          disable-pagination
          mobile-breakpoint="0"
        >
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
              <!-- <v-btn icon tile router @click="openRoomDialog">
                <v-icon>mdi-plus</v-icon>
              </v-btn> -->
              <v-btn icon tile router to="/create-room">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <create-room-modal
                :dialog="dialogs.create"
                @close="closeRoomDialog"
                @save="appendRoom"
              />
            </v-toolbar>
            <delete-dialog
              :dialog="dialogs.delete"
              :name="deleteName"
              @close="closeDeleteDialog"
              @ok="deleteRoom"
            />
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
            <div class="d-flex">
              <v-btn
                icon
                small
                router
                :to="{ name: 'edit-room', params: { id: item.id } }"
              >
                <v-icon small> mdi-pencil </v-icon>
              </v-btn>
              <v-btn icon small @click="choiceDeleteRoom(item)">
                <v-icon small> mdi-delete </v-icon>
              </v-btn>
            </div>
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
import DeleteDialog from "@/components/Base/DeleteDialog.vue";
import { mapActions } from "vuex";

export default {
  components: {
    CreateRoomModal,
    DeleteDialog,
  },
  data: () => ({
    rooms: [],
    search: "",
    dialogs: {
      create: false,
      delete: false,
    },
    activeRoom: null,
    headers: [
      {
        text: "Название",
        align: "start",
        value: "name",
      },
      {
        text: "",
        value: "actions",
        align: "start",
        width: "80px",
        sortable: false,
      },
    ],
  }),

  computed: {
    deleteName() {
      if (this.activeRoom) {
        return this.activeRoom.name;
      }
      return "";
    },
  },

  mounted() {
    this.LoadRooms();    
  },

  methods: {
    ...mapActions({
      push_notifications: "notifications/push_notifications",
    }),
    LoadRooms() {
      api.rooms.getRooms().then((responce) => {
        this.rooms = responce.data;
      });
    },

    choiceDeleteRoom(room) {
      this.activeRoom = room;
      this.openDeleteDialog();
    },

    spliceRooms() {
      // TODO переделать?
      if (this.activeRoom) {
        this.rooms.splice(this.rooms.indexOf(this.activeRoom), 1);
        this.activeRoom = null;
      }
    },
    appendRoom(room) {
      this.rooms.push(room);
      this.closeRoomDialog();
    },
    deleteRoom() {
      api.rooms
        .deleteRoom(this.activeRoom.id)
        .then((responce) => {
          this.spliceRooms();
          this.closeDeleteDialog();
        })
        .catch((error) => {
          this.push_notifications({
            type: "error",
            message: "Не удалось удалить аудиторию",
          });
          console.log(error.response.data);
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
    openRoomDialog() {
      this.dialogs.create = true;
    },
    openDeleteDialog() {
      this.dialogs.delete = true;
    },
    closeRoomDialog() {
      this.dialogs.create = false;
    },
    closeDeleteDialog() {
      this.dialogs.delete = false;
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