<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          hide-default-footer
          disable-pagination
          mobile-breakpoint="0"
        >
          <template v-slot:top>
            <v-row>
              <v-col>
                <v-toolbar flat>
                  <v-toolbar-title>Список пользователей</v-toolbar-title>
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
                  <v-btn icon tile router :to="{ name: 'usersCreate' }">
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
                :to="{ name: 'usersEdit', params: { id: item.id } }"
              >
                <v-icon small> mdi-pencil </v-icon>
              </v-btn>
              <v-btn icon small @click="choiceDeleteItem(item)">
                <v-icon small> mdi-delete </v-icon>
              </v-btn>
            </div>
          </template>

          <template v-slot:item.groupId="{ value }">
            {{ getGroupName(value) }}
          </template>

          <template v-slot:no-data>
            <div>Список пользователей пуст</div>
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
    search: "",
    users: [],
    groups: [],
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
        text: "Username",
        align: "start",
        value: "login",
      },
      {
        text: "Группа",
        align: "start",
        value: "groupId",
      },
      {
        text: "Имя",
        align: "start",
        value: "name",
      },
      {
        text: "Фамилия",
        align: "start",
        value: "surname",
      },
      {
        text: "Отчество",
        align: "start",
        value: "patronymic",
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
    this.$api.groups.getList().then((responce) => {
      this.groups = responce.data;
    });
    this.$api.users.getList().then((responce) => {
      this.users = responce.data;
    });
  },

  methods: {
    ...mapActions({
      pushNotifications: "notifications/push_notifications",
    }),
    getGroupName(groupId) {
      var group = this.groups.find((e) => e.id == groupId);
      return group ? group.name : "";
    },
    choiceDeleteItem(item) {
      this.activeItem = item;
      this.openDeleteDialog();
    },
    deleteItem() {
      this.$api.users
        .delete(this.activeItem.id)
        .then((responce) => {
          this.pushNotifications({
            type: "success",
            message: "Пользователь удален",
          });
          this.users = this.users.filter((item) => {
            return item.id != this.activeItem.id;
          });
          this.closeDeleteDialog();
        })
        .catch((error) => {
          this.pushNotifications({
            type: "error",
            message: "Не удалось удалить пользователя",
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