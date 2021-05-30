<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="functions"
          :search="search"
          hide-default-footer
          disable-pagination
          mobile-breakpoint="0"
          :expanded.sync="expanded"
          show-expand
        >
          <template v-slot:top>
            <v-row>
              <v-col>
                <v-toolbar flat>
                  <v-toolbar-title>Список функций</v-toolbar-title>
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
                  <v-btn icon tile router :to="{ name: 'functions-create' }">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-toolbar>
              </v-col>
            </v-row>
          </template>

          

          <template v-slot:item.actions="{ item }">
            <div class="d-flex">
              <v-btn
                icon
                small
                router
                :to="{ name: 'function-edit', params: { id: item.id } }"
              >
                <v-icon small> mdi-pencil </v-icon>
              </v-btn>
              <v-btn icon small @click="choiceDeleteItem(item)">
                <v-icon small> mdi-delete </v-icon>
              </v-btn>
            </div>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">{{ item.description }}</td>
          </template>

          <template v-slot:no-data>
            <div>Список функций пуст</div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <delete-dialog
      :dialog="dialogs.delete"
      :name="deleteName"
      @close="closeDeleteDialog"
      @ok="deleteItem"
    />
  </v-container>
</template>



<script>
import DeleteDialog from "@/components/Base/DeleteDialog.vue";
import { mapActions } from "vuex";
import { console_print_error } from "@/utils/index";

export default {
  components: {
    DeleteDialog,
  },
  data: () => ({
    expanded: [],
    search: "",
    functions: [],
    dialogs: {
      delete: false,
    },
    activeItem: null,
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
        text: "Минимальное значение",
        align: "start",
        value: "minValue",
      },
      {
        text: "Максимальное значение",
        align: "start",
        value: "maxValue",
      },
      {
        text: "Физическая величина",
        align: "start",
        value: "measureName",
      },
      {
        text: "Символ",
        align: "start",
        value: "measureSymbol",
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
      if (this.activeItem) {
        return this.activeItem.name;
      }
      return "";
    },
  },

  created() {
    this.$api.functions.getAll().then((responce) => {
      this.functions = responce.data;
    });
  },

  methods: {
    ...mapActions({
      pushNotifications: "notifications/push_notifications",
    }),
    choiceDeleteItem(room) {
      this.activeItem = room;
      this.openDeleteDialog();
    },
    deleteItem() {
      this.$api.functions
        .delete(this.activeItem.id)
        .then((responce) => {
          this.pushNotifications({
            type: "success",
            message: "Функция удалена",
          });
          this.functions = this.functions.filter((item) => {
            return item.id != this.activeItem.id;
          });
          this.closeDeleteDialog();
        })
        .catch((error) => {
          this.pushNotifications({
            type: "error",
            message: "Не удалось удалить функцию",
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