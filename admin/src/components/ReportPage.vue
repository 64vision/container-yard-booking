<template>
<v-container fluid >
 
    <v-row>
      <v-col cols="12">


          <v-toolbar density="compact" color="white">
              <v-toolbar-title><v-icon size="small" class="mr-2">mdi-chart-box-multiple-outline</v-icon>Reports</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
    </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">


          <v-toolbar density="compact" class="elevation-1">
              <v-toolbar-title>{{type}}</v-toolbar-title>
              <v-spacer></v-spacer>
                <span style="width: 200px;">
                <v-select
                v-model="type"
                label="Select Type"
                density="compact"
                variant="outlined"
                hide-details
                :items="['Daily Summary', 'Per Game', 'Geographical Distribution' ]"
                />
                </span>                  
            </v-toolbar>
            <div class="pa-4">
            <v-toolbar  color="white">
            <div style="width: 250px;"  class="hp-date"> 
              <label for="FromDate">From:</label>
              <input type="date" id="FromDate" v-model="from_date" name="FromDate" >
               </div>
               <div style="width: 250px; margin-left: 10px;" class="hp-date"> 
                <label for="ToDate">To:</label>
                <input type="date" id="ToDate" v-model="to_date" name="ToDate" @change="fetchSales(), fetchWin()">
               </div>
            </v-toolbar>   
          </div>
          <DailySummary v-if="type=='Daily Summary'" :sales_summaries="sales_summaries" :win_summaries="win_summaries"/>
          <PerGame v-if="type=='Per Game'" :sales_summaries="sales_summaries" :win_summaries="win_summaries"/>
          <PerAgent v-if="type=='Per Agent'" :sales_summaries="sales_summaries" :win_summaries="win_summaries"/>
          <PerProvince v-if="type=='Geographical Distribution'" :sales_summaries="sales_summaries" :win_summaries="win_summaries"/>
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
      type:'Daily Summary',
      from_menu: false,
      to_menu: false,
      from_date:'',
      to_date:'',
      actform: false,
      acthistory: false,
      loading: false,
      valid: true,
      drawer: false,
      selectedDate:"",
      sales_summaries:[],
      win_summaries:[],
    }),
    created: function () {
      this.from_date = this.$moment().format("YYYY-MM-DD")
      this.to_date = this.$moment().format("YYYY-MM-DD")
      if (!sessionStorage.account) {
       this.setLoggedIn(false)  // Set loggedIn to false when no account is found in sessionStorage
        this.$router.push('/login')
     } else {
       this.setLoggedIn(true)  // Set loggedIn to true when an account is found in sessionStorage
       this._account = JSON.parse(sessionStorage.account)
       api.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.token
       this.fetchSales()
       this.fetchWin()
     }
  
    },
    computed: {
      TOTAL(){
        var total = 0
         this.sales_summaries.reduce((res, item) =>{
         
          total = total +  this.gross_per_game(item.per_game)
          return total
        }, 0)
        return total
      },
      WINTOTAL(){
        var total = 0
         this.sales_summaries.reduce((res, item) =>{
         
          total = total +  this.win_per_game(item.race_id)
          return total
        }, 0)
        return total
      }
    
    },
    methods: {
      ...mapMutations(['setLoggedIn']),
     
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
          this.win_summaries = response.data.win
      }
    })
    
      },
      fetchSales() {
        console.log( this.from_date,  this.to_date  )
      api.post('/report/qry',{
        table: 'sales_summaries',
        type:'query',
        query: "select * from sales_summaries where to_date(race_date, 'YYYY-MM-DD') >= '" + this.from_date + "' and to_date(race_date, 'YYYY-MM-DD') <='" + this.to_date + "' order by id asc"
          })
    .then(response => {
      if(response.status) {
        console.log(response.data)
          this.sales_summaries = response.data.sales
      }
    })
    
      }
    }
    
  }
</script>
