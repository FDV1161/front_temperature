<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex align-center field-hader">
        <span>Список функций</span>
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
                <v-icon small @click="choiceEditItem(item)"> mdi-pencil </v-icon>
              </v-btn>
              <v-btn icon small @click="choiceDeleteItem(item)">
                <v-icon small> mdi-delete </v-icon>
              </v-btn>
            </div>
          </template>

          <template v-slot:item.onHome="{ item }">
            <v-checkbox v-model="item.onHome" readonly></v-checkbox>            
          </template>

          <template v-slot:no-data>
            <div>Список функций</div>
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
    <edit-function-dialog
      :deviceFunction="activeItem"
      :dialog="dialogs.editFunction"
      @close="dialogs.editFunction = false;"
      @save="editFunctioDialogSave"
    />
  </v-container>
</template>



<script>
import DeleteDialog from "@/components/Base/DeleteDialog.vue";
import EditFunctionDialog from "@/components/Functions/Create.vue";

export default {
  props: ["deviceFunctions"],
  components: {
    DeleteDialog,
    EditFunctionDialog,
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
      editFunction: false,
    },
    headers: [
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
        return this.activeItem.name;
      }
      return "";
    },
  },

  methods: {
    createNewItem(){
      this.dialogs.editFunction = true;
      // this.activeItem = Object.assign({}, this.defaulItem);
      this.activeItem = JSON.parse(JSON.stringify(this.defaulItem));
    },
    choiceDeleteItem(item) {
      this.activeItem = item;
      // this.activeItem = Object.assign({}, item);
      // TODO фу фу фу исправить
      // this.activeItem = JSON.parse(JSON.stringify(item));
      this.openDeleteDialog();
    },
    choiceEditItem(item){      
      this.activeItem = item;
      // this.activeItem = Object.assign({}, item);
      // TODO фу фу фу исправить
      // console.log(JSON.parse(JSON.stringify(item)));
      // this.activeItem = JSON.parse(JSON.stringify(item));
      this.dialogs.editFunction = true;
    },
    deleteItem(item) {
      this.closeDeleteDialog();
      this.$emit("delete", this.activeItem);
    },
    openDeleteDialog() {
      this.dialogs.delete = true;
    },
    closeDeleteDialog() {
      this.dialogs.delete = false;
    },    
    editFunctioDialogSave(item) {      
      this.dialogs.editFunction = false;      
      this.$emit("save", item);
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