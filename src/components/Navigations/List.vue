<template>
  <v-list>
    <v-list-item-group>
      <v-list-item v-for="(item, i) in items.level_0" :key="i" @click="$router.replace({name: item.route})">
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
        <v-list-item v-for="(item, i) in items.level_1" :key="i" router :to='item.route'>
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
        { text: "Главная", icon: "mdi-home", route: "home"},
        { text: "Аудитории", icon: "mdi-door-open", route: "rooms"},
      ],
      level_1: [
        { text: "Функции", icon: "mdi-tune-variant", route: "functions" },
        { text: "Группы", icon: "mdi-account-multiple", route: "user-groups" },
        { text: "Пользователи", icon: "mdi-account-edit", route: "users" },
      ],
    },
  }),
};
</script>