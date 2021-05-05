<template>
  <BaseDialog :dialog="dialog" :valid="valid" @close="close" @save="save">
    <v-form ref="deviceCreateForm" v-model="valid">
      <v-container fluid>
        <v-row>
          <v-col>
            <v-text-field
              v-model="name"
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
            <v-text-field
              v-model="address"
              :rules="[(v) => !!v || 'Обязательное поле']"
              required
            >
              <template #label>
                <span class="red--text"><strong>* </strong></span>Адрес
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
  </BaseDialog>
</template>


<script>
import api from "@/api/index";
import BaseDialog from "@/components/Base/Dialog.vue";

export default {
  props: ["dialog"],
  components: {
    BaseDialog,
  },
  data() {
    return {
      valid: false,
      name: null,
      description: null,
      address: null,
    };
  },
  mounted() {},
  methods: {
    close() {
      this.$refs.deviceCreateForm.reset();
      this.$emit("close", true);
    },
    save() {
      api.rooms
        .createDevice({
          name: this.name,
          description: this.description,
          address: this.address,
        })
        .then((responce) => {
          this.$refs.deviceCreateForm.reset();
          this.$emit("save", responce.data);
        })
        .catch((err) => {
          alert(err.response.data);
          if (error.response) {
            alert(error.response.data);
          } else if (error.request) {
            alert(error.request);
          } else {
            alert("Error", error.message);
          }
        });
    },
  },
};
</script>


<style scoped>
</style>
