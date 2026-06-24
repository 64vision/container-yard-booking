<template>
     <v-container fluid>
       <v-row >
            <v-col cols="6" sm="6">
           
            <v-card class="text-center"
              color="surface-variant"
              image="@/assets/cardbg.png"
            >
           
            <template #title>
              <h2 class="text-h6 font-weight-bold">{{Count(players.length)}}</h2>
              <div class="small-font font-weight-thin"><v-icon size="small" color="#fff">mdi-sitemap-outline</v-icon> Players</div> 
            </template>

          
          </v-card>
            </v-col>
             <v-col cols="6" sm="6">
           
            <v-card class="text-center"
             color="surface-variant"
              image="@/assets/cardbg.png"
            >
           
            <template #title>
              <h2 class="text-h6 font-weight-bold"> {{Money(_account.balance)}}</h2>
              <div class="small-font font-weight-thin"><v-icon size="small" color="#fff">mdi-database</v-icon> Credits</div> 

            </template>

          
          </v-card>
            </v-col>
         
       </v-row>
       <v-row>
        <!-- <v-col cols="12" sm="6">
            <v-card>
              <v-toolbar density="compact" title="30 Days Performance"> </v-toolbar>
              <v-card-text style="min-height: 200px;">       
                  <template v-if="sales_performance.length > 0">
                  <LineChart :chartdata="_PERFORMANCES" v-if="viewChart"/>    
                <div class="text-center" v-else>
                    <v-progress-circular
                
                :size="50"
                color="warning"
                indeterminate
              ></v-progress-circular></div>
            </template>
            <template v-else>
              <div class="text-center" ><br/>No sales data available for the last 30 days.</div>
            </template>
                  </v-card-text>
            </v-card>
          </v-col> -->
          <v-col cols="12" sm="12">
            <div class="mb-4 text-center">Today's Sales Performance</div>
            <v-row>
              <v-col cols="6" sm="6">
           
            <v-card class="text-center"
              color="surface-variant"
              image="@/assets/cardbg.png"
            >
           
            <template #title>
              <h2 class="text-h6 font-weight-bold">{{Money(TOTAL_TODAY_SALES)}} </h2>
              <div class="small-font font-weight-thin"><v-icon size="small" color="#fff">mdi-cash-check</v-icon> Sales</div> 
            </template>

          
          </v-card>
            </v-col>
             <v-col cols="6" sm="6">
           
            <v-card class="text-center"
             color="surface-variant"
              image="@/assets/cardbg.png"
            >
           
            <template #title>
              <h2 class="text-h6 font-weight-bold"> {{Money(TOTAL_TODAY_COMM)}}</h2>
              <div class="small-font font-weight-thin"><v-icon size="#fff" color="white">mdi-database</v-icon> Earnings</div> 

            </template>

          
          </v-card>
            </v-col>
              <v-col cols="6">
                     <v-card card class="pa-2 text-center" tile>
                      <div class="text-vblue"><small>(3%)</small> <small>Personal</small></div>
                       <div class="small-font">Sales: {{Money(PERSONAL.sales)}}  <br />   Earnings:  {{Money(Percent(PERSONAL.sales, PERSONAL.comm))}}</div>
                      

                     </v-card>
              </v-col>
              <v-col cols="6">
                     <v-card card class="pa-2 text-center" tile>
                      <div class="text-vblue"><small>(3%)</small> <small>Direct Recruit</small></div>
                      <div class="small-font">Sales: {{Money(DIRECT.sales)}}  <br />   Earnings:  {{Money(Percent(DIRECT.sales, DIRECT.comm))}}</div>
                     

                     </v-card>
              </v-col>
              <v-col cols="6">
                     <v-card card class="pa-2 text-center" tile>
                       <div class="text-vblue"><small>(1%)</small> <small>Downline level 1</small></div>
                        <div class="small-font">Sales: {{Money(DONWLINE.sales)}}   <br />  Earnings:  {{Money(Percent(DONWLINE.sales, DONWLINE.comm))}}</div>
                     
                     </v-card>
              </v-col>
               <v-col cols="6">
                     <v-card card class="pa-2 text-center" tile>
                       <div class="text-vblue"><small>(1%)</small> <small>Downline level 2</small></div>
                        <div class="small-font">Sales: {{Money(DONWLINE2.sales)}}   <br />   Earnings:  {{Money(Percent(DONWLINE2.sales, DONWLINE2.comm))}}</div>
                     
                     </v-card>
              </v-col>
            
              <v-col cols="12">
                  <v-card class="pa-2 text-center" elevation="8"  href="https://play.blazingsphere.net/" target="_blank"
                   color="surface-variant"
              image="@/assets/playbg.png"
                  >
                       <span class="text-h6 font-weight-thin">PLAY BLAZING SPHERE</span>
                  </v-card>
                  
              </v-col>

              <v-col cols="12">
                  <v-card class="pa-2 text-center" elevation="8" 
                  @click="CopyTextLink(_account.referral)"
                   color="surface-variant"
              image="@/assets/cardbg.png"
                  >
                       <span class="text-h6 font-weight-thin">COPY REFERRAL LINK</span>
                  </v-card>
                  
              </v-col>

              <v-col cols="12" class="mt-4">
                 <div class="mb-4 text-center">Latest Sales</div>
                 <div style="max-height: 300px; overflow-y: auto;">
                 <ul class="bs-list">
                    <li v-for="(item,index) in transactions" :key="index">
                        <v-card class="pa-2 mb-1 small-font">
                          
                          <div>
                            {{GameName(item.details.info.game)}}
                              <span style="float: right">{{Money(item.amount)}}</span>
                          </div>
                          <div class="font-weight-thin font-italic">Race Date: {{item.details.info.race_date}}  Race No: {{item.details.info.race_no}}</div>
                         
                        </v-card> 
                    </li>
                 </ul>
                 </div>
              </v-col>
            </v-row>

         

          </v-col>
         
       </v-row>
      
 </v-container>
    
</template>
<script>
import api from '@/plugins/axios.js'
import {
  mapMutations
} from 'vuex'
  export default {
    data: () => ({
    _account:{},
    sales_summaries:[],
    win_summaries:[],
    viewChart: false,
    from_date:'',
    sales_performance:[],
    players:[],
    playersLocation: [],
    settlements:[],
    sales:[],
    today_data:{},
    transactions:[],
    to_date:''
    }),
    created: function () {
     console.log(sessionStorage.account)
     this.to_date = this.$moment().format('YYYY-MM-DD')
     this.from_date = this.$moment().format('YYYY-MM-DD')
      if (!sessionStorage.account) {
       this.setLoggedIn(false)  // Set loggedIn to false when no account is found in sessionStorage
        this.$router.push('/login')
     } else {
       this._account = JSON.parse(sessionStorage.account)
       this.setLoggedIn(true)  // Set loggedIn to true when an account is found in sessionStorage
       this._account = JSON.parse(sessionStorage.account)
       api.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.token
     // this.fetchSales()
    // this.fetchPerformance()
       this.fetchPlayers()
       //this.fetchPlayerLocations()
       this.fetchSettlements()
       this.fetchTodayPerformance()
       this.fetchBets()
     }
  
    },
    computed: {
      TOTALSALES() {
          var total = 0
          this.sales.reduce((res, item) =>{
            total = total +  item.sales
            return total
          }, 0)
          return total
        },
        TOTALCOMM(){
          return this.TOTALSALES * (this._account.commission/100)
        },
        TOPPLAYERS(){
          
          return this.players.slice(0, 10)
          //return this.playerStats.topplayers
        },
        _PERFORMANCES(){
          var labels =[]
          var datas = []
          this.sales_performance.reduce((res, item) =>{
              labels.push(item.covered_date)
              datas.push(item.sales)
          }, [])
          return {labels:labels,datas:datas}
        },
         PERSONAL(){
          if(this.today_data.personal != undefined) { 
              if(this.today_data.personal.sales != null){
                  return this.today_data.personal.sales[0]
              } 
          }
          return [{sales:0,comm:0}]
        },
        DIRECT(){
          if(this.today_data.direct != undefined) { 
              if(this.today_data.direct.sales != null){
                  return this.today_data.direct.sales[0]
              } 
          }
          return [{sales:0,comm:0}]
        },
        DONWLINE(){
          if(this.today_data.sub_upline != undefined) { 
              if(this.today_data.sub_upline.sales != null){
                  return this.today_data.sub_upline.sales[0]
              } 
          }
          return [{sales:0,comm:0}]
        },
        DONWLINE2(){
          if(this.today_data.upline != undefined) { 
              if(this.today_data.upline.sales != null){
                  return this.today_data.upline.sales[0]
              } 
          }
          return [{sales:0,comm:0}]
        },
        TOTAL_TODAY_SALES(){
          return this.IsNum(this.PERSONAL.sales) + this.IsNum(this.DIRECT.sales) + this.IsNum(this.DONWLINE.sales) + this.IsNum(this.DONWLINE2.sales)
        },
         TOTAL_TODAY_COMM(){
          return this.IsNum(this.Percent(this.PERSONAL.sales, this.PERSONAL.comm)) + this.IsNum(this.Percent(this.DIRECT.sales, this.DIRECT.comm)) + this.IsNum(this.Percent(this.DONWLINE.sales, this.DONWLINE.comm)) + this.IsNum(this.Percent(this.DONWLINE2.sales, this.DONWLINE2.comm))
        }  
    },
    methods: {
      ...mapMutations(['setLoggedIn', 'setSalesSummaries', 'setWinSummaries']), 
      getTotal(items){
        var total = 0
         items.reduce((res, item) =>{
         
          total = total +  this.gross_per_game(item.per_game)
          return total
        }, 0)
        return total
      },
      fetchSettlements() {
        api.post('/agent/data_qry',{
              type: 'settlements',
              query: "select * from settlements where agent_id="+this._account.id+" order by id desc limit 10"
          })
          .then(response => {
            console.log("settlements", response.data)
            if(response.status) {
              this.settlements = response.data.items
            }
          })
      },
      fetchPlayers() {
         var qry_str = "select * from accounts where direct_upline="+this._account.id +" or sub_upline = " + this._account.id + " or upline = " + this._account.id + " order by id desc"
            api.post('/agent/qry',{
              table: 'accounts',
              type: 'query',
              query:qry_str
          })
          .then(response => {
            console.log(response.data)
            if(response.status) {
          
              this.players = response.data.accounts
              
            }
          })
      },
      fetchPerformance() {
        api.post('/agent/data_qry',{
              type: 'sales',
              query: "select sum(sales) as sales, covered_date from agent_sales where agent_id="+this._account.id+" group by covered_date limit 30"
          })
          .then(response => {
            console.log(response.data)
            if(response.status) {
          
              this.sales_performance = response.data.items
              this.sales_performance = this.sales_performance.reverse()
              this.viewChart = true
              
            }
          })
        
      },
      fetchPlayerLocations() {
        api.post('/agent/data_qry',{
              type: 'location',
              query: "select loc.* from locations loc left join accounts a on a.id=loc.account_id where a.agent="+this._account.id+" and lat is not null order by loc.id desc limit 200 "
          })
          .then(response => {
            if(response.status) {
              this.playersLocation = response.data.items
            }
          })
        
      },

      fetchTodayPerformance() {
        api.post('/agent/performance',{
              type: 'direct',
              date: this.$moment().format('YYYY-MM-DD'),
              account_id: this._account.id,
          })
          .then(response => {
            console.log(response.data)
            if(response.status) {
              this.today_data = response.data
            }
          })
        
      },
      fetchSales() {
        api.post('/agent/data_qry',{
              type: 'sales',
              query: "select * from agent_sales where agent_id="+this._account.id
          })
          .then(response => {
            console.log(response.data)
            if(response.status) {
              this.sales = response.data.items
            }
          })
        
      },
       fetchBets(){
          var _date= this.$moment().format('YYYY-MM-DD')
           api.post('/agent/qry',{
             table: 'transactions',
             type: 'query',
             query: "select t.* from transactions as t left join accounts a on a.id=t.account_id where t.type = 'payment' and to_date(t.created_at::text, 'YYYY-MM-DD') = '"+_date+"' and  (a.direct_upline =  "+this._account.id+ " or a.sub_upline =  "+this._account.id+ " or a.upline =  "+this._account.id+ " or a.id="+this._account.id+") order by t.id desc limit 100"
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
