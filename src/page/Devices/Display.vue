<template>
  <v-container fluid>
    <v-row>
      <v-col class="px-0">
        <v-toolbar flat>
          <v-toolbar-title>Просмотр устройства</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" text tile @click="$router.go(-1)"> Назад </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <input-field v-model="device.name" label="Название" readonly />
    <input-field v-model="device.description" label="Описание" readonly />
    <v-data-table
      v-for="(item, key) in journalReadings"
      :key="key"
      :headers="headers"
      :items="item"
      :items-per-page="5"
      class="elevation-1"      
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1 font-weight-regular"> {{getName(key)}}</v-toolbar-title>          
        </v-toolbar>
      </template>

      <template v-slot:item.updatedAt="{ item }">
        {{ dateFormat(item) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import api from "@/api/index";
import InputField from "@/components/Base/Fields/InputField.vue";
import { mapActions } from "vuex";
import moment from "moment";

export default {
  components: {
    InputField,
  },

  data() {
    return {
      device: {
        roomId: null,
        name: "",
        description: "",
        address: null,
        controllerId: null,
        deviceFunctions: [],
      },
      journalReadings: {},
      headers: [
        { text: "Дата", value: "updatedAt" },
        { text: "Показания", value: "value" },
      ],
    };
  },

  created() {
    this.$api.devices.get(this.$route.params.id).then((responce) => {
      this.device = responce.data;
      this.device.deviceFunctions.forEach((element) => {
        this.$api.journalReadings.getAll(element.id).then((responce) => {
          if (responce.data.length != 0) {
            this.journalReadings = Object.assign(this.journalReadings, {
              [element.id]: responce.data,
            });
            this.$forceUpdate();
          }
        });
      });
    });
  },

  computed: {},

  methods: {
    getName(id)
    {        
        try {
            return this.device.deviceFunctions.find(e => e.id=id).func.name;
        } catch (err) {
            return ""
        }
    },
    dateFormat(item) {
      console.log(item);
      if (item != null) {
        return moment(item.updatedAt).format("MM.DD.YYYY hh:mm");
      }
      return "";
    },
  },
};
</script>

<style scoped>
.field-header {
  height: 90px;
}
</style>

