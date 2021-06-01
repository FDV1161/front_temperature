<template>
  <base-dialog
    :dialog="dialog"
    :valid="valid"
    @close="close"
    @save="save"
    title="Добавление датчика"
    saveTitle="Добавить"
  >
    <v-form ref="deviceFunctionEditForm" v-model="valid">
      <v-container fluid>
        <input-field v-model="editDeviceFunction.address" label="Адрес" required />

        <v-row>
          <v-col cols="8" class="d-flex align-center">
            <span>Показывать на главном экране</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4" class="d-flex justify-end">
            <v-switch v-model="editDeviceFunction.onHome"></v-switch>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="d-flex">
              <v-select
                :items="functions"
                menu-props="auto"
                label="Функция"
                item-value="id"
                item-text="name"
                v-model="editDeviceFunction.func.id"
                clearable                
                class="required"
                :rules="[(value) => !!value || 'Обязательное поле']"
              ></v-select>
            </div>
          </v-col>
        </v-row>                
      </v-container>
    </v-form>
  </base-dialog>
</template>


<script>
import BaseDialog from "@/components/Base/Dialog.vue";
import InputField from "@/components/Base/Fields/InputField.vue";
import { console_print_error } from "@/utils/index";
import { mapActions } from "vuex";

export default {
  props: {
    deviceFunction: {
      default: {
        address: "",
        onHome: false,
        func: {
          id: null,
          name: "",
        },
      },
    },
    dialog: Boolean,
  },
  //   ["deviceFunction", "dialog"],
  components: {
    BaseDialog,
    InputField,
  },

  data() {
    return {
      valid: false,
      functions: [],
      editDeviceFunction: {
        address: "",
        onHome: false,
        func: {
          id: null,
          name: "",
        },
      }
    };
  },

  watch: {
    // "deviceFunction": function (new_val) {        
    //   this.editDeviceFunction = Object.assign({}, new_val);
    // },
    "dialog": function (new_val) {        
      const editDeviceFunction = JSON.parse(JSON.stringify(this.deviceFunction));    
      this.editDeviceFunction = Object.assign({}, editDeviceFunction);
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
    close() {      
      this.$emit("close");
      this.$refs.deviceFunctionEditForm.reset();
    },
    get_function_name(){
      const func = this.functions.filter(f => {
        return f.id == this.deviceFunction.func.id;
      })[0]
      if (func != null){
        return func.name;
      }
      return "";
    },
    copy_values(){     
      const editDeviceFunction = JSON.parse(JSON.stringify(this.editDeviceFunction));    
      Object.assign(this.deviceFunction, editDeviceFunction)
    },
    save() {
      console.log(this.deviceFunction);
      // this.$emit("save", { ...this.deviceFunction });
      this.copy_values();
      this.deviceFunction.func.name = this.get_function_name();
      this.$emit("save", this.deviceFunction);      
      this.$refs.deviceFunctionEditForm.reset();
    },
  },
};
</script>


<style scoped>
.field-hader {
  height: 90px;
}

</style>