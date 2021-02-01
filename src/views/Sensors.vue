<template>
  <v-conteiner class="sensors">
    <v-row class="px-10 pt-5">
      <v-col color="green">
        <div>
          <!-- <h2></h2> -->
          <div text class="d-flex">
            <v-icon left>mdi-thermometer-lines</v-icon>
            <span class="text-capitalize"> <h2>Sensors</h2> </span>
          </div>

          <v-breadcrumbs :items="breadcrumbs" class="pa-0"> </v-breadcrumbs>
        </div>
      </v-col>
    </v-row>
    <v-row class="px-2">
      <v-col><hr /></v-col>
    </v-row>
    <!-- <v-divider></v-divider> -->

    <v-row class="pt-5">
      <v-col>
        <v-containter>
          <v-row>
            <v-col>
              <v-containter>
                <v-row align="center">
                  <v-col class="text-center"
                    ><h4 class="text-h5">Current readings:</h4></v-col
                  >
                  <v-col class="text-center"
                    ><div class="text-h4">120%</div></v-col
                  >
                </v-row>
              </v-containter>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <MainContent />
            </v-col>
          </v-row>
        </v-containter>
      </v-col>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="All"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-conteiner>
  <!-- <v-avatar color="grey lighten-2" size="80" </v-avatar> -->
</template>

<script>
import MainContent from "@/components/SensorChart.vue";
export default {
  components: {
    MainContent,
  },

  data: () => ({
    breadcrumbs: [
      {
        text: "Main",
        disabled: false,
        href: "/",
      },
      {
        text: "Sensors",
        disabled: true,
        href: "Sensors",
      },
    ],
    headers: [
      {
        text: "Date",
        align: "start",
        sortable: false,
        value: "date",
      },
      { text: "Value", value: "value" },
    ],
    desserts: [
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 159,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 237,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 262,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 305,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 356,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 375,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 392,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 408,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 452,
      },
      {
        date: "Mon Feb 01 2021 15:24:22",
        value: 518,
      },
    ],
  }),
};
</script>

<style scoped>
.my_color {
  /* background: green; */
}
</style>