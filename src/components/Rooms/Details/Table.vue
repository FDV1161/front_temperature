<template>
  <div class="">     
    <v-data-table :headers="headers" :items="sensorsDataTable" :search="search">
      <template v-slot:top>        
        <v-toolbar flat>          
          <v-spacer></v-spacer>
          <v-text-field            
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск"
            hide-details
            class="mr-5"
          ></v-text-field>
          <v-btn color="primary" v-bind="attrs" v-on="on"> Добавить </v-btn>          
        </v-toolbar>
      </template>
      
      <template v-slot:no-data>
        <div>Список датчиков пуст</div>
      </template>
    </v-data-table>
  </div>
</template>



<script>
export default {
  props: ["sensors"],
  data: () => ({    
    search: "",
    headers: [
      {
        text: "Название датчика",
        align: "start",
        value: "name",
      },
      {
        text: "Адрес",
        align: "start",
        value: "address",
      },
      {
        text: "Мера",
        align: "start",
        value: "measure",
      },      
      {
        text: "Тип датчика",
        align: "start",
        value: "type",
      },      
    ],
  }),
  computed: {
    sensorsDataTable () {
      return this.sensors.map(s => ({
        name: s.name,
        address: s.address,
        measure: `${s.measure.name} (${s.measure.symbol})`,
      }));
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