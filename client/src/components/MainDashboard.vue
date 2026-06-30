<template>
     <v-container fluid>
       <v-row >
            <v-col cols="12" sm="12" md="12" lg="12">
              <div class="text-h4 font-weight-black text-center">
                  DASHBOARD
                </div>
           

          </v-col>
         
       </v-row>
      
 </v-container>
    
</template>
<script>
import api from '@/plugins/axios.js'
import {
  mapMutations
} from 'vuex'
  export default {
    data: () => ({
    _account:{},
    sales_summaries:[],
    win_summaries:[],
    viewChart: false,
    from_date:'',
    sales_performance:[],
    players:[],
    playersLocation: [],
    settlements:[],
    sales:[],
    today_data:{},
    transactions:[],
    to_date:''
    }),
    created: function () {
     console.log(sessionStorage.account)
     this.to_date = this.$moment().format('YYYY-MM-DD')
     this.from_date = this.$moment().format('YYYY-MM-DD')
      if (!sessionStorage.account) {
       this.setLoggedIn(false)  // Set loggedIn to false when no account is found in sessionStorage
        this.$router.push('/login')
     } else {
       this._account = JSON.parse(sessionStorage.account)
       this.setLoggedIn(true)  // Set loggedIn to true when an account is found in sessionStorage
       this._account = JSON.parse(sessionStorage.account)
       api.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.token
   
     }
  
    },
    computed: {
      
    },
    methods: {
      ...mapMutations(['setLoggedIn']), 
     

    }
    
  }
</script>
