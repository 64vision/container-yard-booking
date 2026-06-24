<template>
  <v-container fluid>
    <v-responsive
     class="ml-auto mr-auto"
    >
    
    <v-row>
      <v-col cols="6" class="pa-4">
        <v-card>
          <v-toolbar>
            <div class="pa-2 text-h6">
              <v-icon color="info">mdi-calendar</v-icon> {{ $moment().format("MMM DD, YYYY") }}
            </div>
            <v-spacer/>
            <div class="pa-2 text-center">
              CURRENT RACE NO.:
              <div class="text-h4 font-weight-bold">
                  {{race.number}}
              </div>
            </div>
        </v-toolbar>
          <v-card-text class="pa-7">
            <v-row>
                <v-col cols="6">
                  <table width="100%">
                      <tbody>
                      <tr>
                        <td>
                          <div>LAP COUNT:</div>
                          <v-btn color="info" tile  @click="lap--, UpdateLapRace()"><v-icon  size="large">mdi-minus</v-icon></v-btn>
                          <v-btn tile>{{lap}}</v-btn>
                          <v-btn color="info" tile @click="lap++, UpdateLapRace()"><v-icon size="large">mdi-plus</v-icon></v-btn>
                        </td>
                      
                      </tr>
                    </tbody>
                    </table>
                    <div class="mt-6"> Race status: {{race.remarks}}</div>
                   
                </v-col>
                <v-col cols="6">
                    <v-btn size="x-large" color="primary" class="ma-2" :loading="loading1" block @click="loading1=true, newRace()">
                        NEW RACE
                      </v-btn>
                      <v-btn size="x-large" color="warning" class="ma-2"  :loading="loading2" block  @click="loading2=true, closeRace()">
                        CLOSE RACE BETTING
                      </v-btn>
                  </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" class="pa-4">
          <v-card>
           
        
              <v-card-text class="text-center">
                Length ({{results.length}})
                <div style="height:87px">
                  <table style="margin: auto">
                    <tbody>
                      <tr> 
                        <td v-for="(item,index) in results" :key="index">
                 
                            <img
                               height="50"
                               class="ma-1"
                              :src="'../images/b'+item+'.png'"
                             />
                        </td>
                        
                      </tr>
                      </tbody>
                  </table>
                  
                </div>        
                <v-divider inset/>

                <div class="pa-1">
                        <v-fab icon="$vuetify" color="info" class="ma-1" @click="setBall(1)">1</v-fab>
                        <v-fab icon="$vuetify" color="info" class="ma-1" @click="setBall(2)">2</v-fab>
                        <v-fab icon="$vuetify" color="info" class="ma-1" @click="setBall(3)">3</v-fab>
                        <v-fab icon="$vuetify" color="info" class="ma-1" @click="setBall(4)">4</v-fab>
                        <v-fab icon="$vuetify" color="info" class="ma-1" @click="setBall(5)">5</v-fab>
                        <v-fab icon="$vuetify" color="info" class="ma-1" @click="setBall(6)">6</v-fab>
                        <v-fab icon="$vuetify" color="info" class="ma-1" @click="setBall(7)">7</v-fab>
                        <v-fab icon="$vuetify" color="info" class="ma-1" @click="setBall(8)">8</v-fab>
                        <v-fab icon="$vuetify" color="info" class="ma-1" @click="setBall(9)">9</v-fab>
                        <v-fab icon="$vuetify" color="info" class="ma-1" @click="setBall(10)">10</v-fab>
                </div>   
                
              </v-card-text>
              <v-toolbar>
                <v-btn color="warning" @click="results=[]">Clear</v-btn>
                <v-spacer/>
                <v-btn color="primary" @click="confirm=true">Set Result</v-btn>
              </v-toolbar>
          </v-card>
      </v-col>
      
    </v-row>
    
      <v-row>
        <v-col cols="12">
          <p>CAMERA CONTROLLER</p>
        </v-col>
        <v-col cols="3">
          <v-card
          @click="playVideo('Station_ID'), playOverlay('OverlayInput3Out','Results')"
            class="py-8"
            color="surface-variant"
            prepend-icon="mdi-video-image"
            rounded="lg"
            variant="outlined"
          >
        

            <template #title>
              <h2 class="text-h6 font-weight-bold">STATION ID</h2>
            </template>
           
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card
          @click="playVideo('Station_ID'), playOverlay('OverlayInput2In','Odds')"
            class="py-8"
            color="surface-variant"
            prepend-icon="mdi-video-image"
            rounded="lg"
            variant="outlined"
          >
        

            <template #title>
              <h2 class="text-h6 font-weight-bold">ODDS OVERLAY</h2>
            </template>
           
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card
          @click="playVideo('Station_ID'), playOverlay('OverlayInput2In','Odds'), playOverlay('OverlayInput4In','Race_Meta')"
            class="py-8"
            color="surface-variant"
            prepend-icon="mdi-video-image"
            rounded="lg"
            variant="outlined"
          >
        

            <template #title>
              <h2 class="text-h6 font-weight-bold">RACE META</h2>
            </template>
           
          </v-card>
        </v-col>
     

        <v-col cols="3">
          <v-card
                 @click="playVideo('Camera'), playOverlay('OverlayInput2Out','Odds'), playOverlay('OverlayInput1In','Countdown'), closeBetting(3000)"
            class="py-8"
            color="surface-variant"
            prepend-icon="mdi-video-image"
            rounded="lg"
            variant="outlined"
          >
        

            <template #title>
              <h2 class="text-h6 font-weight-bold">Count Down</h2>
            </template>
           
          </v-card>
        </v-col>  
          <v-col cols="3">
          <v-card
            @click="playVideo('Camera')"
            class="py-8"
            color="surface-variant"
            prepend-icon="mdi-video-image"
            rounded="lg"
            variant="outlined"
          >
        

            <template #title>
              <h2 class="text-h6 font-weight-bold">Camera </h2>
            </template>
           
          </v-card>
         </v-col> 
         <v-col cols="3">
          <v-card
                 @click="playVideo('Camera'),  playOverlay('OverlayInput4Out','Race_Meta'), playOverlay('OverlayInput3In','Results'),  StartNew()"
            class="py-8"
            color="surface-variant"
            prepend-icon="mdi-video-image"
            rounded="lg"
            variant="outlined"
          >
        

            <template #title>
              <h2 class="text-h6 font-weight-bold">RESULT</h2>
            </template>
           
          </v-card>
          </v-col>
      </v-row>
    </v-responsive>
    <ConfirmDialog :show="confirm" message="Please confirm result" cancelbtn="cancel" okbtn="Confirm" @ConfirmEvent="conEv"/>
    <ConfirmDialog :show="raceConfirm" message="Would you like to start a new race?" cancelbtn="Not Now" okbtn="Start New Race" @ConfirmEvent="raceEv"/>
  </v-container>
</template>

<script>
import api from '@/plugins/axios.js'
import axios from 'axios'
import {
  mapMutations
} from 'vuex'

export default {
  data: () => ({
    valid: true,
    confirm: false,
    raceConfirm: false,
    username: '',
    race:{},
    lap:0,
    totallap:2,
    loading1: false,
    vMixPath:"http://192.168.1.38:8088/",
    loading2: false,
    nameRules: [
      v => !!v || 'Field is required'
    ],
    results:[],
    password: '',
    info:"Defual value",
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
  methods: {
    ...mapMutations(['setLoggedIn']),
    conEv(e){
      this.confirm = false
      if(e =="ok") {
       // console.log(this.results.join(','))
       if(this.results.length == 10) {
          this.KeyInResult()
       } else {
         this.AlertMsg("Please enter 10 numbers","warning")
       }
      
      }
    },
    raceEv(e){
      this.raceConfirm = false
      if(e =="ok") {
       this.newRace()
      }
    },
    StartNew(){
      setTimeout(()=>{this.raceConfirm = true},2000)
    },
    hasDuplicate(arr){
      return new Set(arr).size !== arr.length;
    },
    getOpenRace(){
      //alert("get open race")
      this.lap = 0
      api.get('race/getopen')
      .then(response => {
        if(response.data.status) {
           this.race = response.data.race
           this.lap = 0
           setTimeout(()=>{this.UpdateLapRace()}, 2000)
           
        } else {
          this.AlertMsg(response.data.message,"warning")
        }
      })
    },
    KeyInResult(){
      api.post('race/key_in',{
          id: this.race.id,
          status: "Complete",
          result:this.results.join(',')
      })
      .then(response => {
        this.loading2 = false
        if(response.data.status) {
           this.race = response.data.race
           this.AlertMsg(response.data.message,"success")
          
           setTimeout(()=>{
            this.results = []
           },3000)
        } else {
          this.AlertMsg(response.data.message,"warning")
        }
      })
    },
    closeBetting(_out){
        setTimeout(()=>{
          this.closeRace()
        },_out)
    },
    closeRace(){
      api.post('race/update',{
          id: this.race.id,
          status: "Closed",
          remarks: "Closed for betting"
      })
      .then(response => {
        this.loading2 = false
        if(response.data.status) {
           this.race = response.data.race
           this.AlertMsg(response.data.message,"success")
        } else {
          this.AlertMsg(response.data.message,"warning")
        }
      })
    },
    UpdateLapRace(){
      console.log("UpdateLapRace")
      api.post('race/update_lap',{
          id: this.race.id,
          lap:{
                result: [{
                race_date: this.$moment().format("dddd, MMM DD YYYY"),
                race: this.race.number,
                lap: this.lap +"/2"
                }]
          }
          
      })
      .then(response => {
        this.loading2 = false
        if(response.data.status) {
          
           this.AlertMsg(response.data.message,"success")
        } else {
          this.AlertMsg(response.data.message,"warning")
        }
      })
    },
    setBall(ball){
      if(this.results.length <10) {
        this.results.push(ball)
        if(this.hasDuplicate(this.results)) {
          this.AlertMsg("Duplicate result not allowed","warning")
          this.results.pop()
        }
      } else {
        this.AlertMsg("Maximum 10 results allowed","warning")
      }
      
    },
    newRace(){
      this.loading1 = true
      api.post('race/open',{})
      .then(response => {
        this.loading1 = false
        if(response.data.status) {
          this.AlertMsg(response.data.message,"success")
            this.getOpenRace()
        } else {
          this.AlertMsg(response.data.message,"warning")
        }
      })
    },
    playVideo (_id) {
      this.info = "Sample New value"
      console.log(axios)
      axios.get(this.vMixPath + 'api/?Function=Fade&Duration=500&input='+_id)
    .then(response => (this.info = response))
    },
    raceMeta(_input, _id) {
      this.info = "Sample New value"
      console.log(axios)
      axios.get('http://localhost:8088/api/?Function='+_input+'&input='+_id)
    .then(response => (this.info = response))
    },
    playOverlay(_input,_id) {
      this.info = "Sample New value"
      console.log(axios)
      axios.get(this.vMixPath + 'api/?Function='+_input+'&input='+_id)
    .then(response => (this.info = response))
    },
    setPreview(_id) {
      this.info = "Sample New value"
      console.log(axios)
      axios.get('http://localhost:8088/api/?Function=PreviewInput&input='+_id)
    .then(response => (this.info = response))
    },
    playCountDown(_input,_id) {
      this.playVideo(1)
      this.info = "Sample New value"
      console.log(axios)
      axios.get('http://localhost:8088/api/?Function='+_input+'&input='+_id)
    .then(response => {
      this.info = response
      setTimeout(()=>{
        this.setPreview(1)
      }, 4000)
      setTimeout(()=>{
        this.hideCountDown("OverlayInput1Out", 'countdown')
      
      }, 6300)
    } )
    },
    hideCountDown(_input,_id){
      console.log(axios)
      axios.get('http://localhost:8088/api/?Function='+_input+'&input='+_id)
    .then(response =>     (this.info = response))
    
    }
  
  
  },
}
  //
</script>
