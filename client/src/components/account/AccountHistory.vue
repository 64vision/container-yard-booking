<template>
    <v-navigation-drawer v-model="drawer" location="right" width="900"  temporary>
         <div>
             <v-row>
               <v-col cols="12">
                
               <div class="pa-2">
                 <div class="font-weight-bold ma-2">{{account.last_name}}, {{account.first_name}} ({{account.id}})</div>
                 </div>
                 <v-divider class="mb-1"/>
                 
               </v-col>
               <v-col cols="12">

                <p class="ma-2">Latest Transactions</p>
                <v-divider class="mb-1"/>
                <table class="hpb-table hpb-table-border-bottom ma-2" style="font-size: .85em;">
                    <thead>
                     <tr>
                         <th class="text-left">Trans ID</th>
                         <th  class="text-left">Date</th>
                         <th  class="text-left">Type</th>
                         <th  class="text-left">Description</th>
                         <th  class="text-right">Amount</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="item in transactions" :key="item.id">
                         <td>{{ item.id }}</td>
                         <td>{{ $moment(item.created_at).format("MMM DD, YYYY hh:mm:ss a")}}</td>
                         <td>{{ item.type }}</td>
                         <td>{{ item.description }}</td>
                         <td  class="text-right">{{ Money(item.amount) }}</td>
                      
                     </tr>
                 </tbody>
                 </table>
               </v-col> 
             </v-row>
         </div>   
       </v-navigation-drawer>
   </template>
   
   <script>
   import api from '@/plugins/axios.js'
   export default {
       data: () => ({
           drawer: false,
           account: {},
           transactions: [],
       }),
     props: {
         show:{
             type: Boolean,
             default: false
         },
         account_id: {
               type: Number,
               default: 0
         },
         okbtn: {
             type: String,
             default:''
         },
         cancelbtn: {
             type: String,
             default:''
         }
     },
     watch: {
       show(val) {
         this.drawer = val
         console.log("value: " + val)
         if(val){
            this.fetchAccount()
           this.fetchTransactions()
         }
       },
       drawer(val) {
           console.log("value: " + val)
           if(!val) {
               this.emitToParent('close')
           }
       }
     },
     computed: {
       dialog(){
           return this.show
       }
     },
     methods: {
      emitToParent (action) {
         this.$emit('FormEvent', action)
       },
       fetchAccount(){
      
      api.post('/agent/qry',{
        table: 'accounts',
        type: 'query',
        query: "select * from accounts where id="+this.account_id
    })
    .then(response => {
      if(response.status) {
         this.account = response.data.accounts[0]
        
      }
    })
  
  },
       fetchTransactions(){
         
           api.post('/agent/qry',{
             table: 'transactions',
             type: 'query',
             query: "select * from transactions where account_id="+this.account_id +" order by id desc limit 30"
         })
         .then(response => {
            console.log(response.data)
           if(response.status) {
              this.transactions = response.data.transactions
             
           }
         })
       
       }
     }
   }
   </script>
   