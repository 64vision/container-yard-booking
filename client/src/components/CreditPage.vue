<template>
  <v-container fluid >
 
    <v-toolbar class="elevation-1" color="white" rounded>
                  <v-toolbar-title><v-icon color="warning" class="mr-2">mdi-database</v-icon> Credits:  {{Money($store.state.balance)}}</v-toolbar-title>  
                <v-spacer></v-spacer>
                <v-btn color="success" @click="send=true"><v-icon  class="mr-2">mdi-database</v-icon>Send Credits</v-btn>
                <v-btn @click="actform=true" color="success"><v-icon  class="mr-2">mdi-credit-card</v-icon> BUY CREDITS</v-btn>
               </v-toolbar>
  
   
      <v-row>
        <v-col cols="6">
            <v-card tile class="mt-4">
           
              <div class="pa-4">
                
 

                  <p class="ma-2">Latest Transactions</p>
                <v-divider class="mb-1"/>
                <table class="hpb-table hpb-table-border-bottom ma-2" style="font-size: .9em;">
                    <thead>
                     <tr>
                         <th class="text-left">Trans ID</th>
                         <th  class="text-right">Amount</th>
                         <!-- <th  class="text-right">Previous Balance</th>
                         <th  class="text-right">Current Balance</th> -->
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="item in transactions" :key="item.id">
                         <td>Trans ID: {{ item.id }}
                          <br/>
                          <small class="font-italic text-info"> {{ $moment(item.created_at).format("MMM DD, YYYY hh:mm:ss a")}}</small>
                          <br/>
                          <small class="font-italic text-gray"> {{ item.description }}</small>
                         </td>
                         <td class="text-right">{{Money(item.amount)}}</td>
                         <!-- <td class="text-right">{{ Money(item.previous_balance) }}</td>
                         <td class="text-right">{{ Money(item.current_balance) }}</td> -->
                         
                     </tr>
                 </tbody>
                 </table>

              </div>
          </v-card>
      </v-col>
        <v-col cols="6">
            <v-card tile class="mt-4">
           
              <div class="pa-4">
                
        
                  <p class="ma-2">Latest Bets</p>
                <v-divider class="mb-1"/>
                <table class="hpb-table hpb-table-border-bottom ma-2" style="font-size: .9em;">
                    <thead>
                     <tr>
                         <th class="text-left">Trans ID</th>
                         <th  class="text-right">Amount</th>
                         <!-- <th  class="text-right">Previous Balance</th>
                         <th  class="text-right">Current Balance</th> -->
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="item in bets" :key="item.id">
                         <td>Trans ID: {{ item.id }}
                          <br/>
                          <small class="font-italic text-info"> {{ $moment(item.created_at).format("MMM DD, YYYY hh:mm:ss a")}}</small>
                         
                         </td>
                         <td class="text-right">{{Money(item.amount)}}</td>
                         <!-- <td class="text-right">{{ Money(item.previous_balance) }}</td>
                         <td class="text-right">{{ Money(item.current_balance) }}</td> -->
                         
                     </tr>
                 </tbody>
                 </table>
              </div>
          </v-card>
      </v-col>
      </v-row>
      <BuyDialog :show="actform" @ConfirmEvent="bEv"/>
      <SendDialog :show="send" @ConfirmEvent="bEv"/>
  </v-container>
  </template>
  <script>
  import api from '@/plugins/axios.js'
  import { md5 } from 'js-md5';
  import {
    mapMutations
  } from 'vuex'
    export default {
      data: () => ({
        send: false,
        actform: false,
        loading: false,
        pass1:"",
        pass2:"",
        changepass:false,
        transactions:[],
        bets:[],
        account:{}
      }),
      created: function () {
       
        if (!sessionStorage.account) {
         this.setLoggedIn(false)  // Set loggedIn to false when no account is found in sessionStorage
          this.$router.push('/login')
       } else {
         this.setLoggedIn(true)  // Set loggedIn to true when an account is found in sessionStorage
         this.account = JSON.parse(sessionStorage.account)
         api.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.token
         this.getBalance()
        this.fetchTransactions()
        this.fetchBets()
       }
    
      },
      computed: {
     
      },
      methods: {
        ...mapMutations(['setLoggedIn', 'setBalance']),
        bEv(){
            this.actform = false
            this.send = false
            this.getBalance()
        },
        getBalance(){
          api.post('/account/balance',{
                id: this.account.id
            })
            .then(response => {
              if(response.status) {
                 this.setBalance(response.data.balance.balance)
              } 
            })
        },
        fetchTransactions(){
         api.post('/agent/qry',{
           table: 'transactions',
           type: 'query',
              query: "select * from transactions where account_id="+this.account.id +" and type != 'payment'  order by id desc limit 20"
          })
          .then(response => {
              console.log(response.data)
            if(response.data.status) {
                this.transactions = response.data.transactions
              
            }
          })
        
        },
        fetchBets(){
            api.post('/agent/qry',{
            table: 'transactions',
            type: 'query',
                query: "select * from transactions where account_id="+this.account.id +" and type = 'payment'  order by id desc limit 30"
            })
            .then(response => {
              console.log("bets",  response.data.transactions)
              if(response.data.status) {
                  this.bets = response.data.transactions
                
              }
            })
          
          },
        }
      
      
    }
  </script>
  