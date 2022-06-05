<template>
  <v-row>
    <v-col class="d-flex justify-space-between align-baseline">
      <v-toolbar-title class="capitalize-first name">{{
        name
      }}</v-toolbar-title>
      <div>
        <v-btn text tile @click="$router.go(-1)">Назад</v-btn>
        <v-btn
          class="ml-2"
          color="primary"
          tile
          @click="$emit('onSaveBtnClick')"
          :disabled="!saveBtnValid"
          v-if="showSaveBtn"
        >
          <v-icon left> mdi-content-save</v-icon>
          Сохранить
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    name: { type: String },
    showSaveBtn: { default: false },
    saveBtnValid: { default: false },
  },
};
</script>

<style scoped>
.name {
  font-size: 26px;
}
.capitalize-first::first-letter {
  text-transform: capitalize;
}
/* .indent {
  margin-right: -12px;
} */
</style>
