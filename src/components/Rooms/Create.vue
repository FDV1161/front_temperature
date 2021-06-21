<template>
  <base-dialog
    :dialog="dialog"
    :valid="valid"
    @close="close"
    @save="save"
    title="Создание аудитории"
  >
    <v-form ref="roomCreateForm" v-model="valid">
      <v-container fluid>
        <v-row>
          <v-col>
            <v-text-field
              v-model.trim="name"
              :rules="[(v) => !!v || 'Обязательное поле']"
              required
            >
              <template #label>
                <span class="red--text"><strong>* </strong></span>Название
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Описание" v-model="description"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </base-dialog>
</template>


<script>
import api from "@/api/index";
import BaseDialog from "@/components/Base/Dialog.vue";
import { console_print_error } from "@/utils/index";

export default {
  props: ["dialog"],
  components: {
    BaseDialog,
  },
  data() {
    return {
      valid: false,

      name: "",
      description: "",
    };
  },
  methods: {
    close() {
      this.$emit("close", true);
    },
    save() {
      api.rooms
        .createRoom({
          name: this.name,
          description: this.description,
        })
        .then((responce) => {
          this.$refs.roomCreateForm.reset();
          this.$emit("save", responce.data);
        })
        .catch((error) => {
          console_print_error(error);          
        });
    },
  },
};
</script>


<style scoped>
.field-header {
  height: 90px;
}
</style>