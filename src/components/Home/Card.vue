<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :elevation="hover ? 16 : 1"
      max-width="344"
      outlined
      @click="$router.push({ name: 'room-details', params: { id: data.id } })"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            {{ data.name }}
          </div>
          <v-card-text>
            <div class="container-fluid">
            <v-row align="center" >
              <v-col class="title text-no-wrap" cols="4"> 23&deg;C </v-col>
              <v-col class="title text-no-wrap" cols="4"> 23&deg;C </v-col>
              <v-col class="title text-no-wrap" cols="4"> 23&deg;C </v-col>
            </v-row>
            </div>
             <!-- <div class="d-flex justify-space-around flex-wrap" >
              <div class="title text-no-wrap" > 123.2&deg;C </div>
              <div class="title text-no-wrap" > 123.2&deg;C </div>
              <div class="title text-no-wrap" > 123.2&deg;C </div>
            </div> -->           
             
              <!-- <div class="d-flex justify-space-between">
                <div class="subtitle-2">Температура:</div>
                <div >123.2&deg;C</div>                     
              </div>
              <div class="d-flex justify-space-between">
                <div class="subtitle-2">Температура:</div>
                <div >123.2&deg;C</div>                     
              </div>
              <div class="d-flex justify-space-between">
                <div class="subtitle-2">Температура:</div>
                <div >123.2&deg;C</div>                     
              </div> -->
              
             
         
          </v-card-text>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-hover>
</template>


<script>
export default {
  props: ["data"],
};
</script>

