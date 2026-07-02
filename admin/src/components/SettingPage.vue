<template>
<v-container fluid >
 
    <v-row>
      <v-col cols="12">


          <v-toolbar density="compact" color="white">
              <v-toolbar-title><v-icon size="small" class="mr-2">mdi-cogs</v-icon>Settings</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            
          <v-card tile width="900" style="margin: auto;">
           <v-card-title><v-icon>mdi-cogs</v-icon> Settings</v-card-title>
            <v-card-text>
          <table class="hpb-table hpb-table-border-bottom">
            <thead>
              <tr >
                <th class="text-left">Name</th>
                <th class="text-left">Value</th>
                <th class="text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in itemlist" :key="item.id">
                <td class="pa-2">{{ item.name}}</td>
                <td class="pa-2">
                  <v-textarea
                    rows="1"  
                    density="compact"
                    variant="solo"
                    hide-details
                    single-line
                    v-model="item.value"
                     @change="update(item)"
                    ></v-textarea>
                </td>
                <td class="pa-2 text-right">
                 
                  <v-switch
                  v-model="item.status"
                  @change="update(item)"
                  value="enabled"
                  hide-details
                  color="success"
                  true-icon="mdi-check"
                  false-icon="mdi-close"
                ></v-switch>

                </td>
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
      itemlist:[],
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
    
 update(item){
        api.post('/admin/qry',{
          table: 'settings',
          type: 'update account',
          query: `update settings set status='${item.status}', value='${item.value}' where id=${item.id}`
      })
      .then(response => {
        if(response.status) {
            this. getItems()
            this.AlertMsg(response.data.message,"success")
          
        } else {
            this.AlertMsg(response.data.message,"warning")
        }
       
      })
    
    },
       getItems() {
          api.post('admin/qry',{
                table: 'settings',
                type: 'query',
                query: "select * from settings order by id desc"
            })
        .then(response => {
          if(response.status) {
            console.log("Data: ",response.data)
              this.itemlist = response.data.settings
                this.item_count = response.data.settings.length
                this.total_page_num = Math.ceil(this.item_count / this.per_page)
          }
        })
        }
    }
    
  }
</script>
