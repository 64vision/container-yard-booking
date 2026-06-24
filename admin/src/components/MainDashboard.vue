<template>
     <v-container fluid>
       <v-row >
            <v-col cols="6" sm="3">
           
              <v-card
            class="py-4"
            image="@/assets/img/acctfeat.png"
          >
            <template #image>
              <v-img position="top right" />
            </template>

            <template #title>
              <h2 class="text-h5 font-weight-bold">{{playerStats.verified}}</h2>
            </template>

            <template #subtitle>
              <div class="font-weight-thin">
                  Player Accounts
              </div>
            </template>

        
          </v-card>
            </v-col>
            <v-col cols="6" sm="3">
              <v-card
            class="py-4"
            image="@/assets/img/salesfeat.png"
          >
            <template #image>
              <v-img position="top right" />
            </template>

            <template #title>
              <h2 class="text-h5 font-weight-bold">{{Money(TODAYSALES)}}</h2>
            </template>

            <template #subtitle>
              <div class="font-weight-thin">
                  Today's Sales
              </div>
            </template>

        
          </v-card>
            </v-col>
            <v-col cols="6" sm="3">
              <v-card
            class="py-4"
             image="@/assets/img/winfeat.png"
          >
            <template #image>
              <v-img position="top right" />
            </template>

            <template #title>
              <h2 class="text-h5 font-weight-bold">{{Money(TODAYSWIN)}}</h2>
            </template>

            <template #subtitle>
              <div class="font-weight-thin">
                  Today's Win
              </div>
            </template>

        
          </v-card>
            </v-col>
            <v-col cols="6" sm="3">
              <v-card
            class="py-4"
             image="@/assets/img/revfeat.png"
          >
            <template #image>
              <v-img position="top right" />
            </template>

            <template #title>
              <h2 class="text-h5 font-weight-bold">{{Money(TODAYSALES-TODAYSWIN)}}</h2>
            </template>

            <template #subtitle>
              <div>
                Today's Revenue
              </div>
            </template>

        
          </v-card>
            </v-col>
       </v-row>
       <v-row>
          <v-col cols="12" sm="6">
            <v-card>
              <v-toolbar density="compact" title="15 Days Performance"> </v-toolbar>
              <v-card-text>       
                
                  <LineChart :chartdata="_PERFORMANCES" v-if="viewChart"/>    
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
              <v-toolbar density="compact" title="Geographical distribution of the players" icon="mdi-plus"> </v-toolbar>
              <v-card-text>
 
                            <HeatMap :locations="playersLocation"/>
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
            query: "select * from sales_summaries where to_date(race_date, 'YYYY-MM-DD') >= '" + this.from_date + "' and to_date(race_date, 'YYYY-MM-DD') <='" + this.to_date + "'"
              })
        .then(response => {
          if(response.status) {
            console.log(response.data)
              this.setSalesSummaries(response.data.sales)
          }
        })
        
      },

      fetchSalesPerformance() {
        // console.log( this.from_date,  this.to_date  )
          api.post('/report/qry',{
            table: 'sales_summaries',
            type:'query',
            query: "select * from sales_summaries where to_date(race_date, 'YYYY-MM-DD') >= NOW() - INTERVAL '15 days'"
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
