<template>
  <v-row>
    <v-col class="d-flex justify-space-between align-baseline">
      <v-toolbar-title>{{ name }}</v-toolbar-title>
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
.indent {
  margin-right: -12px;
}
</style>

