<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar light dense color="secondary">
        <v-toolbar-items>
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
        <template v-if="title">
          <v-spacer></v-spacer>
          <v-toolbar-title> {{ title }} </v-toolbar-title>
        </template>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="save" :disabled="!valid"> {{saveTitle}} </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <slot> </slot>
    </v-card>
  </v-dialog>
</template>



<script>
export default {
  props: {
    dialog: Boolean,
    valid: Boolean,
    title: {
      default: "",
      type: String,
    },
    saveTitle: {
      default: "Сохранить",
      type: String,
    }
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
    save() {
      this.$emit("save");
    },
  },
};
</script>

<style scoped>
</style>