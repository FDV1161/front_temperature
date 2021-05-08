<template>
  <div>     
    <v-data-table 
      :headers="headers" 
      :items="sensorsDataTable" 
      :search="search"      
      hide-default-footer
      >      
      <template v-slot:no-data>
        <div>Список датчиков пуст</div>
      </template>
    </v-data-table>
  </div>
</template>



<script>
export default {
  props: ["sensors", "dialog"],
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
  methods:{
    clickAdd(){
      this.$emit("clickAdd");
    }
  }
};
</script>

<style scoped>
.table-link {
  color: black;
  text-decoration: none;
}
</style>