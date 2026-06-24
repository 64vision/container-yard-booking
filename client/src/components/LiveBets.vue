<template>
<v-container fluid >
  <v-toolbar density="compact" color="primary">
              <v-toolbar-title><v-icon size="small" class="mr-2" theme="dark">mdi-flag-checkered</v-icon>Ongoing Race</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

    <v-row>
      <v-col cols="8">

          <v-card class="elevation-0">
           <v-toolbar>
            <span class="pa-4"> {{$moment( race.date).format("MMMM DD, YYYY")}}</span>
            <v-spacer></v-spacer>
            <span class="pa-4"> RACE NO.: {{race.number}}</span>
            <v-spacer></v-spacer>
            <span class="pa-4"> Status: {{race.status}}</span>
           </v-toolbar>
            <div class="pa-10 text-center text-h1 font-weight-bold">{{Money(TOTAL)}}</div>
            <v-card-text>
              <v-row>
                  <v-col cols="3">  
                    <v-card class="text-center">
                     <span class="text-h6 font-weight-light">HYPER WIN</span>
                     <p class="text-h4 font-weight-light text-info">{{Money(getSales('HW'))}}</p>
                    </v-card>
                  </v-col>
                  <v-col cols="3">  
                    <v-card class="text-center">
                      <span class="text-h6 font-weight-light">HYPER 2</span>
                      <p class="text-h4 font-weight-light text-info">{{Money(getSales('H2'))}}</p>
                    </v-card>
                  </v-col>
                  <v-col cols="3">  
                    <v-card class="text-center">
                      <span class="text-h6 font-weight-light">HYPER 3</span>
                      <p class="text-h4 font-weight-light text-info">{{Money(getSales('H3'))}}</p>
                    </v-card>
                  </v-col>
                  <v-col cols="3">  
                    <v-card class="text-center">
                      <span class="text-h6 font-weight-light">HYPER 5</span>
                      <p class="text-h4 font-weight-light text-info">{{Money(getSales('H5'))}}</p>
                    </v-card>
                  </v-col>
                  <v-col cols="3">  
                    <v-card class="text-center">
                      <span class="text-h6 font-weight-light">SUPER 6</span>
                      <p class="text-h4 font-weight-light text-info">{{Money(getSales('S6'))}}</p>
                    </v-card>
                  </v-col>
                  <v-col cols="3"> 
                    <v-card class="text-center">
                      <span class="text-h6 font-weight-light">SUPER 7</span>
                      <p class="text-h4 font-weight-light text-info">{{Money(getSales('S7'))}}</p>
                    </v-card>
                  </v-col>
                  <v-col cols="3">  
                    <v-card class="text-center">
                      <span class="text-h6 font-weight-light">SUPER 8</span>
                      <p class="text-h4 font-weight-light text-info">{{Money(getSales('S8'))}}</p>
                    </v-card>
                  </v-col>
                  <v-col cols="3">  
                    <v-card class="text-center">
                      <span class="text-h6 font-weight-light">SUPER 9</span>
                      <p class="text-h4 font-weight-light text-info">{{Money(getSales('S9'))}}</p>
                    </v-card>
                  </v-col>
              </v-row>
              
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-toolbar>
            <span class="pa-4"> Latest Bets</span>
          
           </v-toolbar>
           <v-card-text>
            <div style="height: 800px; overflow: scroll;">
              <div v-for="(item,index) in transactions" :key="index" class="pa-1">
                <span style="float: right;">{{Money(item.details.info.amount)}}</span>
                <span>{{item.details.info.game}}</span> | <span>{{item.details.info.balls}}</span> | <span>{{item.details.info.province}}</span>| <span>{{item.details.info.city}}</span>
                <br/>
                <span class="font-italic text-warning">{{$moment(item.details.info.trans_dt).format("ddd hh:mm:ss a")}}</span>
             <v-divider :key="index +'-item'"/>
              </div>
            </div>  
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
      actform: false,
      acthistory: false,
      loading: false,
      valid: true,
      drawer: false,
      games_settings:[],
      sys_settings:[],
      race:{},
      pergame:[],
      transactions:[]
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
       this.getOpenRace()
     }
  
    },
    computed: {
      TOTAL(){
        let data = this.pergame.reduce((res, item) =>{
          res+=item.total
          return res
   
       }, 0)
       return data
      }
    },
    methods: {
      ...mapMutations(['setLoggedIn']),
      getSales(game){
        if(this.pergame == "") {
          return 0
        }
        let data = this.pergame.reduce((res, item) =>{
          if(game == item.game) {
            res =  item
          }
          return res
   
       }, {})
       return data.total
      },
      getOpenRace(){
      api.get('race/getopen')
      .then(response => {
        if(response.data.status) {
           this.race = response.data.race
            this.Query()
            this.LatestBets()
    
        } else {
          this.AlertMsg(response.data.message,"warning")
        }
      })
    },
    Query(){
      api.post('admin/qry_bets', {
        int_value: this.race.id,
        type: 'per game',
        table: 'sales',
      })
      .then(response => {
        if(response.data.status) {
           this.pergame = response.data.pergame
          console.log(response.data)
           
        } else {
          this.AlertMsg(response.data.message,"warning")
        }
      })
    },
      
        LatestBets(){
          
          api.post('/admin/qry',{
             table: 'transactions',
             type: 'query',
             query: "select * from transactions where type='payment' order by id desc limit 200"
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
