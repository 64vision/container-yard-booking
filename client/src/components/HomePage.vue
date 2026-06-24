<template>
  <div>
    <v-app-bar elevation="0" title="BLAZING SPHERE"> 
      <template v-slot:prepend>
            <v-avatar  @click="goToPage('/')">
      <v-img
        src="@/assets/hyperball.png"
      ></v-img>
      
    </v-avatar>
  </template>
  <v-btn color="info">LOGIN</v-btn>
  
    </v-app-bar>
    <div class="hero">
      <v-container>
         <v-row no-gutters=""> 
            <v-col cols="12" sm="12">
              <div class="mt-12">
                <p class="text-h5 font-weight-thin text-center">WELCOM to BLAZING SPHERE</p>
                <div class="text-h2 font-weight-black text-center">
                    PLAY AND EARN
                </div>
              </div>
              <p class="text-h5 font-weight-thin text-center">PLATFORM</p>
              <p class="text-center mt-8">
                <v-btn color="info" size="x-large"><v-icon color="white">mdi-chevron-right</v-icon><span>LOGIN</span></v-btn>
               </p> 
                 <p class="text-center mt-4 mb-4 font-weight-thin">- OR - </p>
               <p class="text-center">
                <v-btn size="x-large" color="warning"><v-icon color="white">mdi-chevron-right</v-icon><span>CREATE ACCOUNT</span></v-btn>
               </p> 
            </v-col>
            <v-col cols="12" sm="12">
              <div class="text-h2 font-weight-bold">

              </div>
            </v-col>
              
         </v-row>
      </v-container>

    </div>
  </div>
</template>

<script setup>
  //
</script>
