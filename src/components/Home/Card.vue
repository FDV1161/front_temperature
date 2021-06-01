<template>
  <v-hover v-slot="{ hover }">
    <!-- max-width="344" -->
    <v-card
      :elevation="hover ? 16 : 1"
      outlined
      @click="$router.push({ name: 'room-details', params: { id: data.id } })"
      color="secondary"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="h6 font-weight-bold text-capitalize">
            {{ data.name }}
          </div>
          <v-card-text>
            <v-row>
              <v-col class="d-flex flex-row justify-center flex-wrap">
                <v-card
                  elevation="3"
                  width="40"
                  height="40"
                  v-for="df in deviceFunctions"
                  v-if="df.type"
                  :key="df.id"
                  class="mx-1 mb-2"
                >
                  <v-avatar size="40" rounded color="grey lighten-1">
                    <img :src="df.icon" class="size-images" />
                  </v-avatar>

                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col  class="d-flex flex-row justify-center flex-wrap">
                <v-card
                  elevation="3"
                  width="40"
                  height="40"
                  v-for="df in deviceFunctions"
                  v-if="!df.type"
                  :key="df.id"
                  class="mx-1 mb-2"
                >
                  <v-avatar
                    size="40"
                    rounded
                    color="grey lighten-1 d-flex flex-column"
                  >
                    <div>20.2</div>
                    <div>{{ df.measureSymbol }}</div>
                  </v-avatar>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-hover>
</template>


<script>
export default {
  props: ["data"],
  computed: {
    deviceFunctions() {
      var deviceFunctions = [];
      this.data.devices.forEach((device) => {
        device.deviceFunctions.forEach((df) => {
          if (df.onHome) {
            deviceFunctions.push({
              id: df.id,
              icon: device.icon
                ? "http://127.0.0.1:5000/static/" + device.icon
                : require("@/assets/contactless-payment-circle-outline.png"),
              measureSymbol: df.func.measureSymbol,
              type: Math.random() < 0.8,
            });
          }
        });
      });
      // data.devices[0].icon
      // data.devices[0].deviceFunctions[0].onHome
      return deviceFunctions;
    },
  },
};
</script>

<style scoped>
.size-images {
  width: 30px;
  height: 30px;
  max-height: 30px;
  max-width: 30px;
}
</style>