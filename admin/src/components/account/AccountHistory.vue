<template>
    <v-navigation-drawer v-model="drawer" location="right" width="900"  temporary>
         <div class="pa-4">
             <v-row no-gutters>
               <v-col cols="12">
                
               <div class="pa-2">
                 <div class="font-weight-bold ma-2">{{account.last_name}}, {{account.first_name}} ({{account.id}})</div>
                 </div>
                 <v-divider class="mb-1"/>
                 
               </v-col>
               <v-col cols="12">
                   <v-toolbar  color="white">
                    <div style="width: 210px;"  class="hp-date"> 
                      <label for="FromDate">From:</label>
                      <input type="date" id="FromDate" v-model="from_date" name="FromDate" >
                      </div>
                      <div style="width: 210px; margin-left: 10px;" class="hp-date"> 
                        <label for="ToDate">To:</label>
                        <input type="date" id="ToDate" v-model="to_date" name="ToDate" @change="fetchTransactions()">
                      </div>
            </v-toolbar>
              <div style="float: right;">
                  <v-btn @click="search='All'" :color="search=='All'?'info':''" density="compact" tile>ALL</v-btn>
                  <v-btn @click="search='Topup'"  :color="search=='Topup'?'info':''" density="compact" tile>Topups</v-btn>
                  <v-btn @click="search='Payment'"  :color="search=='Payment'?'info':''" density="compact" tile>Bets</v-btn>
                  <v-btn @click="search='Withdrawal'"  :color="search=='Withdrawal'?'info':''" density="compact" tile>Withdrawals</v-btn>
                  <v-btn @click="search='Deposit'"  :color="search=='Deposit'?'info':''" density="compact" tile>Wins</v-btn>
              </div>
                <p class="ma-2">Transaction History : {{$moment(from_date).format('MMM DD, YYYY')}} -  {{$moment(to_date).format('MMM DD, YYYY')}} </p>
                <v-divider class="mb-1"/>
                <table class="hpb-table hpb-table-border-bottom ma-2 small-font">
                    <thead>
                     <tr>
                         <!-- <th class="text-left">Trans ID</th> -->
                         <th  class="text-left">Date</th>
                         <th  class="text-left">Type</th>
                         <th  class="text-left">Description</th>
                         <th  class="text-right">Amount</th>
                         <th  class="text-right">Prev. Bal</th>
                          <th  class="text-right">Current Bal</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="item in FILTERDATA" :key="item.id">
                         <td>
                          {{ item.id }} / 
                          {{ $moment(item.created_at).format("MMM DD, YYYY hh:mm:ss a")}}
                        </td>
                         <td>{{ item.type}}</td>
                         <td>{{ item.description }}  
                             <em v-if="Winbet(item) > 0" class="text-info">({{Winbet(item)}})</em> 
                          </td>
                         <td class="text-right">{{ Money(item.amount) }}</td>
                          <td class="text-right">{{ Money(item.previous_balance) }}</td>
                           <td class="text-right">{{ Money(item.current_balance) }}</td>
                    
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
           search:"All",
           from_date: null,
            to_date: null,
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
      
            this.from_date =this.$moment().subtract(7, "days").format('YYYY-MM-DD')
            this.to_date = this.$moment().format('YYYY-MM-DD')
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
      FILTERDATA(){
           if (this.search == "All") {
            return  this.transactions
          }
         return  this.transactions.reduce((res, item) =>{
            if(item.type==this.search.toLowerCase()) {
                res.push(item)
            }
            return res
          },[])
      },
       dialog(){
           return this.show
       }
     },
     methods: {
      emitToParent (action) {
         this.$emit('FormEvent', action)
       },
       Winbet(trans){
        if(trans.description =="Winning bet") {
            return this.Money(trans.details.info.amount)
        }
        return 0
         
       },
       fetchAccount(){
      
      api.post('/admin/qry',{
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
         
           api.post('/admin/qry',{
             table: 'transactions',
             type: 'query',
             query: "select * from transactions where to_date(created_at::text, 'YYYY-MM-DD') >= '" + this.from_date + "' and to_date(created_at::text, 'YYYY-MM-DD') <= '" + this.to_date + "' and  account_id="+this.account_id +" order by id desc"
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
   