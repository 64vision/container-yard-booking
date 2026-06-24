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
              <table class="hpb-table profile-tbl hpb-table-border-bottom">
                  <tbody>
               
                    <tr>
                      <td class="text-left" width="250px">
                        USERNAME:
                      </td>
                      <td class="text-left">
                        <span class="ml-2 text-h6">{{account.username}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" width="250px">
                        FULLNAME:
                      </td>
                      <td>
                        <span class="ml-2 text-h6">{{account.last_name}},{{account.first_name}} </span>
                      </td>
                    </tr>
                    
                     
                       
                    <tr>
                      <td class="text-left" width="250px">
                        MOBILE NO.:
                      </td>
                      <td class="text-left">
                         <span class="ml-2 text-h6">{{account.mobile_no}} </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" width="250px">
                        BIRTHDATE:
                      </td>
                      <td class="text-left">
                         <span class="ml-2 text-h6">{{account.birth_date}} </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" width="250px">
                        STATUS:
                      </td>
                      <td class="text-left">
                        <span class="ml-2 text-h6" :class="'text-' +Status(account.status)">{{account.status}} </span>
                      </td>
                    </tr>
                      <!-- <tr v-if="agent.level == 3">
                      <td class="text-left" width="250px">
                        Account Type:
                      </td>
                      <td class="text-left">
                         <v-select
                            v-model="account.level"
                            label="Role"
                            density="compact"
                            variant="outlined"
                            hide-details
                            :items="levels"
                            item-title="Label"
                            item-value="id"
                          />
                      </td>
                    </tr> -->
                     <!-- <tr v-if="account.level == 2">
                      <td class="text-left" width="250px">
                        Set Commission:
                      </td>
                      <td class="text-left">
                         <v-text-field
                            v-model="account.commission"
                             type="number"
                            label="Role"
                            density="compact"
                            variant="outlined"
                            hide-details
                          />
                      </td>
                    </tr> -->
                    <tr>
                      <td class="text-left" width="250px">
                        REFERRAL CODE: 
                      </td>
                      <td>
                        <span class="ml-2 text-h6">{{account.referral}} </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" colspan="2">
                              <p class="small-font font-italic">
                                Registered: {{ $moment(account.created_at).format("MMM DD, YYYY")}}
                              </p>
                              <p class="small-font font-italic">
                                Last Login: {{ $moment(account.updated_at).fromNow() }}
                              </p>
                      </td>
                     
                    </tr>
                    <tr>
                      <td class="text-center" colspan="2">
                        <div class="mt-4">
                        
                        <p class="text-h4 text-success">  {{Money(account.balance)}}</p> 
                        <p><v-icon color="warning" class="mr-2">mdi-database</v-icon>Credits</p>
                             
                      </div>
                      </td>
                    </tr>
                    
                  </tbody> 
                </table>
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
    
    }
  }
}
</script>
