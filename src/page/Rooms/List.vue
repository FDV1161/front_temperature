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
            <v-row>
              <v-col>
                <v-toolbar flat>
                  <v-toolbar-title>Список аудиторий</v-toolbar-title>
                </v-toolbar>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-toolbar flat>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Поиск"
                    hide-details
                    class="mr-5"
                  ></v-text-field>
                  <v-btn icon tile router to="/create-room">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-toolbar>
              </v-col>
            </v-row>
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
    <delete-dialog
      :dialog="dialogs.delete"
      :name="deleteName"
      @close="closeDeleteDialog"
      @ok="deleteRoom"
    />
  </v-container>
</template>



<script>
import CreateRoomModal from "@/components/Rooms/Create.vue";
import DeleteDialog from "@/components/Base/DeleteDialog.vue";
import { mapActions, mapState } from "vuex";
import { console_print_error } from "@/utils/index";

export default {
  components: {
    CreateRoomModal,
    DeleteDialog,
  },
  data: () => ({
    search: "",
    dialogs: {
      delete: false,
    },
    activeRoom: null,
    headers: [
      {
        text: "№",
        align: "start",
        value: "id",
        width: "100px",        
      },
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
    ...mapState("rooms", ["rooms"]),
    deleteName() {
      if (this.activeRoom) {
        return this.activeRoom.name;
      }
      return "";
    },
  },

  created() {
    this.$api.rooms.getRooms().then(response => {
      this.loadRooms(response.data);
    });
  },

  methods: {
    ...mapActions({
      pushNotifications: "notifications/push_notifications",
      loadRooms: "rooms/loadRooms",
      removeRoom: "rooms/removeRoom",      
    }),
    choiceDeleteRoom(room) {
      this.activeRoom = room;
      this.openDeleteDialog();
    },    
    deleteRoom() {
      this.$api.rooms
        .deleteRoom(this.activeRoom.id)
        .then((responce) => {
          this.removeRoom(this.activeRoom);
          this.pushNotifications({
            type: "success",
            message: "Аудитория удалена",
          });
          this.closeDeleteDialog();
        })
        .catch((error) => {
          this.pushNotifications({
            type: "error",
            message: "Не удалось удалить аудиторию",
          });
          console_print_error(error);          
        });
    },
    openDeleteDialog() {
      this.dialogs.delete = true;
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