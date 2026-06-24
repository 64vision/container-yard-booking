<template>
  <v-container fluid>
   
    <v-row>
       <v-col cols="12" sm="6">
         <v-card>
           <v-toolbar density="compact" title="30 Days Sales Reports"> </v-toolbar>
           <v-card-text>       
          
               <BarChart :chartdata="_PERFORMANCES" v-if="viewChart"/>    
             <div class="text-center" v-else>
                 <v-progress-circular
             
             :size="50"
             color="warning"
             indeterminate
           ></v-progress-circular></div>
           
               </v-card-text>
         </v-card>
       </v-col>
       <v-col cols="12" sm="6">
         <v-card>
           <v-toolbar density="compact" title="30 Days Game Share"> </v-toolbar>
           <v-card-text>       
            <div style="width: 500px; margin: auto;">
               <PieChart :chartdata="_GAMESHARE" v-if="viewChart"/>    
             <div class="text-center" v-else>
                 <v-progress-circular
             
             :size="50"
             color="warning"
             indeterminate
           ></v-progress-circular></div>
           </div>
               </v-card-text>
         </v-card>
       </v-col>
      
    </v-row>
    <v-row>
       <v-col cols="12" sm="4">
         <v-card>
           <v-toolbar density="compact" title="Today's Per Game"> </v-toolbar>
           <v-card-text>
             <GameWidgets type="sales"/>
           </v-card-text>
         </v-card>
       </v-col>
       <v-col cols="12" sm="4">
         <v-card>
           <v-toolbar density="compact" title="Today's Winnings Per Game"> </v-toolbar>
           <v-card-text>
             <GameWidgets type="win"/>
           </v-card-text>
         </v-card>
       </v-col>
       <v-col cols="12" sm="4">
         <v-card>
           <v-toolbar density="compact" title="Top Players"> </v-toolbar>
           <v-card-text>
             <table class="hpb-table hpb-table-border-bottom">
                   
                   <tbody>
                     <tr v-for="(item,index) in TOPPLAYERS" :key="index">
                       <td>
                           <div class="pa-4 font-weight-bold" style="height: 25px;" >
                                 <span style="float: left;" >{{item.LastName}}, {{item.FirstName}} </span>  <span style="float: right;">{{Money(item.Balance)}}<v-icon size="small" class="ml-2" color="#eba834">mdi-database</v-icon> </span>
                           </div>
                       </td>
                 
                     </tr>
                   </tbody> 

                 </table>
           </v-card-text>
         </v-card>
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
 sales:[],
 performances:[],
 playerStats:[],
 playersLocation: [],
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
    this.fetchSales()
    this.fetchWin()
    this.fetchPlayers()
    this.fetchLocation()
    this.fetchSalesPerformance()
  }

 },
 computed: {
     TODAYSALES() {
       return this.TOTALSALES()
     },
     TODAYSWIN(){
       return this.TOTALWIN()
     },
     TOPPLAYERS(){
       return this.playerStats.topplayers
     },
     _PERFORMANCES(){
       var labels =[]
       var datas = []
       var groupedData = this.performances.reduce((acc, item) => {
       (acc[item.race_date] = acc[item.race_date] || []).push(item);
       return acc;
     }, {});

     Object.keys(groupedData).forEach(race_date => {
         labels.push(race_date)
         datas.push(this.getTotal(groupedData[race_date]))
       //  total = total +  this.getTotal(groupedData[race_date])
       });
       return {labels:labels,datas:datas}
     },
     _GAMESHARE(){
       var labels = this.$store.state.Seq
       var datas = []

      for (var i = 0; i < this.$store.state.Seq.length; i++) {
          datas.push(this.GameTotal(this.$store.state.Seq[i]))
      }

       return {labels:labels,datas:datas}
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
   fetchPlayers() {
  
       api.get('/admin/player_stats')
     .then(response => {
       if(response.status) {
         console.log("set players", response.data)
           this.playerStats = response.data
       }
     })
     
   },
   fetchSales() {
     console.log( this.from_date,  this.to_date  )
       api.post('/report/qry',{
         table: 'sales_summaries',
         type:'query',
         query: "select * from sales_summaries where to_date(race_date, 'YYYY-MM-DD') >= NOW() - INTERVAL '30 days'"
           })
     .then(response => {
       if(response.status) {
        this.setSalesSummaries(response.data.sales)
         
       }
     })
     
   },

   fetchSalesPerformance() {
     // console.log( this.from_date,  this.to_date  )
       api.post('/report/qry',{
         table: 'sales_summaries',
         type:'query',
         query: "select * from sales_summaries where to_date(race_date, 'YYYY-MM-DD') >= NOW() - INTERVAL '30 days'"
           })
     .then(response => {
       if(response.status) {
           this.performances = response.data.sales
           setTimeout(()=>{
             this.viewChart = true
           }, 500)
       }
     })
     
   },
   fetchLocation(){
     api.get('/admin/player_location')
         .then(response => {
           if(response.status) {
             console.log(response.data)
                 this.playersLocation = response.data.items
           }
         })


   },
   fetchWin() {
     console.log( this.from_date,  this.to_date  )
   api.post('/report/qry',{
     table: 'win_summaries',
     type:'query',
     query: "select * from win_summaries where to_date(race_date, 'YYYY-MM-DD') >= '" + this.from_date + "' and to_date(race_date, 'YYYY-MM-DD') <='" + this.to_date + "'"
       })
 .then(response => {
   if(response.status) {
     console.log(response.data)

       this.setWinSummaries(response.data.win)
   }
 })
}

 }
 
}
</script>
