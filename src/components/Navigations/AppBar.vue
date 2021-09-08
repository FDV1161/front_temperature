<template>
  <v-app-bar app dense clipped-left color="secondary">
    <v-toolbar dense flat color="secondary">
      <v-app-bar-nav-icon
        v-if="isAuth"
        tile
        @click.stop="drawer.side_bar = !drawer.side_bar"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span>Цифровая лаборатория</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items v-if="isAuth" class="d-none d-sm-flex">
        <v-menu offset-y rounded="0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-avatar>
                <v-icon>mdi-account</v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon> mdi-account-circle-outline </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ user.login }}
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
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
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </v-app-bar>
</template>


<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["color", "drawer"],

  computed: {
    ...mapGetters({
      user: "user/getUser",
      isAuth: "user/isAuth",
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