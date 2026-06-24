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
                     
                       <th  class="text-center"> Type</th>
                         <th  class="text-right">Sales</th>
                        <th  class="text-right">Commission</th>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="item in sales" :key="item.id">
                    <td>{{ item.covered_date }}</td>
                   
                    <td class="text-center">{{ SalesType(item.agent_type) }}</td>
                     <td class="text-right">{{ Money(item.sales) }}</td>
                    <td class="text-right">{{ Money(item.amount) }}</td>
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
           <v-divider class="mt-4 mb-4" /> 007810285308
      
        
       </div>   
     </v-navigation-drawer>
 </template>
 
 <script>
 import api from '@/plugins/axios.js'
 export default {
     data: () => ({
         drawer: false,
         loading: false,
         sales: [],
         status:"",
         account:{bank: {}}
     }),
   props: {
       show:{
           type: Boolean,
           default: false
       },
       settlement: {
             type: Object,
             default:()=>{}
       },
   },
   watch: {
     show(val) {
       this.drawer = val
       console.log("value: " + val)
       if(val){
        this.account = JSON.parse(sessionStorage.account)
          this.fetchSales()
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
   
  
     fetchSales() {
      var _date = this.settlement.covered_date.split(" to ") 
        api.post('/agent/data_qry',{
              type: 'sales',
              query: "select * from agent_sales where to_date(covered_date,'YYYY-MM-DD') >= '"+_date[0]+"' AND to_date(covered_date,'YYYY-MM-DD') <= '"+_date[1]+"' and agent_id="+this.settlement.agent_id+" order by id desc"
          })
          .then(response => {
            if(response.status) {
          
              this.sales = response.data.items
              
            }
          })
     }
   }
 }
 </script>
 