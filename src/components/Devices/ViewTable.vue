<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="getData"
      :search="search"
      hide-default-footer
      mobile-breakpoint="0"
    >
      <template v-slot:item.name="{ item }">
        <router-link
          :to="{ name: 'devices', params: { id: item.device_id } }"
          class="table-link"
        >
          {{ item.name }}
        </router-link>
      </template>

      <!-- <template v-slot:item.value="{ item }">
        {{getReadingById(item.deviceFunctions_id)}}
      </template> -->

      <template v-slot:item.reading.updatedAt="{ item }">
        {{ dateFormat(item) }}
      </template>

      <template v-slot:no-data>
        <div>Список устройств пуст</div>
      </template>
    </v-data-table>   
  </div>
</template>



<script>
import { headers } from "@/components/Devices/data.js";
import { mapGetters } from 'vuex';
// import { store } from 'vuex';
import moment from "moment";

export default {
  props: ["devices"],
  data: () => ({
    search: "",
    headers: headers,
  }),
  computed: {   
    ...mapGetters({
      getReadingById: 'currentReadings/getReadingById',     
    }),
    getData(){      
      let new_devices = [];
      for (let i = 0; i < this.devices.length; i++) {
        const current_element = this.devices[i];        
        current_element.deviceFunctions.forEach(df => {
          let element = {};        
          element.device_id = current_element.id;
          element.name = current_element.name;
          element.func = df.func;
          element.reading = this.getReadingById(df.id);
          element.deviceFunctions_id = df.id;
          if(df.func != null){
            if (df.func.measureName != null){
              let symbol = df.func.measureSymbol ? ` (${df.func.measureSymbol})` : "";
              element.func_name = `${df.func.measureName}` + symbol;
            }            
          }
          new_devices.push(element);
        });        
      }
      return new_devices;
    }
  },
  methods: {
    dateFormat(item) {
      if (item.reading != null ){
        return moment(item.reading.updatedAt).format("MM.DD.YYYY hh:mm");
      }      
      return "";
    },
  },
};
</script>

<style scoped>
.table-link {
  color: black;
  text-decoration: none;
}
</style>