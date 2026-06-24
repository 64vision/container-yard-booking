<template>
     <v-app-bar color="white" density="compact">
        <template v-slot:prepend>
            <v-avatar  @click="goToPage('/')">
      <v-img
        src="@/assets/hyperball.png"
      ></v-img>
    </v-avatar>
  </template>
       
        <v-toolbar-title><span class="font-weight-thin">My Blazing Sphere</span></v-toolbar-title>

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