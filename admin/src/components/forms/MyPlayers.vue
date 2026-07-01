<template>
 <v-navigation-drawer v-model="drawer" location="right" width="1200"  temporary>
      <div>
          <v-row>
            <v-col cols="12">
             
            <div class="pa-4 ">
              <div class="font-weight-bold text-center">Player Network of {{account.last_name}}, {{account.first_name}}</div>
            </div>
            <div>
              <v-row>
      <v-col cols="12">
          <v-card tile class="elevation-0">

            <v-card-text>
              <template v-if="players != null">
                <div class="pa-2 text-info text-center">Total number of players: {{Count(players.length)}}</div>
                    <table class="hpb-table hpb-table-border-bottom">
                     
                      <tbody>
                        <tr v-for="item in DirectPlayers" :key="item.id">
                        
                          <td>{{ item.last_name }}, {{ item.first_name }}  <v-chip size="x-small" :color="Status(item.status)">
                              {{ item.status}}
                            </v-chip> <br/>
                            <em><v-icon color="warning" size="small">mdi-phone</v-icon> {{ item.mobile_no}}</em> /  <em>Registered: {{ $moment(item.created_at).format("MMM DD, YYYY")}}</em>  /  <em><v-icon color="warning" size="small">mdi-database</v-icon> {{ Money(item.balance)}} </em>
                          </td>
                           <td>
                              <table class="hpb-table hpb-table-border-bottom" style="background-color:beige;">
                                <tr v-for="subitem in getDirectPlayers(item.id)" :key="'s' + subitem.id">
                                  <td>
                                   {{ subitem.last_name }}, {{ subitem.first_name }}  
                                    <v-chip size="x-small" :color="Status(subitem.status)">{{ subitem.status}}</v-chip> <br/>
                                    <em><v-icon color="warning" size="small">mdi-phone</v-icon> {{ subitem.mobile_no}}</em> /  
                                    <em>Registered: {{ $moment(subitem.created_at).format("MMM DD, YYYY")}}</em>  /  
                                    <em><v-icon color="warning" size="small">mdi-database</v-icon> {{ Money(subitem.balance)}} </em>
                                  </td>
                                  <td>
                              <table class="hpb-table hpb-table-border-bottom" style="background-color:#f0f0f0;">
                                <tr v-for="_subitem in getDirectPlayers(subitem.id)" :key="'_s' + _subitem.id">
                                  <td>
                                          {{ _subitem.last_name }}, {{ _subitem.first_name }}  
                                            <v-chip size="x-small" :color="Status(_subitem.status)">{{ _subitem.status}}</v-chip> <br/>
                                            <em><v-icon color="warning" size="small">mdi-phone</v-icon> {{ _subitem.mobile_no}}</em> /  
                                            <em>Registered: {{ $moment(_subitem.created_at).format("MMM DD, YYYY")}}</em>  /  
                                            <em><v-icon color="warning" size="small">mdi-database</v-icon> {{ Money(_subitem.balance)}} </em>
                                          </td>
                                        </tr>
                                      </table>
                                  </td>
                                </tr>
                              </table>
                           
                          </td>
                        
                        
                        </tr>
                      </tbody>
                    </table>
                   
                    </template>
                     <div class="text-center pa-8 text-info font-italic" v-else>No players found.</div>
                  </v-card-text>
                  </v-card>
              </v-col>
              </v-row>
            </div>
            </v-col>
          </v-row>
      </div>   
    </v-navigation-drawer>
</template>

<script>
import api from '@/plugins/axios.js'
export default {
    data: () => ({
        drawer: false,
        account: {},
        agent:{},
        players:[],
        levels: [{'Label': 'Player',  id:1}, {'Label': 'Sub-Agent', id:2}]
        
    }),
  props: {
      show:{
          type: Boolean,
          default: false
      },
      account_id: {
            type: Number,
            default: 0
      },
      okbtn: {
          type: String,
          default:''
      },
      cancelbtn: {
          type: String,
          default:''
      }
  },
  watch: {
    show(val) {
      this.drawer = val
      console.log("value: " + val)
      if(val){
       
          this.players = []
          this.fetchAccount()
         
      }
    },
    drawer(val) {
        console.log("value: " + val)
        if(!val) {
            this.emitToParent('close')
        }
    }
  },
  computed: {
    dialog(){
        return this.show
    },
    DirectPlayers(){
      return this.players.filter(player => player.direct_upline === this.account.id);
    },
  },
  methods: {
   emitToParent (action) {
      this.$emit('FormEvent', action)
    },
    getDirectPlayers(accountID){
      return this.players.filter(player => player.direct_upline === accountID);
    },
    update(){
      if(this.IsNum(this.account.commission) >= this.IsNum(this.agent.commission)){
        this.AlertMsg("Commission must less than your current commision!","warning")
        return
      }
        api.post('/agent/qry',{
          table: 'accounts',
          type: 'update account',
          query: "update accounts set commission='"+ this.IsNum(this.account.commission)+"', level='"+ this.IsNum(this.account.level)+"'  where id="+this.account_id
      })
      .then(response => {
        if(response.status) {
            console.log(this.account_id, response.data)
            this.fetchAccount()
            this.AlertMsg("Account data saved!","success")
        } else {
            this.AlertMsg(response.data.message,"warning")
        }
      })
    
    },
    fetchAccount(){
        api.post('/admin/qry',{
          table: 'accounts',
          type: 'query',
          query: "select * from accounts where id="+this.account_id
      })
      .then(response => {
        if(response.status) {
            console.log(this.account_id, response.data)
           this.account = response.data.accounts[0]
           this.getPlayers()
        }
      })
    
    },
    getPlayers() {
   
        var qry_str = "select * from accounts where direct_upline="+this.account.id +" or sub_upline = " + this.account.id + " or upline = " + this.account.id + " order by id desc"
        // if(this.account.level == 2) {
        //   qry_str = "select * from accounts where sub_agent="+this.account.id + " and id != " + this.account.id + " order by id desc"
        // }
      this.players = []
        api.post('/admin/qry',{
              table: 'accounts',
              type: 'query',
              query: qry_str
          })
      .then(response => {
        if(response.status) {
      
            this.players = response.data.accounts
        }
      })
      }
  }
}
</script>
