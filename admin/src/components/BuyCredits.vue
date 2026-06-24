<template>
<v-container fluid >
          

    <v-row>
            <v-toolbar>
              <v-toolbar-title><v-icon size="small" class="mr-2" theme="dark">mdi-file-document-multiple</v-icon>BUY CREDITS</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
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
                <input type="date" id="ToDate" v-model="to_date" name="ToDate" @change="getData()">
               </div>
               <v-spacer />
               <v-icon>mdi-file-download</v-icon>
            </v-toolbar>   

        </v-col>
        
    <v-row class="mb-2 mt-4">
          <v-col cols="3">
              <v-card>
                  <v-card-text class="text-center">
                    <p class="text-h6">{{ Money(completed_total) }}</p> 
                    <em>Total Credits</em>
                  </v-card-text>
              </v-card>
          </v-col>
           <v-col cols="3">
              <v-card>
                <v-card-text class="text-center">
                  <p class="text-h6">{{ Count(completed_count) }}</p> 
                  <em>No. Of Succesful Request</em>
                  </v-card-text>
              </v-card>
          </v-col>
          <v-col cols="3">
              <v-card>
                <v-card-text class="text-center">
                    <p class="text-h6">{{Count(onprocess)}}</p> 
                    <em>Pending Attempts</em>
                  </v-card-text>
              </v-card>
          </v-col>  <v-col cols="3">
              <v-card>
                <v-card-text class="text-center">
                    <p class="text-h6">{{IsNum((completed_count/count) * 100)}}%</p> 
                    <em>Success Rate</em>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
            
            <v-btn-group
      variant="outlined"
      density="compact"
      divided
    >
    <v-btn @click="search='ALL'" :color="search=='ALL'?'info':''">ALL</v-btn>
    <v-btn @click="search='SUCCESS'"  :color="search=='SUCCESS'?'info':''">SUCCESS</v-btn>
    </v-btn-group>
            <table class="hpb-table hpb-table-border-bottom small-font">
            <thead>
              <tr >
               
                <th class="text-left hp-head">Account ID</th>
                <th class="text-left hp-head">Partner</th>
                <th class="text-left hp-head">Request At</th>
                <th class="text-left hp-head">Status</th>
                <th class="text-right hp-head">Amount</th>
                
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in FILTERDATA" :key="index">
            
                <td :class="Even(index)">{{ item.account_name}}
                  <br/><em><small>{{ item.user_id}}</small></em>
                </td>
                <td :class="Even(index)">{{ item.partner}}</td>
                <td :class="Even(index)">{{ $moment(item.req_dt).format("MMM DD, YYYY hh:mm A")}}</td>
                <td :class="Even(index)"><span :class="'text-'+Status(item.status.toLowerCase())">{{ item.status}}</span></td>
                <td :class="Even(index)" class="text-right">{{ Money(item.amount)}}</td>
              </tr>
            </tbody>
         
          </table>
    
        </v-col>  
    </v-row>
  </v-card>
  <!-- <SettlementDrawer :settlement_id = "settlement_id" :show="show" @FormEvent="FormEvent"/> -->
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
      search:"SUCCESS",
      buycredits:[]
    }),
    created: function () {
     console.log(sessionStorage.account)
     this.from_date = '2025-03-23'//this.$moment().format("YYYY-MM-DD")
     this.to_date = this.$moment().format("YYYY-MM-DD")
      if (!sessionStorage.account) {
       this.setLoggedIn(false)  // Set loggedIn to false when no account is found in sessionStorage
        this.$router.push('/login')
     } else {
       this.setLoggedIn(true)  // Set loggedIn to true when an account is found in sessionStorage
       this._account = JSON.parse(sessionStorage.account)
       api.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.token
       this.getbuycredits()
     }
  
    },
    computed: {
      FILTERDATA(){
          var items = this.buycredits.reduce((res,item)=>{
          if(this.search != 'ALL') {
              if(item.status == this.search) {
                res.push(item)
              }
          } else {
             res.push(item)
          }
          return res
            
        },[])
        return items
      },
      count(){
        return this.buycredits.length
      },
      onprocess(){
        var process = this.buycredits.reduce((res,item)=>{
          if(item.status == "Pending") res++
          return res
        },0)
        return process
      },
      onprocess_total(){
        var process = this.buycredits.reduce((res,item)=>{
          if(item.status == "On-process"){
            res += this.IsNum(item.amount)
          }
          return res
        },0)
        return process
      },
      overall(){
        var total = this.buycredits.reduce((res,item)=>{
          res += this.IsNum(item.amount)
          return res
        },0)
        return total
      },
      completed_total(){
        var process = this.buycredits.reduce((res,item)=>{
          if(item.status == "SUCCESS"){
            res += this.IsNum(item.amount)
          }
          return res
        },0)
        return process
      },
      completed_count(){
        var process = this.buycredits.reduce((res,item)=>{
          if(item.status == "SUCCESS") res++
          return res
        },0)
        return process
      },
      generated_total(){
        var process = this.buycredits.reduce((res,item)=>{
          if(item.status == "Generated"){
            res += this.IsNum(item.amount)
          }
          return res
        },0)
        return process
      },
      generated_count(){
        var process = this.buycredits.reduce((res,item)=>{
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
        this.getbuycredits()
      },
      getData(){
        console.log(this.from_date, this.to_date)
        this.getbuycredits()
      },
      getbuycredits(){

        api.post('admin/qry', {
          type: "buycredits",
          query:"select concat(a.first_name, ' ', a.last_name ) as account_name, b.* from buy_credits b left join accounts a on a.id=b.user_id where to_date(req_dt::text,'YYYY-MM-DD') >= '"+this.from_date+"' and  to_date(req_dt::text,'YYYY-MM-DD') <= '"+this.to_date+"' order by b.id desc"
        })
        .then(response => {
          console.log(response.data)
          if(response.data.status) {
            this.buycredits = response.data.items
          } else {
            this.AlertMsg(response.data.message,"warning")
          }
        })
      },
  
    }
    
  }
</script>
