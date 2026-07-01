<template>
 <v-navigation-drawer v-model="drawer" location="right" width="600"  temporary>
      <div>
          <v-row>
            <v-col cols="12">
             
            <div class="pa-4">
              <div class="font-weight-bold ma-2"> {{state == 'new' ? 'Add New Account' : 'Edit Account'}} <span v-if="state == 'edit'" class="text-caption">({{account.username}})</span>   
                <span style="float: right">
                <v-btn icon @click="drawer = false" size="x-small">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </span>
              </div>
              <v-divider class="mb-1 mt-4"/>
              
           
              <v-form
           ref="form"
             v-model="valid"
             lazy-validation
          >
           
             
                        <v-text-field
                          density="compact"
                           persistent-hint
                          label="Full Name"
                          v-model="account.fullname"
                          required
                          :rules="textrules"
                        ></v-text-field>
                  
                        <v-text-field
                          density="compact"
                          label="Company"
                          v-model="account.company"
                        ></v-text-field>
                     
                        <v-text-field
                          density="compact"
                          label="Email Address"
                          v-model="account.email"
                        ></v-text-field>
                     
                        <v-text-field
                          density="compact"
                          label="Mobile Number"
                          v-model="account.mobile_no"
                        ></v-text-field>
                     
                         <v-select
                              v-model="account.role"
                              label="Role"
                                density="compact"
                                :rules="textrules"
                                required
                                :items="['Shipping Owner','Yard Operator', 'Administrator']"
                                
                              >
                              </v-select> 
                   
                         <v-select
                              v-model="account.status"
                              label="Status"
                                density="compact"
                                :rules="textrules"
                                required
                                :items="['Active','Deactivated']"
                                
                              >
                              </v-select> 
                      
                        <p>
                          Registered: {{ $moment(account.created_at).format("MMM DD, YYYY")}}
                        </p>
                   
                         <v-divider class="mb-4"/>
                         <p>Login Credentials</p>
                       <v-divider class="mb-4"/>
                         <v-row>
                          <v-col cols="6">
                                 <v-text-field
                              density="compact"
                              label="Username"
                              v-model="account.username"
                              :rules="textrules"
                              required
                        ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                                 <v-text-field
                              density="compact"
                              label="Password"
                              v-model="password"
                              
                              type="password"
                              :required="change_password"
                              :rules="change_password ? passwordRules : []"
                        ></v-text-field>
                          <v-text-field
                            v-if="change_password"
                              density="compact"
                              label="Confirm Password"
                              v-model="confirm_password"  
                           
                               type="password"  
                                :required="change_password"
                                :rules="change_password ? confirmPasswordRules : []"
                        ></v-text-field>
                        <div   v-if="!change_password"><v-btn size="x-small" @click="change_password = true, password = '', confirm_password = ''">Change Password</v-btn></div>
                        <div   v-if="change_password && state == 'edit'"><v-btn color="success" size="x-small" @click="savePassword">Save Password</v-btn></div>
                        </v-col>
                       
                      </v-row>
                     
                        <v-divider class="mb-4"/>
                     <v-btn 
                        v-if="state == 'edit'"
                        :loading="loading"
                        variant="flat" color="success" text @click="validate()">
                        <v-icon class="mr-2" color="white">mdi-content-save-check</v-icon>Save
                      </v-btn>
                      <v-btn 
                        v-if="state == 'new'"
                         :loading="loading"
                        variant="flat" color="success" text @click="validate()">
                        <v-icon class="mr-2" color="white">mdi-content-save-check</v-icon> Add Account
                      </v-btn>
                     
             
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
        loading: false,
        account: {},
        password: '',
        confirm_password: "",
        change_password: false,
         textrules: [
        v => !!v || 'This field is required',
      ],
        passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Password must be at least 8 characters"
      ],
       emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Invalid email",
      ],
        valid: true
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
      state: {
          type: String,
          default:"new"
      },

  },
  watch: {
    show(val) {
      this.drawer = val
 
      if(val){
        if(this.state === "edit") {
          this.fetchAccount()
          this.change_password = false
        } else {
          this.account = {}
          this.change_password = true
          this.password = ""
          this.confirm_password = ""
        }
      }
    },
    drawer(val) {
    
        if(!val) {
            this.emitToParent('close')
        }
    }
  },
  computed: {
    dialog(){
        return this.show
    },
    confirmPasswordRules() {
      return [
        v => !!v || "Please confirm your password",
        v => v === this.password || "Passwords do not match"
      ];
    }
  },
  methods: {
   emitToParent (action) {
      this.$emit('FormEvent', action)
    },
     validate () {
      this.loading =true
      this.$refs.form.validate()
        setTimeout(()=>{
          if(this.valid) {
           
          
              setTimeout(()=>{
                if(this.state === "new") {
                  this.addAccount()
                } else {
                  this.update()
                }  
            }, 1000)
          } else {
                this.loading =false
          }
        },600)
        
      },
    savePassword(){
      var newpassword = md5(this.password.trim())
       api.post('/admin/qry',{
          table: 'administrators',
          type: 'update account',
          query: "update administrators set password='"+ newpassword+"'where id="+this.account_id
      })
      .then(response => {
        if(response.status) {
            console.log(this.account_id, response.data)
            this.fetchAccount()
            this.AlertMsg(response.data.message,"success")
              this.change_password = false
        } else {
            this.AlertMsg(response.data.message,"warning")
        }
      })
    },//202cb962ac59075b964b07152d234b70
    addAccount(){
        console.log("Registering new account")
         api.post('/admin/qry',{
          table: 'administrators',
          type: 'update account',
          query: `INSERT INTO administrators 
      (username, fullname, email, mobile_no, status, role, company, password, created_at) 
      VALUES ('${this.account.username}', '${this.account.fullname}', '${this.account.email}', 
              '${this.account.mobile_no}', '${this.account.status}', '${this.account.role}', 
              '${this.account.company}', '${md5(this.password)}', NOW())`
      })
      .then(response => {
        if(response.status) {
            console.log(response.data)
           // this.fetchAccount()
            this.AlertMsg('New account has been created',"success")
            this.drawer = false
          
        } else {
            this.AlertMsg(response.data.message,"warning")
        }
        this.loading =false
      })
    },
    update(){
        api.post('/admin/qry',{
          table: 'administrators',
          type: 'update account',
          query: "update administrators set username='"+ this.account.username+"', fullname='"+ this.account.fullname+"', email='"+ this.account.email+"', mobile_no='"+ this.account.mobile_no+"', status='"+ this.account.status+"' , role='"+ this.account.role+"', company='"+ this.account.company+"'   where id="+this.account_id
      })
      .then(response => {
        if(response.status) {
            console.log(this.account_id, response.data)
            this.fetchAccount()
            this.AlertMsg(response.data.message,"success")
          
        } else {
            this.AlertMsg(response.data.message,"warning")
        }
        this.loading =false
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
