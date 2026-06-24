<template>
   <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="450"
    >
    <v-img
       
       height="100"
       src="@/assets/hyperball.png"
     />
     <p>
      <v-img
       height="70"
       src="@/assets/loading_me.gif"
     />
     </p>
    </v-responsive>
   </v-container> 
  

</template>

<script>
import {
  mapMutations
} from 'vuex'
import api from '@/plugins/axios.js'
import { md5 } from 'js-md5';
  export default {
    data: () => ({
    }),
    created(){
      setTimeout(()=>{
        if (!sessionStorage.account) {
       this.setLoggedIn(false)  // Set loggedIn to false when no account is found in sessionStorage
        this.$router.push('/home')
        } else {
          this.$router.push('/dashboard')
        }
      }, 1600)
   
    },
    methods:{
      ...mapMutations(['setLoggedIn']),
   
    }
  }
</script>
