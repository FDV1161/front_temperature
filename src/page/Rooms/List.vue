<template>
  <div class="">
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
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <!-- <v-btn color="primary" v-bind="attrs" v-on="on"> Добавить </v-btn> -->
              <v-btn color="primary" router to="/create-room"> Добавить </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <div>Список аудиторий пуст</div>
      </template>
    </v-data-table>
  </div>
</template>



<script>
import api from "@/api/index";

export default {
  data: () => ({
    rooms: [],
    search: "",
    dialog: false,
    dialogDelete: false,
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
    editedIndex: -1,
    editedItem: {
      name: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.LoadRooms();
  },

  methods: {
    initialize() {
      // this.rooms = [];
      // this.rooms = [
      //   {
      //     name: "Frozen Yogurt",
      //     calories: 159,
      //     fat: 6.0,
      //     carbs: 24,
      //     protein: 4.0,
      //   },
      //   {
      //     name: "Ice cream sandwich",
      //     calories: 237,
      //     fat: 9.0,
      //     carbs: 37,
      //     protein: 4.3,
      //   },
      //   {
      //     name: "Eclair",
      //     calories: 262,
      //     fat: 16.0,
      //     carbs: 23,
      //     protein: 6.0,
      //   },
      //   {
      //     name: "Cupcake",
      //     calories: 305,
      //     fat: 3.7,
      //     carbs: 67,
      //     protein: 4.3,
      //   },
      //   {
      //     name: "Gingerbread",
      //     calories: 356,
      //     fat: 16.0,
      //     carbs: 49,
      //     protein: 3.9,
      //   },
      //   {
      //     name: "Jelly bean",
      //     calories: 375,
      //     fat: 0.0,
      //     carbs: 94,
      //     protein: 0.0,
      //   },
      //   {
      //     name: "Lollipop",
      //     calories: 392,
      //     fat: 0.2,
      //     carbs: 98,
      //     protein: 0,
      //   },
      //   {
      //     name: "Honeycomb",
      //     calories: 408,
      //     fat: 3.2,
      //     carbs: 87,
      //     protein: 6.5,
      //   },
      //   {
      //     name: "Donut",
      //     calories: 452,
      //     fat: 25.0,
      //     carbs: 51,
      //     protein: 4.9,
      //   },
      //   {
      //     name: "KitKat",
      //     calories: 518,
      //     fat: 26.0,
      //     carbs: 65,
      //     protein: 7,
      //   },
      // ];
    },
    LoadRooms: function () {
      api.rooms.getRooms().then((responce) => {
        this.rooms = responce.data;
      });
    },

    editItem(item) {
      this.editedIndex = this.rooms.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.rooms.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.rooms.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.editedItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.editedItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.rooms[this.editedIndex], this.editedItem);
      } else {
        this.rooms.push(this.editedItem);
      }
      this.close();
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