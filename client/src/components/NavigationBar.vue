<template>
<div id="navbar-hbr">
        <v-navigation-drawer
          expand-on-hover
           image="@/assets/bgnav.png"
           permanent
           rail
            theme="dark"
        >
          <v-list class="nav-list-text">
            <v-list-item
              prepend-avatar="@/assets/hyperball.png"
              subtitle="Have a good day!"
              :title="'Welcome ' + account.first_name"
            ></v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"  @click="goToPage('/')"></v-list-item>
            <v-list-item prepend-icon="mdi-sitemap-outline" title="Players Network" value="accounts" @click="goToPage('/accounts')"></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-file-document-multiple" title="Settlements" value="Settlements" @click="goToPage('/settlements')"></v-list-item>
            <v-list-item prepend-icon="mdi-database-arrow-up" title="Credits" value="Credits" @click="goToPage('/credits')"></v-list-item>
            <v-list-item prepend-icon="mdi-account-circle" title="Profile" value="Profile" @click="goToPage('/profile')"></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-logout" title="Logout" value="Logout" @click="confirm=true" class="text-error"></v-list-item>
          </v-list>
  
     
        </v-navigation-drawer>
        <ConfirmDialog :show="confirm" message="Would you like to Logout?" cancelbtn="Not Now" okbtn="Logout" @ConfirmEvent="dEv"/>
      </div>
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