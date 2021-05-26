<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="headline subtitle-1">
        Вы уверены, что хотите удалить этот элемент?
      </v-card-title>
      <v-card-actions class="justify-center font-weight-bold h5">
        {{ name }}
      </v-card-actions>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Отмена</v-btn>
        <v-btn color="primary" @click="ok">Удалить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>



<script>
export default {
  props: {
    dialog: Boolean,
    name: String,
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
    ok() {
      this.$emit("ok");
    },
  },
};
</script>

<style scoped>
</style>