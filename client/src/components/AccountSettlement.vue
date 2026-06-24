<template>
<v-container fluid >
          

    <!-- <v-row no-gutters>
     <v-col cols="12" class="small-font font-italic pa-2 " >
         <v-icon size="large" class="mr-2" theme="dark">mdi-cash-check</v-icon>Earnings
      </v-col>
    </v-row> -->
<!-- 
    <v-row class="mb-4">
      <v-col cols="12" sm="3">
              <v-card>
                  <v-card-text class="text-center">
                    <p class="text-h6">{{ Money(completed_total) }}</p> 
                    <em>({{ Count(completed_total) }}) Completed</em>
                  </v-card-text>
              </v-card>
          </v-col>
          <v-col cols="12" sm="3">
              <v-card>
                <v-card-text class="text-center">
                  <p class="text-h6">{{ Money(generated_total) }}</p> 
                  <em>({{ Count(generated_count) }}) Generated</em>
                  </v-card-text>
              </v-card>
          </v-col>
          <v-col cols="12" sm="3">
              <v-card>
                <v-card-text class="text-center">
                    <p class="text-h6">{{Count(onprocess_total)}}</p> 
                    <em>({{Count(onprocess)}}) On-Process </em>
                  </v-card-text>
              </v-card>
          </v-col>  
          <v-col cols="12" sm="3">
              <v-card>
                <v-card-text class="text-center">
                    <p class="text-h6">{{Money(overall)}}</p> 
                    <em>({{Count(count)}}) Overall</em>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row> -->

      <v-row class="mb-4">
        <v-col cols="12">
               <v-card
                  color="surface-variant"
              image="@/assets/cardbg.png"
               >
                <v-card-text class="text-center">
                    <p class="text-h5">{{Money(overall)}}</p> 
                    <em class="font-weight-thin"><v-icon size="large" class="mr-2" color="white">mdi-cash-check</v-icon> TOTAL EARNINGS</em>
                  </v-card-text>
              </v-card>

        </v-col>
        <v-col cols="12" >
        <div>
          <v-alert
            border="start"
            border-color="deep-purple accent-4"
            elevation="2"
            class="pa-3 small-font"
          >
             <div class="ml-4">Settlements is auto generate weekly. Make sure your bank account was set up in your <a href="/profile">profile</a>.</div> 
         </v-alert>
        </div>
      </v-col>
      </v-row>

   
    <v-row>
    
      <!-- <v-col cols="12" sm="12" md="12" lg="12">
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

        </v-col> -->
        <v-col cols="12">
            
        <ul class="bs-list">
                    <li v-for="(item,index) in settlements" :key="index">
                        <v-card class="pa-2 mb-1 small-font">
                          
                          <div>
                             SALES: {{Money(item.sales)}}
                              <strong style="float: right" class="text-success">{{Money(item.amount)}}</strong>
                          </div>
                           <div class="font-weight-thin font-italic"> Covered: {{ item.covered_date}} <br />  Status: {{item.status}}</div>
                         
                        </v-card> 
                    </li>
                 </ul>
         
            <!-- <table class="hpb-table hpb-table-border-bottom">
            <thead>
              <tr >
                <th class="text-left">
                Covered Date
                </th>
                <th class="text-left">
                Status
                </th>
                <th class="text-left">
                Generated At
                </th>
                <th class="text-right">
                Sales
                </th>
                <th class="text-right">
                Commission
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in settlements" :key="index">
                <td :class="Even(index)" class="text-left">
                  <v-icon @click="show=true, settlement=item" class="mr-2" size="small">mdi-book-open</v-icon>
                  {{ item.covered_date}}
                </td>
                <td :class="Even(index)" >
                 {{item.status}}
                </td>
                <td :class="Even(index)" >
                    {{$moment(item.generated_at).format("MMM DD, YYYY hh:mm A")}}
                </td>
                <td class="text-right" :class="Even(index)" >
                      {{Money(item.sales)}}
                </td>
                <td class="text-right" :class="Even(index)" >
                    {{Money(item.amount)}}
                </td>
              </tr>
            </tbody>
         
          </table> -->
    
        </v-col>  
    </v-row>

  <SettlementDrawer :settlement = "settlement" :show="show" @FormEvent="FormEvent"/>
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
      settlement:{},
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
        api.post('/agent/data_qry',{
              type: 'settlements',
              query: "select * from settlements where agent_id="+this._account.id+" order by id desc"
          })
          .then(response => {
            if(response.status) {
              this.settlements = response.data.items
            }
          })
      },
  
    }
    
  }
</script>
