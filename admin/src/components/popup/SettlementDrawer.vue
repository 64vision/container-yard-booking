<template>
  <v-navigation-drawer v-model="drawer" location="right" width="900"  temporary>
       <div class="pa-4">
           <v-row>
             <v-col cols="12">
              
             <div class="pa-2">
               <div class="font-weight-bold ma-2">
                  <!-- {{settlement.last_name}}, {{settlement.first_name}} ({{settlement.agent_id}}) -->
                   <v-icon class="mr-2">mdi-chart-box-multiple-outline</v-icon>Settlement Details
                </div>
               </div>
               <v-divider class="mb-1"/>
               
             </v-col>
             <v-col cols="12">
              
              <v-row>
                  <v-col cols="6">
                          <p class="ma-2">Agent Name: <strong>{{settlement.last_name}}, {{settlement.first_name}} </strong></p>
                    <v-divider/>
                    <p class="ma-2">Agent ID: <strong>{{settlement.agent_id}} </strong></p>
                    <v-divider/>
                    <p class="ma-2">Generated At: <em>{{ $moment(settlement.generated_at).format("MMM DD, YYYY hh:mm:ss A") }}</em></p>
                    <v-divider/>
                    <p class="ma-2">Status: {{settlement.status}}</p>
                    <v-divider/>
                    <p class="ma-2">Remarks: {{settlement.remarks}}</p>
                    <v-divider/>
                  
                  </v-col>
                  <v-col cols="6">
                    <p class="ma-2">Commission: <strong>{{Money(settlement.amount)}} </strong></p>
                    <v-divider/>
                    <p class="ma-2">Sales: <strong>{{Money(settlement.sales)}} </strong></p>
                    <v-divider/>
                    <p class="ma-2">Set Commission: <strong>{{settlement.set_commission}}% </strong></p>
                    <v-divider/>
                          <p class="ma-2">Covered Date: <strong>{{settlement.covered_date}}</strong></p>
                    <v-divider/>
                  
                  </v-col>
              </v-row>
            <v-toolbar density="compact">
              <v-toolbar-title>Sales Summary</v-toolbar-title>
            </v-toolbar>
              
               <table class="hpb-table hpb-table-border-bottom ma-2" style="font-size: .9em;">
                  <thead>
                   <tr>
                       <th  class="text-left">Date</th>
                       <th  class="text-right">Amount</th>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="item in sales" :key="item.id">
                    <td>{{ item.covered_date }}</td>
                    <td class="text-right">{{ Money(item.sales) }}</td>
                   </tr>
               </tbody>
               </table> 
               <v-toolbar density="compact">
                    <v-toolbar-title>Payment Details</v-toolbar-title>
              </v-toolbar>
              <div class="pa-2">
                <p class="font-weight-bold">Payment Method</p> 
                <p>Bank Name: {{ account.bank.name }} </p> 
                <p>Account Number: {{ account.bank.number }} </p> 
              </div>
             
             
             </v-col> 
             
           </v-row>
           <v-divider class="mt-4 mb-4" />
           <div>
           <div style="float: right; margin-top: 20px;"><v-btn color="success" :loading="loading" @click="UpdateSettlement()">Save</v-btn></div>
            <div style="width: 300px;" >
              <v-select 
                v-model="status"
                :items="['On-process', 'Completed', 'Cancelled', 'Generated']"
                label="Status"
                class="ma-2"
              />
            </div> 
          </div> 
        
       </div>   
     </v-navigation-drawer>
 </template>
 
 <script>
 import api from '@/plugins/axios.js'
 export default {
     data: () => ({
         drawer: false,
         loading: false,
         settlement: {},
         sales: [],
         status:"",
         account:{bank: {}}
     }),
   props: {
       show:{
           type: Boolean,
           default: false
       },
       settlement_id: {
             type: Number,
             default: 0
       },
   },
   watch: {
     show(val) {
       this.drawer = val
       console.log("value: " + val)
       if(val){
          this.fetch()
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
     UpdateSettlement(){
      this.loading = true
      this.settlement.status = this.status
      api.post('/admin/update_settlement',this.settlement)
        .then(response => {
          this.loading = false
          if(response.status) {
            this.AlertMsg( response.data.message, "success")
           this.fetch()
          }
        })
     },
     fetchAccount(){
      
      api.post('/admin/qry',{
        table: 'accounts',
        type: 'query',
        query: "select * from accounts where id="+this.settlement.agent_id
    })
    .then(response => {
      if(response.status) {
          console.log(this.settlement.agent_id, response.data)
         this.account = response.data.accounts[0]
        
      }
    })
  
  },
  
     fetch() {
      api.post('/admin/acct_settlement',{
            id: this.settlement_id
              })
        .then(response => {
          if(response.status) {
            console.log(response.data)
              this.settlement = response.data.settlement
              this.sales = response.data.sales
              this.status = response.data.settlement.status
              this.fetchAccount()
          }
        })
     }
   }
 }
 </script>
 