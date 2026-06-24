<template>
<v-container fluid >
 
  <v-row>
    <v-col cols="12" class="small-font font-italic pa-2 " >
         <v-icon size="large" class="mr-2" theme="dark">mdi-account-multiple</v-icon>Community
      </v-col>
    <v-col cols="12" class="small-font font-italic pa-2 text-white" style="background-color: #2196F3;">
          # of players: {{Count(accounts.length)}} |  Direct:  {{Count(DirectPlayers.length)}} | LVL 1:  {{Count(InDirectPlayers1.length)}} | LVL 2: {{Count(InDirectPlayers2.length)}}
      </v-col>
    
    </v-row>

    <v-row>
      <v-col cols="12">

      


        <ul class="tree">
            <li v-for="item in DirectPlayers" :key="item.id">
          
                  <v-card class="pa-1 mt-2" style="background-color:#a9d3ef;" >
                    <v-menu location="end" color="success">
                                <template v-slot:activator="{ props }">
                                  <v-btn icon="mdi-dots-vertical" variant="text" size="x-small" v-bind="props"></v-btn>
                                </template>
                                <div class="account-menu">
                                <v-btn block size="small" variant="text" @click="account=item, actform=true">Profile</v-btn>
                                <v-btn block size="small" variant="text" @click="account=item, acthistory=true">Transactions</v-btn>
                              
                                </div> 
                            </v-menu>
                    <strong>{{ item.last_name }}, {{ item.first_name }}</strong><v-chip size="x-small" :color="Status(item.status)">
                      {{ item.status}}
                    </v-chip> <br/>
                    <em><v-icon color="warning" size="small">mdi-phone</v-icon> {{ item.mobile_no}}</em>   <em style="float: right"><v-icon color="warning" size="small">mdi-database</v-icon> {{ Money(item.balance)}} </em>
                  </v-card>
                  <ul>
                      <li  v-for="subitem in getDirectPlayers(item.id)" :key="'s' + subitem.id">
                          <v-card class="pa-1  mt-2" style="background-color:#d7eaf7;" >
                            <v-menu location="end" color="success">
                                        <template v-slot:activator="{ props }">
                                          <v-btn icon="mdi-dots-vertical" variant="text" size="x-small" v-bind="props"></v-btn>
                                        </template>
                                        <div class="account-menu">
                                        <v-btn block size="small" variant="text" @click="account=subitem, actform=true">Profile</v-btn>
                                        <v-btn block size="small" variant="text" @click="account=subitem, acthistory=true">Transactions</v-btn>
                                        
                                        </div> 
                                    </v-menu>
                                       <strong>{{ subitem.last_name }}, {{ subitem.first_name }}  </strong>
                                    <v-chip size="x-small" :color="Status(subitem.status)">{{ subitem.status}}</v-chip> <br/>
                                    <em><v-icon color="warning" size="small">mdi-phone</v-icon> {{ subitem.mobile_no}}</em> <em style="float: right"><v-icon color="warning" size="small">mdi-database</v-icon> {{ Money(subitem.balance)}} </em>
                            </v-card>
                         
                              <ul>
                                  <li v-for="_subitem in getDirectPlayers(subitem.id)" :key="'_s' + _subitem.id">
                                    <v-card class="pa-2  mt-2" style="background-color:#f0f8ff;" >
                                                <v-menu location="end" color="success">
                                                  <template v-slot:activator="{ props }">
                                                    <v-btn icon="mdi-dots-vertical" variant="text" size="x-small" v-bind="props"></v-btn>
                                                  </template>
                                                  <div class="account-menu">
                                                  <v-btn block size="small" variant="text" @click="account=_subitem, actform=true">Profile</v-btn>
                                                  <v-btn block size="small" variant="text" @click="account=_subitem, acthistory=true">Transactions</v-btn>
                                                  
                                                  </div> 
                                              </v-menu>
                                                  <strong>{{ _subitem.last_name }}, {{ _subitem.first_name }}  </strong>
                                                      <v-chip size="x-small" :color="Status(_subitem.status)">{{ _subitem.status}}</v-chip> <br/>
                                                      <em><v-icon color="warning" size="small">mdi-phone</v-icon> {{ _subitem.mobile_no}}</em> <em style="float: right"><v-icon color="warning" size="small">mdi-database</v-icon> {{ Money(_subitem.balance)}} </em>
                                            </v-card>

                                  </li>
                              </ul>
                              
                      </li>
                  </ul>
                 
            </li>
           
        </ul>
    
    </v-col>
    </v-row>
   
    <AccountForm :show="actform" :account_id="account.id" @FormEvent="FormEvent"/>
    <MyPlayers :show="myplayers" :account_id="account.id" @FormEvent="pEvent"/>
    <AccountHistory :show="acthistory" :account_id="account.id" @FormEvent="HistoryEvent"/>
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
      myplayers: false,
      loading: false,
      valid: true,
      account:{},
      drawer: false,
      search:"",
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
      FILTERDATA(){
        if (this.search == "") {
          return  this.accounts
        } else {
            return this.searchPlayers()
        }
      },
       DirectPlayers(){
        return this.accounts.filter(player => player.direct_upline === this._account.id);
      },
       InDirectPlayers1(){
        return this.accounts.filter(player => player.sub_upline === this._account.id);
      },
      InDirectPlayers2(){
        return this.accounts.filter(player => player.upline === this._account.id);
      },
    },
    methods: {
      ...mapMutations(['setLoggedIn']),
    getDirectPlayers(accountID){
      return this.accounts.filter(player => player.direct_upline === accountID);
    },
      searchPlayers(){
        if (this.search == "") {
          return  this.accounts
        }
       return  this.accounts.reduce((res, item) =>{
          if(item.first_name.toLowerCase().includes(this.search.toLowerCase()) || item.last_name.toLowerCase().includes(this.search.toLowerCase()) || item.mobile_no.includes(this.search)) {
              res.push(item)
          }
          return res
        },[])
      },
      pEvent(){
        this.myplayers = false
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
         var qry_str = "select * from accounts where direct_upline="+this._account.id +" or sub_upline = " + this._account.id + " or upline = " + this._account.id + " order by id desc"
        api.post('/agent/qry',{
              table: 'accounts',
              type: 'query',
              query: qry_str
          })
      .then(response => {
        if(response.status) {
          console.log(response.data)
            this.accounts = response.data.accounts
        }
      })
      }
    }
    
  }
</script>
