<template>
  <v-list>
    <v-list-group no-action color="" class="d-sm-none">
      <template v-slot:activator>
        <v-list-item-icon>
          <v-icon> mdi-account-circle-outline </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ user.login }}</v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item-group>
        <!-- <v-list-item>
          <v-list-item-title>Личный кабинет</v-list-item-title>
          <v-list-item-icon>
            <v-icon> mdi-card-account-details-outline </v-icon>
          </v-list-item-icon>
        </v-list-item> -->
        <v-list-item @click="logout">
          <v-list-item-title> Выйти </v-list-item-title>
          <v-list-item-icon>
            <v-icon> mdi-login-variant</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list-group>

    <v-divider class="d-sm-none mb-2"></v-divider>
    <!-- v-if="!('rights' in item) || user.group.id in item.rights" -->
    <v-list-item-group>
      <v-list-item
        v-for="(item, i) in items.level_0"
        :key="i"
        :to="item.route"
        exact
        replace
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list-item-group>

    <v-list-group
      no-action
      color=""
      v-if="[EDITOR, ADMIN].includes(user.group.id)"
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>Администрирование</v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in items.level_1"
          v-if="!('rights' in item) || item.rights.includes(user.group.id)"
          :key="i"
          router
          :to="item.route"
        >
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
import { mapActions, mapGetters } from "vuex";
import { ADMIN, VIEWER, EDITOR } from "../../settings";

export default {
  data: () => ({
    selectedItem: 1,
    items: {
      level_0: [
        { text: "Главная", icon: "mdi-home", route: "/" },
        { text: "Аудитории", icon: "mdi-door-open", route: "/rooms" },
      ],
      level_1: [
        { text: "Функции", icon: "mdi-tune-variant", route: "/functions" },
        {
          text: "Пользователи",
          icon: "mdi-account-edit",
          route: "/users",
          rights: [ADMIN],
        },
      ],
    },
    ADMIN: ADMIN,
    VIEWER: VIEWER,
    EDITOR: EDITOR,
  }),

  computed: {
    ...mapGetters({
      user: "user/getUser",
    }),
  },

  methods: {
    ...mapActions({
      signOut: "user/signOut",
    }),
    logout() {
      this.signOut();
    },
  },
};
</script>