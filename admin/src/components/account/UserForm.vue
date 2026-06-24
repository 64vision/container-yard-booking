<template>
 <v-navigation-drawer v-model="drawer" location="right" width="600"  temporary>
      <div>
          <v-row>
            <v-col cols="12">
             
            <div class="pa-4">
              <div class="font-weight-bold ma-2">Profile
                <span style="float: right">
                <v-btn size="small"
                variant="flat" color="success" text @click="validate()"><v-icon class="mr-2" color="white">mdi-content-save-check</v-icon>Save</v-btn>
              </span>
              </div>
              <v-divider class="mb-1"/>
                    <div>
                      <v-img
                          height="150"
                          src="@/assets/hyperball.png"
                        />
                    </div>
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
                          label="Fullname"
                          v-model="account.fullname"
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
                              v-model="account.role"
                              label="Role"
                                density="compact"
                                variant="outlined"
                                hide-details
                                :items="['Super','Operation', 'Accounting', 'Monitoring', 'Partner']"
                              />
                          </v-col>
                          <v-col cols="6">
                                  <v-select
                              v-model="account.status"
                              label="Role"
                                density="compact"
                                variant="outlined"
                                hide-details
                                :items="['Active','Deactivate']"
                              />
                          </v-col>
                      </v-row>
                      </td>

                    </tr>
                 
                    <tr>
                      <td class="text-left">
                       <template v-if="showpass">
                        Change Password
                        <v-divider />
                        <v-text-field
                        class="ma-4"
                          density="compact"
                          type="password"
                          label="New Password"
                          v-model="newpassword"
                          variant="outlined"
                          hide-details
                        ></v-text-field>
                        <v-text-field
                   
                        class="ma-4"
                          density="compact"
                          type="password"
                          label="Confirm Password"
                          v-model="newpassword2"
                          variant="outlined"
                          hide-details
                        ></v-text-field>
                      </template>
                        <div class="mt-4"><v-btn variant="text" block size="small" @click="showpass=true">Change Password</v-btn></div>
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
import { md5 } from 'js-md5';
export default {
    data: () => ({
        drawer: false,
        showpass: false,
        newpassword: '',
        newpassword2:'',
        account: {},
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
      },
      state: {
        type: String,
        default: 'edit'
      },
  },
  watch: {
    show(val) {
      this.drawer = val
      console.log("value: " + val)
      if(val){
        if(this.state == 'edit') {
          this.fetchAccount()
        }
        
      }
    },
    drawer(val) {
        console.log("value: " + val)
        if(!val) {
          this.showpass = false
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
    validate(){
      if(this.showpass) {
        if(this.newpassword!= this.newpassword2) {
            this.AlertMsg("Passwords do not match","warning")
            return false
        } else {
          this.account.password = md5(this.newpassword)
        }
      }
      this.update()
    },
    update(){
        api.post('/admin/qry',{
          table: 'administrators',
          type: 'update account',
          query: "update administrators set username='"+ this.account.username+"', fullname='"+ this.account.fullname+"', password='"+ this.account.password+"' , role='"+ this.account.role+"', status='"+ this.account.status+"' where id="+this.account_id
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
    fetchAccount(){
      
        api.post('/admin/qry',{
          table: 'administrators',
          type: 'query',
          query: "select * from administrators where id="+this.account_id
      })
      .then(response => {
        if(response.status) {
            console.log(this.account_id, response.data)
           this.account = response.data.administrators[0]
          
        }
      })
    
    }
  }
}
</script>
