<template>
<v-container fluid >
 



            
          <v-card tile >
              <v-toolbar ddensity="compact" color="info" dark>
                <v-toolbar-title>Account Details</v-toolbar-title>
              </v-toolbar>
              <v-row>
                <v-col cols="12" sm="4" class="text-center">
                  <div class="pa-4">
                          <v-img
                          height="100"
                          src="@/assets/profile.png"
                        />
                        <div class="mt-2">
                        
                          <p class="text-h4 text-success">  {{Money($store.state.balance)}}</p> 
                                <p><v-icon color="warning" class="mr-2">mdi-database</v-icon>Credits</p>
                                <v-divider class="ma-3"/>
                                <p class="small-font font-italic">
                                  Registered: {{ $moment(account.created_at).format("MMM DD, YYYY")}}
                                </p>
                                <p class="small-font font-italic">
                                  Last Login: {{ $moment(account.updated_at).fromNow() }}
                                </p>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" sm="8">
                  <table class="hpb-table profile-tbl hpb-table-border-bottom">
                  <tbody>
                    <tr>
                      <td class="text-left" width="190px">
                       REFERRAL LINK: 
                      </td>
                      <td class="text-center">
                        <span class="ml-2  " id="textToCopy">{{account.referral}}</span><v-btn size="x-small" class="ml-4" @click="CopyText()"><v-icon class="text-info" >mdi-content-copy</v-icon> Copy referral link</v-btn>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" width="190px">
                        USERNAME:
                      </td>
                      <td class="text-left">
                        <span class="ml-2">{{account.username}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" width="190px">
                        FULLNAME:
                      </td>
                      <td>
                        <span class="ml-2 ">{{account.last_name}},{{account.first_name}} </span>
                      </td>
                    </tr>
                    
                    <tr>
                      <td class="text-left" width="190px">
                        EMAIL ADDRESS : 
                      </td>
                      <td>
                        <span class="ml-2 ">{{account.email}} </span>
                      </td>
                    </tr>
                       
                    <tr>
                      <td class="text-left" width="190px">
                        MOBILE NO.:
                      </td>
                      <td class="text-left">
                         <span class="ml-2 ">{{account.mobile_no}} </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" width="190px">
                        BIRTHDATE:
                      </td>
                      <td class="text-left">
                         <span class="ml-2 ">{{account.birth_date}} </span>
                      </td>
                    </tr>
                    <!-- <tr>
                      <td class="text-left" width="190px">
                        SET COMMISSION:
                      </td>
                      <td class="text-left">
                        <span class="ml-2 ">{{account.commission}}%</span>
                      </td>
                    </tr> -->
                    <tr>
                      <td class="text-left" width="190px">
                        STATUS:
                      </td>
                      <td class="text-left">
                        <span class="ml-2 " :class="'text-' +Status(account.status)">{{account.status}} </span>
                      </td>
                    </tr>
                 
                    <tr>
                    
                      <td class="text-left" colspan="2">
                        <p> BANK DETAILS:</p>
                                 <v-text-field
                                    density="compact"
                                    class="ma-2"
                                    label="Bank Name / eWallet"
                                    v-model="account.bank.name"
                                    size="small"
                                    hide-details
                                  ></v-text-field>
                                  <v-text-field
                                    density="compact"
                                    class="ma-2"
                                    label="Account Name"
                                    v-model="account.bank.account_name"
                                    size="small"
                                    hide-details
                                  ></v-text-field>
                                  <v-text-field
                                    density="compact"
                                     class="ma-2"
                                    label="Account Number"
                                    v-model="account.bank.number"
                                    size="small"
                                    hide-details
                                  ></v-text-field>

                                  <v-select
                                    density="compact"
                                     class="ma-2"
                                    label="Type"
                                    v-model="account.bank.type"
                                    :items="['Bank', 'eWallet']"
                                    size="small"
                                    hide-details
                                  ></v-select>
                                  <div class="pa-2 text-right">
                                    <v-btn size="x-small" @click="addBank()" :loading="bankloader" color="primary">Save Bank</v-btn>
                                  </div>
                      </td>
                    </tr>
                    
                    <tr>
                      <td class="text-left" colspan="2">
                        
                              <v-btn size="x-small" @click="changepass=true" v-if="!changepass" >Change Password</v-btn>
                              <div style="width: 300px; margin: auto;" v-else="chancepass">
                                <v-divider class="ma-3" inset/>
                                <p class="font-weight-light font-italic text-warning mb-4">
                                  *Password must be 4 number digits only.
                              </p>
                              <p class="ma-4">
                                          <v-text-field
                                        maxlength="4"
                                        type="password"
                                    density="compact"
                                    @change="validatePass()"
                                    label="New Password"
                                    v-model="pass1"
                                    variant="outlined"
                                   
                                    hide-details
                                  ></v-text-field>
                              </p>    
                              <p class="ma-4">
                                          <v-text-field
                                          maxlength="4"
                                          type="password"
                                    density="compact"
                                    label="Confirm Password"
                                    v-model="pass2"
                                    variant="outlined"
                                    hide-details
                                  ></v-text-field>
                              </p> 
                              <p class="ma-4 text-center">
                                <v-btn size="small" @click="loading=true,ChangePassword()" color="primary">Save new password</v-btn>
                                
                               </p>    
                               <p class="ma-4 text-center">
                                <v-btn size="small" @click="changepass=false">Not Now</v-btn>
                                
                               </p>    
                            </div>
                            
                      </td>
                    </tr>
                    
                  </tbody> 
                </table>
                </v-col>
              </v-row>

        </v-card>

</v-container>
</template>
<script>
import api from '@/plugins/axios.js'
import { md5 } from 'js-md5';
import {
  mapMutations
} from 'vuex'
  export default {
    data: () => ({
      actform: false,
      loading: false,
      bankloader: false,
      account_id:0,
      pass1:"",
      pass2:"",
      changepass:false,
      account:{bank:{}}
    }),
    created: function () {
     console.log(sessionStorage.account)
     
      if (!sessionStorage.account) {
       this.setLoggedIn(false)  // Set loggedIn to false when no account is found in sessionStorage
        this.$router.push('/login')
     } else {
       this.setLoggedIn(true)  // Set loggedIn to true when an account is found in sessionStorage
       let _account = JSON.parse(sessionStorage.account)
       this.account_id = _account.id
       api.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.token
       this.fetchAccount()

     }
  
    },
    computed: {
   
    },
    methods: {
      ...mapMutations(['setLoggedIn']),
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
      validatePass(){

        if(this.pass1.length==4) {
          if(this.IsNum(this.pass1) < 1) {
            this.AlertMsg("*Password must be 4 number digits","warning")
          }
        } 
      },
      addBank(){
        this.bankloader = true
        api.post('/account/qry',{
              table: 'accounts',
              account_id: this.account.id,
              type: 'update account',
              query: `update accounts set bank='{"name": "`+this.account.bank.name+`", "account_name": "`+this.account.bank.account_name+`", "number": "`+this.account.bank.number+`", "type": "`+this.account.bank.type+`"}'::json  where id=`+this.account.id
          })
          .then(response => {
            this.bankloader = false
            if(response.status) {
              
                this.AlertMsg("Bank details saved!","success")
            } else {
                this.AlertMsg(response.data.message,"warning")
            }
          })
      },
      ChangePassword(){
        if(this.pass1.length<4) {
          this.AlertMsg("*Password must be 4 number digits","warning")
          return
        }
        if(this.pass1!="" && this.pass2!="") {
          if(this.pass1==this.pass2) {
            this.Update(md5(this.pass1))
          } else {
            this.AlertMsg("Passwords do not match","warning")
          }  
        } else {
          this.AlertMsg("Passwords cannot be empty","warning")
        }
      },
      Update(newpass){
        api.post('/account/qry',{
              table: 'accounts',
              account_id: this.account.id,
              type: 'update account',
              query: "update accounts set password='"+ newpass+"'  where id="+this.account.id
          })
          .then(response => {
            this.loading = false
            if(response.status) {
                this.changepass = false
                this.fetchAccount()
                this.AlertMsg("New password save!","success")
            } else {
                this.AlertMsg(response.data.message,"warning")
            }
          })
      }

    }
    
  }
</script>
