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
                <v-col cols="6" class="text-center">
                  
                  <v-img
       
                  height="150"
                  src="@/assets/hyperball.png"
                />
                
                <span class="text-caption">Picture</span> 
                            </v-col>
                            <v-col cols="6"  class="text-center">
                              <v-img
                  
                  height="150"
                  src="@/assets/hyperball.png"
                />
                <span class="text-caption">Government ID</span> 
                </v-col>
              </v-row>
              <v-divider class="mb-1"/>
              <v-form
             ref="form"
             v-model="valid"
             lazy-validation
          >
                <table class="hpb-table profile-tbl">
                  <tbody>
                    <tr>
                      <td class="text-left">
                        <v-text-field
                          density="compact"
                           persistent-hint
                          label="Username"
                          v-model="account.username"
                          variant="outlined"
                          hide-details
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">
                        <v-text-field
                          density="compact"
                          label="First Name"
                          v-model="account.first_name"
                          variant="outlined"
                          hide-details
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">
                        <v-text-field
                          density="compact"
                          label="Last Name"
                          v-model="account.last_name"
                          variant="outlined"
                          hide-details
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">
                        <v-text-field
                          density="compact"
                          label="Email Address"
                          v-model="account.email"
                        variant="outlined"
                          hide-details
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">
                        <v-text-field
                          density="compact"
                          label="Mobile Number"
                          v-model="account.mobile_no"
                           variant="outlined"
                          hide-details
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">
                        <v-text-field
                        
                          density="compact"
                          label="Birth Date"
                          v-model="account.birth_date"
                           variant="outlined"
                          hide-details
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">
                       
                         <v-row>
                          <v-col cols="6">
                              <v-select
                              v-model="account.agent"
                              label="Agent"
                                density="compact"
                                variant="outlined"
                                hide-details
                                :item-title="'fullname'"
                                 item-value="id"
                                :items="ALLAGENTS"
                                
                              >
                              </v-select> 

                                  
                        </v-col>
                         <v-col cols="6">
                              <v-select
                              v-model="account.sub_agent"
                              label="Sub Agent"
                                density="compact"
                                variant="outlined"
                                hide-details
                                :item-title="'fullname'"
                                 item-value="id"
                                :items="SUBAGENTS"
                                
                              >
                              </v-select> 

                                  
                        </v-col>
                      </v-row>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">
                          <v-row>
                            <v-col cols="6">
                              <v-select
                              v-model="account.status"
                              label="Status"
                                density="compact"
                                variant="outlined"
                                hide-details
                                :items="['Active','Banned']"
                              />  
                        </v-col>

                          <v-col cols="6">
                              <v-select
                              v-model="account.remarks"
                              label="Remarks"
                                density="compact"
                                variant="outlined"
                                hide-details
                                :items="['Verified','For Verification']"
                              />  
                        </v-col>
                      </v-row>
                      </td>

                    </tr>
                    <tr>
                       <td class="text-left">
                        <v-row>
                            <v-col cols="6">
                                    <v-select
                              label="Level"
                              v-model="account.level"
                                density="compact"
                                variant="outlined"
                                hide-details
                                :items="[1,2,3]"
                              />
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                              type="number"
                              density="compact"
                              label="Commission"
                              v-model="account.commission"
                              variant="outlined"
                              hide-details
                            ></v-text-field>
                            </v-col>
                        </v-row>
                      
                      </td>

                    </tr>
                    <tr>
                      <td class="text-left text-caption">
                        <p>
                          Registered: {{ $moment(account.created_at).format("MMM DD, YYYY")}}
                        </p>
                        <p>
                          Last Login: {{ $moment(account.updated_at).fromNow() }}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">
                        <v-divider class="ma-3" inset/>
                        <p class="text-h4 text-success"> {{Money(account.balance)}}</p> 
                        <p><v-icon color="warning" class="mr-2">mdi-database</v-icon>Credits</p>
                        <v-divider class="ma-3" inset/>
                      </td>
                    </tr>
                  </tbody> 
                </table>
              </v-form> 
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
        agents: []
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
        this.fetchAccount()
        this.fetchAgents()
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
    SUBAGENTS(){
      var items = this.agents.reduce((res, item) =>{
        if(item.level == 2){

         item.fullname = item.first_name +' '+ item.last_name
         res.push(item)
        }
        return res
        }, [])
        return items
    },
    ALLAGENTS(){
      var items = this.agents.reduce((res, item) =>{
       if(item.level == 3){

         item.fullname = item.first_name +' '+ item.last_name
         res.push(item)
        }
        return res
        }, [])
        return items
    }
  },
  methods: {
   emitToParent (action) {
      this.$emit('FormEvent', action)
    },
    update(){
        api.post('/admin/qry',{
          table: 'accounts',
          type: 'update account',
          query: "update accounts set username='"+ this.account.username+"',  commission='"+ this.account.commission+"', agent='"+ this.account.agent+"',  first_name='"+ this.account.first_name+"', last_name='"+ this.account.last_name+"' , email='"+ this.account.email+"', mobile_no='"+ this.account.mobile_no+"', status='"+ this.account.status+"' , level='"+ this.account.level+"' , remarks='"+ this.account.remarks+"'  where id="+this.account_id
      })
      .then(response => {
        if(response.status) {
            console.log(this.account_id, response.data)
            this.fetchAccount()
            this.AlertMsg(response.data.message,"success")
        } else {
            this.AlertMsg(response.data.message,"warning")
        }
      })
    
    },
     fetchAgents(){
      
        api.post('/admin/qry',{
          table: 'accounts',
          type: 'query',
          query: "select * from accounts where level>1"
      })
      .then(response => {
        if(response.status) {
            console.log(this.account_id, response.data)
           this.agents = response.data.accounts
          
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
          
        }
      })
    
    }
  }
}
</script>
