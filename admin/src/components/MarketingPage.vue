<template>
  <v-container fluid >
 

   
      <v-row>
        <v-col cols="6">
            <v-card tile class="mt-4">
           
                        
 

                    <v-toolbar class="elevation-1" color="white"  density="compact">
                  <v-toolbar-title>TOP UPS</v-toolbar-title>  
                <v-spacer></v-spacer>
                <v-btn color="success" @click="send=true"><v-icon  class="mr-2">mdi-database-arrow-up</v-icon>New Top UP</v-btn>
               </v-toolbar>
               <div class="pa-4">
                <table class="hpb-table hpb-table-border-bottom ma-2" style="font-size: .9em;">
                    <thead>
                     <tr>
                         <th class="text-left">Receiver.</th>
                          <th  class="text-right">Message</th>
                         <th  class="text-right">Amount</th>
                         <!-- <th  class="text-right">Previous Balance</th>
                         <th  class="text-right">Current Balance</th> -->
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="item in requests" :key="item.id">
                         <td>{{ item.receiver }}</td>
                          <td class="text-left">{{item.message}}

                             <br/>
                          <small class="font-italic text-info"> {{ $moment(item.req_at).format("MMM DD, YYYY hh:mm:ss a")}}</small>
                          </td>
                         <td class="text-right">{{Money(item.amount)}}</td>
                         
                     </tr>
                 </tbody>
                 </table>

              </div>
          </v-card>
      </v-col>
        <v-col cols="6">
            <v-card tile class="mt-4" >
                 <v-toolbar class="elevation-1" color="white"  density="compact">
                  <v-toolbar-title>Recent Messages</v-toolbar-title>  
                <v-spacer></v-spacer>
               
                <v-btn @click="actform=true" color="success"><v-icon  class="mr-2">mdi-message-text</v-icon>COMPOSE MESSAGE</v-btn>
               </v-toolbar>
              <div class="pa-4">
                  
                <table class="hpb-table hpb-table-border-bottom ma-2" style="font-size: .9em;">
                    <thead>
                     <tr>
                         <th class="text-left">Messages</th>
                         <th  class="text-left">Receiver Type</th>
                        <th  class="text-right">Receiver</th>  
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="item in messages" :key="item.id">
                         <td>
                          {{ item.message_txt }}<br />
                          <small class="font-italic text-info"> {{ $moment(item.created_at).format("MMM DD, YYYY hh:mm:ss a")}}</small>
                         
                         </td>
                         <td class="text-left">{{item.receiver_type}}</td>
                         <td class="text-right">{{item.receiver}}</td>
                     </tr>
                 </tbody>
                 </table>
              </div>
          </v-card>
      </v-col>
      </v-row>
      <ComposeBox :show="actform" @ConfirmEvent="bEv"/>
      <TopUp :show="send" @ConfirmEvent="bEv"/>
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
        messages:[],
        requests:[],
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
        //  this.getBalance()
        // this.fetchTransactions()
         this.ListMessages()
         this.fetchTransactions()
       }
    
      },
      computed: {
     
      },
      methods: {
        ...mapMutations(['setLoggedIn', 'setBalance']),
        bEv(){
            this.actform = false
            this.send = false
           this.ListMessages()    //  this.getBalance()
           this.fetchTransactions()
        },
        fetchTransactions(){
         api.post('/admin/qry',{
           table: 'requests',
           type: 'query',
              query: "select * from requests where type = 'topup'  order by id desc limit 50"
          })
          .then(response => {
              console.log(response.data)
            if(response.data.status) {
                this.requests = response.data.requests
              
            }
          })
        
        },
       ListMessages(){
          this.loading = true
            api.get('/message/list')
                .then(response => {
                     if(response.status) {
                      this.messages = response.data.items
                    } 
                  
                })
        },
        
      }
      
    }
  </script>
  