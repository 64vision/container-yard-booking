<template>
<v-container fluid >
 
    <v-row>
      <v-col cols="12">


          <v-toolbar density="compact" color="white">
              <v-toolbar-title><v-icon size="small" class="mr-2">mdi-cogs</v-icon>Settings</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            
          <v-card tile width="900" style="margin: auto;">
           <v-card-title><v-icon>mdi-cogs</v-icon> Game Settings</v-card-title>
            <v-card-text>
          <table class="hpb-table hpb-table-border-bottom">
            <thead>
              <tr >
                <th class="text-left">Game</th>
                <th class="text-left">Win</th>
                <th class="text-left">Description</th>
                <th class="text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in games_settings" :key="item.id">
                <td class="pa-2">{{ item.game}}</td>
                <td class="pa-2">
                   {{Money(item.win)}}
                </td>
                <td class="pa-2">{{ item.description}}</td>
                <td class="pa-2 text-right">{{ item.status}}</td>
              </tr>
            </tbody>
          </table>
        </v-card-text>
        </v-card>
        <v-card tile width="900" style="margin: auto;">
           <v-card-title><v-icon>mdi-cogs</v-icon> System Settings</v-card-title>
            <v-card-text>
          <table class="hpb-table hpb-table-border-bottom">
            <thead>
              <tr >
                <th class="text-left">Name</th>
                <th class="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in sys_settings" :key="item.id">
                <td class="pa-2">{{ item.name}}</td>
                <td class="pa-2">{{ item.value}}</td>
              </tr>
            </tbody>
          </table>
        </v-card-text>
        </v-card>
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
      actform: false,
      acthistory: false,
      loading: false,
      valid: true,
      drawer: false,
      games_settings:[],
      sys_settings:[],
    }),
    created: function () {
     console.log(sessionStorage.account)
     
      if (!sessionStorage.account) {
       this.setLoggedIn(false)  // Set loggedIn to false when no account is found in sessionStorage
        this.$router.push('/login')
     } else {
       this.setLoggedIn(true)  // Set loggedIn to true when an account is found in sessionStorage
       this._account = JSON.parse(sessionStorage.account)
       api.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.token
       this.getItems()
     }
  
    },
    computed: {
   
    },
    methods: {
      ...mapMutations(['setLoggedIn']),
    
      
      getItems() {
        api.get('/settings/get',)
      .then(response => {
        if(response.status) {
          console.log(response.data)
            this.games_settings = response.data.games.settings
            this.sys_settings = response.data.sys.sys
        }
      })
      }
    }
    
  }
</script>
