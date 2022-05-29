<template>
  <v-row>
    <v-col class="d-flex justify-space-between align-baseline">
      <v-toolbar-title class="capitalize-first name">{{ name }}</v-toolbar-title>
      <v-btn class="indent" text tile @click="$router.go(-1)">Назад</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["name"],
};
</script>

<style scoped>
.name {
  font-size: 26px;
}
.capitalize-first::first-letter {
  text-transform:capitalize;
}
.indent {
  margin-right: -12px;
}
</style>

