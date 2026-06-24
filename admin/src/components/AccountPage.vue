<template>
  <v-container fluid >
     <v-row  class="mb-4">
        <v-col cols="6" sm="2">
              <v-card class="pa-4 text-center text-info" tile>
                <v-icon size="small" class="mr-2">mdi-account-multiple</v-icon>  Acounts: {{Count(accounts.length)}}
              </v-card>
        </v-col>
        <v-col cols="6" sm="2">
              <v-card class="pa-4 text-center text-success">
                <v-icon color="success" size="small" class="mr-2">mdi-account-badge-outline</v-icon> Active: {{Count(ACTIVE.length)}}
              </v-card>
        </v-col>
         <v-col cols="6" sm="2">
              <v-card class="pa-4 text-center text-info" tile>
                <v-icon size="small" class="mr-2">mdi-account-box-multiple</v-icon>  Agents: {{Count(levelfilter(3))}}
              </v-card>
        </v-col>
        <v-col cols="6" sm="2">
              <v-card class="pa-4 text-center text-success">
                <v-icon color="success" size="small" class="mr-2">mdi-account-box-multiple-outline</v-icon> Sub Agents: {{Count(levelfilter(2))}}
              </v-card>
        </v-col>
        <v-col cols="6" sm="2">
              <v-card class="pa-4 text-center text-warning">
                <v-icon color="warning" size="small" class="mr-2">mdi-account-badge-outline</v-icon> Players: {{Count(levelfilter(1))}}
              </v-card>
        </v-col>
        <v-col cols="6" sm="2">
              <v-card class="pa-4 text-center font-weight-bold">
                <v-icon color="warning" size="small" class="mr-2">mdi-database</v-icon> Credits: {{Money(CREDITS)}}
              </v-card>
        </v-col>
      </v-row>
    <v-row no-gutters>
              <v-toolbar class="elevation-1" color="white" rounded>
                <v-toolbar-title class="font-weight-bold"><v-icon size="large" class="mr-2" theme="dark">mdi-account-multiple</v-icon>Players</v-toolbar-title>
                <v-spacer></v-spacer>
            <div style="width: 350px;" class="mr-4">
          <v-text-field
                  label="Search"
                  class="mt-4"
                  outlined
                  variant="solo"
                  :onchange="resetPage()"
                  density="compact"
                  append-icon="mdi-account-search-outline"
                  v-model="search"
                  clearable
                  append
                />
              </div>
            
              </v-toolbar>
      </v-row>
   
      <v-row>
  
        <v-col cols="12">
            <v-card tile class="elevation-0">
  
              <v-card-text>
            
            <table class="hpb-table hpb-table-border-bottom">
              <thead>
                <tr >
                  <th class="text-center" style="width: 150px">ID</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Mobile</th>
                  <th class="text-left">Registered</th>
                  <th class="text-left">Last Login</th>
                  <th class="text-left">Status</th>
                  <th class="text-right">Credits</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in PAGEDATA" :key="item.id">
                  <td>
                    <v-menu location="end" color="success" >
                  <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" variant="text" size="small" v-bind="props"></v-btn>
                  </template>
                  <div class="account-menu">
                   <v-btn block size="small" variant="text" @click="account=item, actform=true">Profile</v-btn>
                   <v-btn block size="small" variant="text" @click="account=item, acthistory=true">Transactions</v-btn>
                      <v-btn block size="small" variant="text" @click="account=item, myplayers=true">Network</v-btn>
                  </div> 
            </v-menu>
                    {{item.id}}
                   </td>
                  <td>{{ item.last_name }}, {{ item.first_name }} 
                    <!-- <v-chip :color="item.level==1?'primary':'warning'" size="x-small" variant="outlined	">{{ AcctLabel(item.level) }}</v-chip> -->
                  </td>
                  <td>{{ item.mobile_no}}</td>
                  <td>{{ $moment(item.created_at).format("MMM DD, YYYY")}}</td>
                  <td class="font-italic text-info">{{ $moment(item.updated_at).fromNow() }}</td>
                  <td>
                    <v-chip size="x-small" :color="Status(item.status)">
                      {{ item.status}}
                    </v-chip> / 
                    <span class="small-font font-italic">{{item.remarks}}</span>
                    </td>
                  <td class="text-right">{{ Money(item.balance)}} <v-icon color="warning" size="small">mdi-database</v-icon></td>
                </tr>
              </tbody>
            </table>

              <em>{{page_num}}  of {{total_page_num}} pages</em>

          </v-card-text>
          </v-card>
          
      </v-col>
      </v-row>
    
      <v-row no-gutters>
        <v-col cols="12" class="text-center">
          <v-pagination
            v-model="page_num"
            :length="total_page_num"
            :total-visible="total_page_num"
            color="primary"
            class="my-4"
          ></v-pagination>
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
        myplayers: false,
        acthistory: false,
        page_num:1,
        total_page_num: 0,
        item_count:0,
        per_page:40,
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
        PAGEDATA(){
          let start_index = (this.page_num - 1) * this.per_page
          let end_index = start_index + this.per_page
          return this.FILTERDATA.slice(start_index, end_index)
        },
        FILTERDATA(){
          if (this.search == "") {
            return  this.accounts
          } else {
              return this.searchPlayers()
          }
        }
      },
      methods: {
        ...mapMutations(['setLoggedIn']),
        resetPage(){
         // alert(this.search)
          this.page_num = 1
          
        },
        searchPlayers(){
          if (this.search == "") {
            return  this.accounts
          }
         return  this.accounts.reduce((res, item) =>{
            if(item.first_name.toLowerCase().includes(this.search.toLowerCase()) || item.last_name.toLowerCase().includes(this.search.toLowerCase()) || item.mobile_no.includes(this.search) || item.id.toString().toLowerCase().includes(this.search) ) {
                res.push(item)
            }
            return res
          },[])
        },
         pEvent(){
           this.myplayers = false
              this.acthistory = false
                this.actform = false
      },
        HistoryEvent(e){
            this.myplayers = false
              this.acthistory = false
                this.actform = false
        },
        FormEvent(e) {
          if('close' == e) {
              this.myplayers = false
              this.acthistory = false
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
        levelfilter(level){
          let items =  this.accounts.reduce((res, item) =>{
                      if(item.level ==  level) {
                            res.push(item)
                      }
                      return res
                  }, [])
          return items.length
        },
        
        getItems() {
          api.post('admin/qry',{
                table: 'accounts',
                type: 'query',
                query: "select * from accounts order by id desc"
            })
        .then(response => {
          if(response.status) {
            console.log("Data: ",response.data)
              this.accounts = response.data.accounts
              this.item_count = response.data.accounts.length
                this.total_page_num = Math.ceil(this.item_count / this.per_page)
          }
        })
        }
      }
      
    }
  </script>
  