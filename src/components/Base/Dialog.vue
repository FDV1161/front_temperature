<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar light dense color="secondary">
        <v-btn icon  @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="save" :disabled="!valid">
            Сохранить
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <slot>

      </slot>
    </v-card>
  </v-dialog>
</template>



<script>
export default {
  props: ["dialog", "valid"],  
  methods: {
    close() {
      this.$emit("close");
    },
    save(){
      this.$emit("save");
    }
  },
};
</script>

<style scoped>
</style>