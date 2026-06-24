<template>
<v-container fluid >
          

    <v-row>
            <v-toolbar>
              <v-toolbar-title><v-icon size="small" class="mr-2" theme="dark">mdi-file-document-multiple</v-icon>Settlements</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
    </v-row>

    <v-row class="mb-4">
          <v-col cols="3">
              <v-card>
                  <v-card-text class="text-center">
                    <p class="text-h6">{{ Money(completed_total) }}</p> 
                    <em>({{ Count(completed_total) }}) Completed</em>
                  </v-card-text>
              </v-card>
          </v-col>
           <v-col cols="3">
              <v-card>
                <v-card-text class="text-center">
                  <p class="text-h6">{{ Money(generated_total) }}</p> 
                  <em>({{ Count(generated_count) }}) Generated</em>
                  </v-card-text>
              </v-card>
          </v-col>
          <v-col cols="3">
              <v-card>
                <v-card-text class="text-center">
                    <p class="text-h6">{{Count(onprocess_total)}}</p> 
                    <em>({{Count(onprocess)}}) On-Process </em>
                  </v-card-text>
              </v-card>
          </v-col>  <v-col cols="3">
              <v-card>
                <v-card-text class="text-center">
                    <p class="text-h6">{{Money(overall)}}</p> 
                    <em>({{Count(count)}}) Overall</em>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
    <v-card>
    
    <v-row class="pa-4">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-toolbar  color="white">
            <div style="width: 250px;"  class="hp-date"> 
              <label for="FromDate">From:</label>
              <input type="date" id="FromDate" v-model="from_date" name="FromDate" >
               </div>
               <div style="width: 250px; margin-left: 10px;" class="hp-date"> 
                <label for="ToDate">To:</label>
                <input type="date" id="ToDate" v-model="to_date" name="ToDate">
               </div>
               <v-spacer />
               <v-icon>mdi-file-download</v-icon>
            </v-toolbar>   

        </v-col>
        <v-col cols="12" sm="12" md="12" lg="12">
            

         
            <table class="hpb-table hpb-table-border-bottom">
            <thead>
              <tr >
                <th class="text-center hp-head"></th>
                <th class="text-left hp-head">Account ID</th>
                <th class="text-left hp-head">Account Name</th>
                <th class="text-center hp-head">(%) PCT</th>
                <th class="text-left hp-head">Covered Date</th>
                <th class="text-left hp-head">Generated At</th>
                <th class="text-left hp-head">Status</th>
                <th class="text-right hp-head">Sales</th>
                <th class="text-right hp-head">Commission</th>
                
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in settlements" :key="index">
                <td :class="Even(index)" class="text-center"><v-icon @click="show=true, settlement_id=item.id">mdi-open-in-app</v-icon></td>
                <td :class="Even(index)">{{ item.agent_id}}</td>
                <td :class="Even(index)">{{ item.last_name}}, {{ item.first_name}}</td>
                <td :class="Even(index)" class="text-center">{{ item.set_commission}}</td>
                <td :class="Even(index)">{{ item.covered_date}}</td>
                <td :class="Even(index)">{{ $moment(item.generated_at).format("MMM DD, YYYY hh:mm")}}</td>
                <td :class="Even(index)"><span :class="'text-'+Status(item.status)">{{ item.status}}</span></td>
                <td :class="Even(index)" class="text-right">{{ Money(item.sales)}}</td>
                <td :class="Even(index)" class="text-right">{{ Money(item.amount)}}</td>
              </tr>
            </tbody>
         
          </table>
    
        </v-col>  
    </v-row>
  </v-card>
  <SettlementDrawer :settlement_id = "settlement_id" :show="show" @FormEvent="FormEvent"/>
</v-container>
</template>
<script>
import api from '@/plugins/axios.js'
import {
  mapMutations
} from 'vuex'

  export default {
    data: () => ({
      settlement_id:0,
      show: false,
      settlements:[]
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
       this.getSettlements()
     }
  
    },
    computed: {
      count(){
        return this.settlements.length
      },
      onprocess(){
        var process = this.settlements.reduce((res,item)=>{
          if(item.status == "On-process") res++
          return res
        },0)
        return process
      },
      onprocess_total(){
        var process = this.settlements.reduce((res,item)=>{
          if(item.status == "On-process"){
            res += this.IsNum(item.amount)
          }
          return res
        },0)
        return process
      },
      overall(){
        var total = this.settlements.reduce((res,item)=>{
          res += this.IsNum(item.amount)
          return res
        },0)
        return total
      },
      completed_total(){
        var process = this.settlements.reduce((res,item)=>{
          if(item.status == "Completed"){
            res += this.IsNum(item.amount)
          }
          return res
        },0)
        return process
      },
      completed_count(){
        var process = this.settlements.reduce((res,item)=>{
          if(item.status == "Completed") res++
          return res
        },0)
        return process
      },
      generated_total(){
        var process = this.settlements.reduce((res,item)=>{
          if(item.status == "Generated"){
            res += this.IsNum(item.amount)
          }
          return res
        },0)
        return process
      },
      generated_count(){
        var process = this.settlements.reduce((res,item)=>{
          if(item.status == "Generated") res++
          return res
        },0)
        return process
      },
    },
    methods: {
      ...mapMutations(['setLoggedIn']),
      FormEvent(){
        this.show = false
        this.getSettlements()
      },
      getSettlements(){
        api.post('admin/settlements', {})
        .then(response => {
          if(response.data.status) {
            this.settlements = response.data.settlements
          } else {
            this.AlertMsg(response.data.message,"warning")
          }
        })
      },
  
    }
    
  }
</script>
