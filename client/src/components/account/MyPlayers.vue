<template>
 <v-navigation-drawer v-model="drawer" location="right" width="600"  temporary>
      <div>
          <v-row>
            <v-col cols="12">
             
            <div class="pa-4">
              <div class="font-weight-bold ma-2">Profile
                <span style="float: right">
                <v-btn size="small"
                variant="flat" color="success" text @click="update()"><v-icon class="mr-2" color="white">mdi-content-save-check</v-icon>Save</v-btn>
              </span>
              </div>
              <v-divider class="mb-1"/>
              <v-row>
                <v-col cols="12" class="text-center">
                  <div class="ma-4">
                          <v-img
                          height="150"
                          src="@/assets/profile.png"
                        />
                       
                    </div>
                </v-col>
              </v-row>
            </div>
            <div>
              <v-row>
      <v-col cols="12">
          <v-card tile class="elevation-0">

            <v-card-text>
                    <table class="hpb-table hpb-table-border-bottom">
                      <thead>
                        <tr>
                          <th class="text-left">Name</th>
                          <th class="text-left">Registered</th>
                          <th class="text-left">Last Login</th>
                          <th class="text-right">Credits</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in players" :key="item.id">
                        
                          <td>{{ item.last_name }}, {{ item.first_name }}  <v-chip size="x-small" :color="Status(item.status)">
                              {{ item.status}}
                            </v-chip> <br/>
                            <em>{{ item.mobile_no}}</em>
                          </td>
                          <td>{{ $moment(item.created_at).format("MMM DD, YYYY")}}</td>
                          <td class="font-italic text-info">{{ $moment(item.updated_at).fromNow() }}</td>
                          <td class="text-right">{{ Money(item.balance)}} <v-icon color="warning" size="small">mdi-database</v-icon></td>
                        </tr>
                      </tbody>
                    </table>
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
          this.agent = JSON.parse(sessionStorage.account)
          this.players = []
          this.fetchAccount()
          this.getPlayers()
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
    }
  },
  methods: {
   emitToParent (action) {
      this.$emit('FormEvent', action)
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
      
        api.post('/agent/qry',{
          table: 'accounts',
          type: 'query',
          query: "select * from accounts where id="+this.account_id
      })
      .then(response => {
        if(response.status) {
            console.log(this.account_id, response.data)
           this.account = response.data.accounts[0]
          
        }
      })
    
    },
    getPlayers() {
        api.post('/agent/qry',{
              table: 'accounts',
              type: 'query',
              query: "select * from accounts where sub_agent="+this.account_id + " and id != " + this.account_id + " order by id desc"
          })
      .then(response => {
        if(response.status) {
          console.log(response.data)
            this.players = response.data.accounts
        }
      })
      }
  }
}
</script>
