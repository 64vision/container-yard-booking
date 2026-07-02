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
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              subtitle="Have a good day!"
              :title="'Welcome ' + account.username"
            ></v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"  @click="goToPage('/')"></v-list-item>
            <!-- <v-list-item prepend-icon="mdi-flag-checkered" title="Live Bets" value="Livebets" @click="goToPage('/livebets')"></v-list-item> -->
            <v-list-item prepend-icon="mdi-account-multiple" title="Accounts" value="accounts" @click="goToPage('/accounts')"></v-list-item>
            <!-- <v-list-item prepend-icon="mdi-cogs" title="Settings" value="settings"  @click="goToPage('/settings')"></v-list-item>
            <v-list-item prepend-icon="mdi-account-supervisor-circle" title="Admin Users" value="Admin Users" @click="goToPage('/users')"></v-list-item> -->
          </v-list>
          <v-divider></v-divider>
          <v-list density="compact" nav>
            <!-- <v-list-item prepend-icon="mdi-file-document-multiple" title="Settlements" value="Settlements" @click="goToPage('/settlements')"></v-list-item> -->
            <v-list-item prepend-icon="mdi-database-arrow-up" title="Buy Credits" value="Buy Credits" @click="goToPage('/buycredits')"></v-list-item>
            <!-- <v-list-item prepend-icon="mdi-wallet" title="Cashouts" value="Cashout Credits" @click="goToPage('/cashouts')"></v-list-item> -->
          </v-list>
          <v-divider></v-divider>
        
          <v-list density="compact" nav>
             <v-list-item prepend-icon="mdi-calendar-clock" title="Slots" value="accounts" @click="goToPage('/slots')"></v-list-item>
             <v-list-item prepend-icon="mdi-account-supervisor-circle" title="Operators" value="accounts" @click="goToPage('/operators')"></v-list-item>
            <v-list-item prepend-icon="mdi-train-car-container" title="Yards" value="Yards" @click="goToPage('/yards')"></v-list-item>
            <v-list-item prepend-icon="mdi-ferry" title="Shipping Lines" value="Shipping Lines" @click="goToPage('/shippings')"></v-list-item>
             <v-list-item prepend-icon="mdi-cogs" title="Settings" value="settings"  @click="goToPage('/settings')"></v-list-item>
              <v-list-item prepend-icon="mdi-chart-box-multiple-outline" title="Reports" value="Reports" @click="goToPage('/reports')"></v-list-item>
              <!-- <v-list-item prepend-icon="mdi-chart-pie" title="Analytics" value="Analytics" @click="goToPage('/analytics')"></v-list-item> -->
          </v-list>
          <v-list>
        
          </v-list>
     
        </v-navigation-drawer>
      </div>
  </template>
  
<script>
import {
  mapMutations
} from 'vuex'
import api from '@/plugins/axios.js'
import { md5 } from 'js-md5';
  export default {
    data: () => ({
      account:{}
    }),
    created(){
      this.account= JSON.parse(sessionStorage.account)
      console.log(this.account)
    },
    computed: {
 
    },
    methods:{
   
      goToPage(page) {
        this.$router.push(page)
      }
    }
  }
</script>