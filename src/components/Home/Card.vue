<template>
  <v-card
    class="mx-auto"
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
          <v-row align="center">
            <v-col class="title" cols="4"> 23&deg;C </v-col>            
            <v-col class="title" cols="4"> 23&deg;C </v-col>
            <v-col class="title" cols="4"> 23&deg;C </v-col>
          </v-row>
        </v-card-text>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>


<script>
export default {
  props: ["data"],
};
</script>
