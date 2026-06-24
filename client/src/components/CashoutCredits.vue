<template>
<v-container fluid >
          

    <v-row>
            <v-toolbar>
              <v-toolbar-title><v-icon size="small" class="mr-2" theme="dark">mdi-file-document-multiple</v-icon>CREDIT CASH OUTS</v-toolbar-title>
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
          <v-col cols="4">
              <v-card>
                  <v-card-text class="text-center">
                    <p class="text-h6">{{ Money(completed_total) }}</p> 
                    <em>Total Cashout</em>
                  </v-card-text>
              </v-card>
          </v-col>
           <v-col cols="4">
              <v-card>
                <v-card-text class="text-center">
                  <p class="text-h6">{{ Count(completed_count) }}</p> 
                  <em>No. Of Succesful Request</em>
                  </v-card-text>
              </v-card>
          </v-col>
          <v-col cols="4">
              <v-card>
                <v-card-text class="text-center">
                    <p class="text-h6">{{Count(onprocess)}}</p> 
                    <em>Pending Requests</em>
                  </v-card-text>
              </v-card>
          </v-col>
          
      </v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
            

         
            <table class="hpb-table hpb-table-border-bottom">
            <thead>
              <tr >
                <th class="text-left hp-head" style="width: 50px;"></th>
                <th class="text-left hp-head" style="width: 250px;">Account ID</th>
                <th class="text-left hp-head">Bank</th>
                <th class="text-left hp-head">Request At</th>
                <th class="text-left hp-head">Status</th>
                <th class="text-right hp-head">Amount</th>
                
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in cashouts" :key="index">
                <td :class="Even(index)" class="text-center">
                  <v-menu location="end" color="success" v-if="item.status=='Requested' || item.status=='Pending'" >
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" variant="text" size="small" v-bind="props"></v-btn>
                </template>
                <div class="account-menu">
                 <v-btn block size="small" variant="text" @click="cashout_id=item.id, status='Completed', conMsg='Would you like to complete this request?', confirm=true">Set Complete</v-btn>
                 <v-btn block size="small" variant="text" @click="cashout_id=item.id, status='Pending', conMsg='Set pending status for this request?', confirm=true">Set Pending</v-btn>
                 <v-btn block size="small" variant="text" @click="cashout_id=item.id, status='Cancelled', conMsg='Would you like to Cancel this request?', confirm=true">Cancel Request</v-btn>
                 <v-btn block size="small" variant="text" @click="cashout_id=item.id, status=item.status, remark=true">Add Remarks</v-btn>
                </div> 
                </v-menu>
                </td>
                <td :class="Even(index)">{{ item.account_id}}
                 
                </td>
                <td :class="Even(index)">
                  <div class="pa-2" style="font-size: .9em;">
                  Name: {{ item.bank.name}} <br />
                  Number: {{ item.bank.number}} <br />
                  Type: {{ item.bank.type}} 
                </div>
                </td>
                <td :class="Even(index)">{{ $moment(item.req_at).format("MMM DD, YYYY hh:mm A")}}</td>
                <td :class="Even(index)"><span :class="'text-'+Status(item.status.toLowerCase())">{{ item.status}}</span>
                  <p v-if="item.remarks" class="font-italic">Remarks: <span class="text-warning">{{item.remarks}}</span></p>
                  <template v-if="remark && cashout_id==item.id">
                      <v-textarea rows="1" v-model="remarkMsg" hide-details="true"/>
                      <v-btn @click="updateCashout()" size="small" color="info" class="ma-2">Save</v-btn>
                  </template>
                </td>
                <td :class="Even(index)" class="text-right">{{ Money(item.amount)}}</td>
              </tr>
            </tbody>
         
          </table>
    
        </v-col>  
    </v-row>
  </v-card>
  <!-- <SettlementDrawer :settlement_id = "settlement_id" :show="show" @FormEvent="FormEvent"/> -->
   <ConfirmDialog :show="confirm" :message="conMsg" okbtn="Proceed" cancelbtn="Cancel" @ConfirmEvent="conEv"/>
</v-container>
</template>
<script>
import api from '@/plugins/axios.js'
import {
  mapMutations
} from 'vuex'

  export default {
    data: () => ({
      remarkMsg: '',
      remark: false,
      confirm: false,
      cashout_id:0,
      show: false,
      status: 'Completed',
      conMsg:'',
      cashouts:[]
    }),
    created: function () {
     console.log(sessionStorage.account)
     this.from_date = this.$moment().format("YYYY-MM-DD")
     this.to_date = this.$moment().format("YYYY-MM-DD")
      if (!sessionStorage.account) {
       this.setLoggedIn(false)  // Set loggedIn to false when no account is found in sessionStorage
        this.$router.push('/login')
     } else {
       this.setLoggedIn(true)  // Set loggedIn to true when an account is found in sessionStorage
       this._account = JSON.parse(sessionStorage.account)
       api.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.token
       this.getcashouts()
     }
  
    },
    computed: {
      count(){
        return this.cashouts.length
      },
      onprocess(){
        var process = this.cashouts.reduce((res,item)=>{
          if(item.status == "Requested" || item.status == "Pending") res++
          return res
        },0)
        return process
      },
      onprocess_total(){
        var process = this.cashouts.reduce((res,item)=>{
          if(item.status == "On-process"){
            res += this.IsNum(item.amount)
          }
          return res
        },0)
        return process
      },
      overall(){
        var total = this.cashouts.reduce((res,item)=>{
          res += this.IsNum(item.amount)
          return res
        },0)
        return total
      },
      completed_total(){
        var process = this.cashouts.reduce((res,item)=>{
          if(item.status == "Completed"){
            res += this.IsNum(item.amount)
          }
          return res
        },0)
        return process
      },
      completed_count(){
        var process = this.cashouts.reduce((res,item)=>{
          if(item.status == "Completed") res++
          return res
        },0)
        return process
      },
      generated_total(){
        var process = this.cashouts.reduce((res,item)=>{
          if(item.status == "Generated"){
            res += this.IsNum(item.amount)
          }
          return res
        },0)
        return process
      },
      generated_count(){
        var process = this.cashouts.reduce((res,item)=>{
          if(item.status == "Generated") res++
          return res
        },0)
        return process
      },
    },
    methods: {
      ...mapMutations(['setLoggedIn']),
      conEv(e){
        this.confirm = false
        if(e == "ok"){
          this.updateCashout()
        }
      },
      FormEvent(){
        this.show = false
        this.getcashouts()
      },
      updateCashout(){
        api.post('admin/update_cashout', {id:this.cashout_id,status:this.status, remarks:this.remarkMsg})
        .then(response => {
          console.log(response.data)
          if(response.data.status) {
            this.remark = false
            this.getcashouts()
            this.AlertMsg(response.data.message,"success")
          } else {
            this.AlertMsg(response.data.message,"warning")
          }
        })
      },
      getData(){
        console.log(this.from_date, this.to_date)
        this.getcashouts()
      },
      getcashouts(){

        api.post('admin/qry', {
          type: "cashouts",
          query:"select * from cashouts where to_date(req_at::text,'YYYY-MM-DD') >= '"+this.from_date+"' and  to_date(req_at::text,'YYYY-MM-DD') <= '"+this.to_date+"' order by id desc"
        })
        .then(response => {
          console.log(response.data)
          if(response.data.status) {
            this.cashouts = response.data.items
          } else {
            this.AlertMsg(response.data.message,"warning")
          }
        })
      },
  
    }
    
  }
</script>
