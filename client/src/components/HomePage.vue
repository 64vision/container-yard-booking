<template>
  <div>
    <PageHeader/>
    <div class="hero">
      <v-container>
         <v-row no-gutters=""> 
            <v-col cols="12" sm="12">
              <div class="mt-12">
                <p class="text-h5 font-weight-thin text-center">WELCOME to ZERA YARD BOOKING</p>
                <div class="text-h2 font-weight-black text-center">
                   BOOK NOW
                </div>
              </div>
              <p class="text-h5 font-weight-thin text-center"></p>
              <p class="text-center mt-8">
                <v-btn color="info" size="x-large" to="/login" ><v-icon color="white">mdi-chevron-right</v-icon><span>LOGIN</span></v-btn>
               </p> 
                 <p class="text-center mt-4 mb-4 font-weight-thin">- OR - </p>
               <p class="text-center">
                <v-btn size="x-large" color="warning" to="/register"><v-icon color="white">mdi-chevron-right</v-icon><span>Register</span></v-btn>
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
