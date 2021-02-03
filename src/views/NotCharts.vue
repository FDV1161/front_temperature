<template>
  <v-conteiner class="NotCharts">
    <v-row class="pa-10">
        
      <v-col class="col-4" v-for="n in 2">
        <v-card color="#385F73" dark class="block_height">
          <v-container>
            <v-row>
              <v-col class="col-8">
                <v-card-title class="headline">
                  Sensor one
                </v-card-title>

                <v-card-subtitle class="description_height"  v-if="n == 1">
                  Listen to your favorite artists and albums whenever and
                  wherever, online and offline.                  
                </v-card-subtitle>

                <v-card-subtitle class="description_height" v-else>
                    <br><br>
                    </v-card-subtitle>

                <v-card-actions>
                  <v-btn text> Details </v-btn>
                </v-card-actions>
              </v-col>
              <v-col class="col-4 d-flex justify-start">
                <v-divider vertical></v-divider>

                <div class="flex-grow-1 d-flex flex-column justify-center">
                  <v-card-text class="display-2 text-center pa-0">
                    <v-badge color="">
                      1021
                      <template v-slot:badge> &deg;C </template>
                    </v-badge>
                  </v-card-text>
                </div>

                <!-- <v-container>
                    <v-row>
                        <v-col>                            
                            <v-card-text class="display-2 text-center pa-0">                                
                                <v-badge color="">
                                    10216
                                    <template v-slot:badge>
                                        &deg;C                                        
                                    </template>
                                    
                                </v-badge>
                                
                            </v-card-text>
                            
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col><v-card-text class="display-2 text-center pa-0"> &deg;C </v-card-text></v-col>
                    </v-row>
                </v-container> -->

                <!-- class="col-4 d-flex align-center flex-column justify-center" -->
                <!-- <div class="flex-grow-1 d-flex flex-column justify-center">
                <v-card-text class="display-2 text-center pa-0">
                  156
                   &deg;C
                </v-card-text>
                <v-card-text class="display-2 text-center pa-0">
                  
                </v-card-text> -->
                <!-- </div> -->
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>


      
    </v-row>
  </v-conteiner>
</template>

<script>
</script>

<style scoped>

.block_height {
    height: 185px;
}

.description_height {
    height: 44px;
}

</style>