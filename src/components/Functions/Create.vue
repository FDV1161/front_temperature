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
        <input-field v-model="deviceFunction.address" label="Адрес" required />

        <v-row>
          <v-col cols="8" class="d-flex align-center">
            <span>Показывать на главном экране</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4" class="d-flex justify-end">
            <v-switch v-model="deviceFunction.onHome"></v-switch>
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
                v-model="deviceFunction.func.id"
                clearable                
                class="required"
                :rules="[(value) => !!value || 'Обязательное поле']"
              ></v-select>
            </div>
          </v-col>
        </v-row>
        <v-row>
            <v-col>
                {{deviceFunction}}
            </v-col>
        </v-row>
        <v-expand-transition>
          <v-row v-show="deviceFunction.func.id">
            <v-container fluid class="mx-2 elevation-1"> </v-container>
          </v-row>
        </v-expand-transition>
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
        name: "",
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
    };
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
      // this.$refs.deviceFunctionEditForm.reset();
      this.$emit("close");
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
    save() {
      console.log(this.deviceFunction);
      // this.$emit("save", { ...this.deviceFunction });
      this.deviceFunction.func.name = this.get_function_name();
      this.$emit("save", this.deviceFunction);
    },
  },
};
</script>


<style scoped>
.field-hader {
  height: 90px;
}

</style>