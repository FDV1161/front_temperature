<template>
  <v-hover v-slot="{ hover }">
    <!-- max-width="344" -->
    <v-card
        :elevation="hover ? 16 : 1"
        outlined
        @click="$router.push({ name: 'room-details', params: { id: room.id } })"
        color="secondary"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="h6 font-weight-bold text-capitalize">
            {{ room.name }}
          </div>
          <v-card-text>
            <v-row>
              <v-col class="d-flex flex-row justify-center flex-wrap">
                <v-card
                    elevation="3"
                    width="40"
                    height="40"
                    v-for="reading in room.currentReadings"
                    v-if="reading.minValue === 0 && reading.maxValue === 1"
                    :key="reading.id"
                    class="mx-1 mb-2"
                >
                  <v-avatar size="40" rounded color="grey lighten-1">
                    <img :src="to_image(reading.icon) " class="size-images"/>
                  </v-avatar>

                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex flex-row justify-center flex-wrap">
                <v-card
                    elevation="3"
                    width="40"
                    height="40"
                    v-for="reading in room.currentReadings"
                    v-if="!(reading.minValue === 0 && reading.maxValue === 1)"
                    :key="reading.id"
                    class="mx-1 mb-2"
                >
                  <v-avatar
                      size="40"
                      rounded
                      color="grey lighten-1 d-flex flex-column"
                  >
                    <div>{{reading.curVal}}</div>
                    <div>{{ reading.measureSymbol }}</div>
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
  props: ["room"],

  methods: {
    to_image(icon) {
      return icon ? this.$settings.baseIconURL + icon : require("../../assets/contactless-payment-circle-outline.png")
    }
  }
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