<template>
<v-container fluid >
  <div style="width: 1200px; margin: auto;">
    <v-row>
      <v-col cols="12">

      
          <v-card tile>
            <v-toolbar density="compact">
          <v-btn icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-btn>
      <v-toolbar-title>Users</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="actform=true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
            <v-card-text>
          <table class="hpb-table hpb-table-border-bottom">
            <thead>
              <tr >
                <th class="text-left font-weight-bold" style="width:50px ">#</th>
                <th class="text-left font-weight-bold">Username</th>
                <th class="text-left font-weight-bold">Full Name</th>
                <th class="text-left font-weight-bold">Role</th>
                <th class="text-left font-weight-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in accounts" :key="i" @click="viewUser(item)">
                <td>{{ i+1 }}</td>
                <td> {{ item.username }}</td>
                <td>{{ item.fullname }}</td>
                <td>{{ item.role }}</td>
                <td class="text-right">
                  <v-chip size="small" :color="Status(item.status)">
                    {{ item.status}}
                  </v-chip>
                  </td>
              </tr>
            </tbody>
          </table>
        </v-card-text>
        </v-card>
    </v-col>
    </v-row>
  </div> 
    <UserForm :show="actform" :account_id="account.id" :state="state" @FormEvent="FormEvent"/>
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
      state: 'new',
      account:{},
      drawer: false,
      accounts:[],
    _account:{}
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
      BANNED(){
        return this.statusfilter("Banned")    
      },
      ACTIVE(){
        return this.statusfilter("Active")    
      },
      CREDITS(){
        let total =  this.accounts.reduce((res, item) =>res+=item.balance, 0)
        return total
      },
    },
    methods: {
      ...mapMutations(['setLoggedIn']),
      viewUser(user) {
        this.state = "edit"
        this.account = user
        this.actform = true
      },
      HistoryEvent(e){
        this.acthistory = false
      },
      FormEvent(e) {
        if('close' == e) {
          this.actform = false
        }
        this.getItems()
      },
      validate () {
        if (this.$refs.form.validate()) {
          this.Update()
        }
      },
      statusfilter(status){
        let items =  this.accounts.reduce((res, item) =>{
                    if(item.status ==  status) {
                          res.push(item)
                    }
                    return res
                }, [])
        return items
      },
      
      getItems() {
        api.post('/admin/qry',{
          table: 'administrators',
          type:'query',
          query: "select * from administrators"
      })
      .then(response => {
        if(response.status) {
          console.log(response.data)
            this.accounts = response.data.administrators
        }
      })
      }
    }
    
  }
</script>
