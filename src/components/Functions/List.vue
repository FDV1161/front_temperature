<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex align-center field-hader">
        <span>Подключенные функции</span>
        <v-spacer></v-spacer>
        <v-btn
            icon
            tile
            min-height="48"
            min-width="48"
            @click="createNewItem"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
            :headers="headers"
            :items="deviceFunctions"
            :search="search"
            hide-default-footer
            mobile-breakpoint="0"
        >
          <template v-slot:item.actions="{ item }">
            <div class="d-flex">
              <v-btn icon small>
                <v-icon small @click="choiceEditItem(item)"> mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon small @click="choiceDeleteItem(item)">
                <v-icon small> mdi-delete</v-icon>
              </v-btn>
            </div>
          </template>

          <template v-slot:item.onHome="{ item }">
            <v-checkbox v-model="item.onHome" readonly></v-checkbox>
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
        @close="dialogs.delete = false"
        @ok="deleteItem"
    />
    <create-device-function-dialog
        :dialog="dialogs.createDeviceFunction"
        :deviceId="deviceId"
        @close="dialogs.createDeviceFunction = false;"
        @save="createDeviceFunctionDialogSave"
    />
    <edit-device-function-dialog
        :deviceFunction="activeItem"
        :dialog="dialogs.editDeviceFunction"
        @close="dialogs.editDeviceFunction = false;"
        @save="editDeviceFunctionDialogSave"
    />
  </v-container>
</template>


<script>
import DeleteDialog from "../../components/Base/DeleteDialog.vue";
import CreateDeviceFunctionDialog from "../../components/Functions/Create"
import EditDeviceFunctionDialog from "../../components/Functions/Edit"
import {console_print_error} from "../../utils";
import {mapActions} from "vuex";

export default {
  props: ["deviceFunctions", "deviceId"],
  components: {
    DeleteDialog,
    CreateDeviceFunctionDialog,
    EditDeviceFunctionDialog,
  },

  data: () => ({
    activeItem: {
      address: null,
      onHome: false,
      func: {
        id: null,
        name: "",
      }
    },
    defaulItem: {
      address: null,
      onHome: false,
      func: {
        id: null,
        name: "",
      }
    },
    search: "",
    dialogs: {
      delete: false,
      editDeviceFunction: false,
      createDeviceFunction: false,
    },
    headers: [
      {
        text: "№",
        align: "start",
        value: "id",
        width: "100px",
      },
      {
        text: "Название функции",
        align: "start",
        value: "func.name",
      },
      {
        text: "Адрес",
        align: "start",
        value: "address",
      },
      {
        text: "Показывать на главном экране",
        align: "start",
        value: "onHome",
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
        return String(this.activeItem.id);
      }
      return "";
    },
  },

  methods: {
    ...mapActions({
      pushNotifications: "notifications/push_notifications",
    }),
    createNewItem() {
      this.dialogs.createDeviceFunction = true;
      // this.activeItem = Object.assign({}, this.defaulItem);
      this.activeItem = JSON.parse(JSON.stringify(this.defaulItem));
    },
    choiceDeleteItem(item) {
      this.activeItem = item;
      this.dialogs.delete = true;
    },
    choiceEditItem(item) {
      this.activeItem = item;
      this.dialogs.editDeviceFunction = true;
    },
    deleteItem() {
      this.$api.deviceFunctions
          .delete(this.activeItem.id)
          .then(response => {
            this.dialogs.delete = false;
            this.pushNotifications({
              type: "success",
              message: "Функция удалена",
            });
            this.$emit("delete", this.activeItem);
          })
          .catch((error) => {
            this.pushNotifications({
              type: "error",
              message: "Не удалось удалить функцию",
            });
            console_print_error(error);
          });
    },
    createDeviceFunctionDialogSave(item) {
      this.dialogs.createDeviceFunction = false;
      this.$emit("save", item)
    },
    editDeviceFunctionDialogSave(item) {
      this.dialogs.editDeviceFunction = false;
      this.$emit("update", item);
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