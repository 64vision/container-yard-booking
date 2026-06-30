<template>
     <v-app-bar color="white" app elevation="1" >
       <v-img
          src="@/assets/logo.png"
          alt="Zera Yard Booking"
          max-width="70"
          class="ma-2"
        ></v-img>
       
        <v-toolbar-title><span class="font-weight-thin"></span></v-toolbar-title>

        <v-spacer></v-spacer>

       
                             <v-menu location="end" color="success">
                                        <template v-slot:activator="{ props }">
                                          <v-btn icon="mdi-menu" v-bind="props"></v-btn>
                                        </template>
                                        <div class="bs-menu">
                                        <v-btn block  variant="text" @click="goToPage('/')" >Main</v-btn>
                                        <v-btn block  variant="text" @click="goToPage('/accounts')">Community</v-btn>
                                        <v-btn block  variant="text" @click="goToPage('/accounts')">Performance</v-btn>
                                        <v-btn block  variant="text" @click="goToPage('/settlements')">Earnings</v-btn>
                                        <v-btn block  variant="text" @click="goToPage('/profile')">Transactions</v-btn>
                                        <v-btn block  variant="text" @click="goToPage('/profile')">Profile</v-btn>
                                        <div class="text-center ma-2"><v-btn  color="error" size="small" rounded  @click="confirm=true">Logout</v-btn></div>
                                        </div> 
                                    </v-menu>
      </v-app-bar>
       <ConfirmDialog :show="confirm" message="Would you like to Logout?" cancelbtn="Not Now" okbtn="Logout" @ConfirmEvent="dEv"/>
</template>

<script>
import {
  mapMutations
} from 'vuex'

  export default {
    data: () => ({
      confirm: false,
      account:{}
    }),
    created(){
      this.account= JSON.parse(sessionStorage.account)
      console.log(this.account)
    },
    computed: {
 
    },
    methods:{
      ...mapMutations(['setLoggedIn', 'setSalesSummaries', 'setWinSummaries']), 
      dEv(e){
        this.confirm = false
        if(e == "ok") {
          this.setLoggedIn(false)
            sessionStorage.removeItem('account')
          sessionStorage.removeItem('token')
          this.$router.push('/login')
        }
        
      },
      goToPage(page) {
        this.$router.push(page)
      }
    }
  }
</script>