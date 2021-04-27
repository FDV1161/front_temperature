<template>
  <v-list>
    <v-list-item-group>
      <v-list-item v-for="(item, i) in items.level_0" :key="i">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list-item-group>

    <v-list-group no-action color="">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>Администрирование</v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item-group>
        <v-list-item v-for="(item, i) in items.level_1" :key="i">
          <v-list-item-title>{{ item.text }}</v-list-item-title>
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: {
      level_0: [
        { text: "Главная", icon: "mdi-home" },
        { text: "Аудитории", icon: "mdi-door-open" },
      ],
      level_1: [
        { text: "Функции", icon: "mdi-tune-variant" },
        { text: "Группы", icon: "mdi-account-multiple" },
        { text: "Пользователи", icon: "mdi-account-edit" },
      ],
    },
  }),
};
</script>