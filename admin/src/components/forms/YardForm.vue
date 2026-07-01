<template>
 <v-navigation-drawer v-model="drawer" location="right" width="700"  temporary>
      <div>
          <v-row>
            <v-col cols="12">
             
            <div class="pa-4">
              <div class="font-weight-bold ma-2"> {{state == 'new' ? 'Add New Yard' : 'Edit Yard'}} <span v-if="state == 'edit'" class="text-caption">({{item.name}})</span>   
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
                          label="Name"
                          v-model="item.name"
                          required
                          :rules="textrules"
                        ></v-text-field>
                  
                        <v-text-field
                          density="compact"
                          label="Address"
                          v-model="item.address"
                        ></v-text-field>
                         <v-select
                              v-model="item.status"
                              label="Status"
                                density="compact"
                                :rules="textrules"
                                required
                                :items="['Active','Deactivated']"
                                
                              >
                              </v-select> 
                      
                        <p class="font-weight-thin pa-1">Yard Owner</p>
                        <v-divider class="mb-4"/>
                              
                            <v-select
                              v-model="item.status"
                              label="Status"
                                density="compact"
                                :rules="textrules"
                                required
                                :items="['Active','Deactivated']"
                                
                              >
                              </v-select> 
                     
                        <v-divider class="mb-4"/>

                         <p class="font-weight-thin pa-1">Capacity and Rates</p>
                        <v-divider class="mb-4"/>
                           <v-row>
                                 <v-col cols="6">
                                         <v-row>
                                                <v-col cols="8">
                                                    <v-list-subheader>Withdrawal Per Hour</v-list-subheader>
                                                </v-col>

                                                <v-col cols="4">
                                                    <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    hide-details
                                                    single-line
                                                    v-model="capacity.withdrawal_per_hour"
                                                    ></v-text-field>
                                                </v-col>
                                        </v-row>
                                        <v-row>
                                                <v-col cols="8">
                                                    <v-list-subheader>Return Per Hour</v-list-subheader>
                                                </v-col>

                                                <v-col cols="4">
                                                    <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    hide-details
                                                    single-line
                                                    v-model="capacity.return_per_hour"
                                                    ></v-text-field>
                                                </v-col>
                                        </v-row>

                                        <v-row>
                                                <v-col cols="8">
                                                    <v-list-subheader>Storage Per Hour</v-list-subheader>
                                                </v-col>

                                                <v-col cols="4">
                                                    <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    hide-details
                                                    single-line
                                                    v-model="capacity.storage_per_hour"
                                                    ></v-text-field>
                                                </v-col>
                                        </v-row>
                                </v-col>
                                <v-col cols="6">
                                              <v-row>
                                                <v-col cols="6">
                                                    <v-list-subheader>Rate Due Per Hour</v-list-subheader>
                                                </v-col>

                                                <v-col cols="6">
                                                    <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    hide-details
                                                    prefix="PHP"
                                                    single-line
                                                    v-model="capacity.rate_due_per_hour"
                                                    ></v-text-field>
                                                </v-col>
                                        </v-row>
                                        <v-row>
                                                <v-col cols="6">
                                                    <v-list-subheader>Booking Rate</v-list-subheader>
                                                </v-col>

                                                <v-col cols="6">
                                                    <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    hide-details
                                                    prefix="PHP"
                                                    single-line
                                                    v-model="capacity.booking_rate"
                                                    ></v-text-field>
                                                </v-col>
                                        </v-row>
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-list-subheader>Daily Storage Rate</v-list-subheader>
                                                </v-col>

                                                <v-col cols="6">
                                                    <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    hide-details
                                                    prefix="PHP"
                                                    single-line
                                                    v-model="capacity.daily_storage_rate"
                                                    ></v-text-field>
                                                </v-col>
                                        </v-row>
                                        <v-row>
                                                <v-col cols="6">
                                                    <v-list-subheader>Document Fee</v-list-subheader>
                                                </v-col>

                                                <v-col cols="6">
                                                    <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    hide-details
                                                    prefix="PHP"
                                                    single-line
                                                    v-model="capacity.document_fee"
                                                    ></v-text-field>
                                                </v-col>
                                        </v-row>
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
                        <v-icon class="mr-2" color="white">mdi-content-save-check</v-icon> Add 
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
        item: {},
        capacity:{
                withdrawal_per_hour:0, 
                return_per_hour:0, 
                storage_per_hour:0,
                rate_due_per_hour: 0.00,
                booking_rate:0.00,
                daily_storage_rate:0.00,
                document_fee: 0.00
            },
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
      item_id: {
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
          this.fetchItem()
        } else {
          this.item = {}
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
          query: "update administrators set password='"+ newpassword+"'where id="+this.item_id
      })
      .then(response => {
        if(response.status) {
            console.log(this.item_id, response.data)
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
          query: "update administrators set username='"+ this.account.username+"', fullname='"+ this.account.fullname+"', email='"+ this.account.email+"', mobile_no='"+ this.account.mobile_no+"', status='"+ this.account.status+"' , role='"+ this.account.role+"', company='"+ this.account.company+"'   where id="+this.item_id
      })
      .then(response => {
        if(response.status) {
            console.log(this.item_id, response.data)
            this.fetchAccount()
            this.AlertMsg(response.data.message,"success")
          
        } else {
            this.AlertMsg(response.data.message,"warning")
        }
        this.loading =false
      })
    
    },
    
    fetchItem(){
      
        api.post('/admin/qry',{
          table: 'yards',
          type: 'query',
          query: "select * from yards where id="+this.item_id
      })
      .then(response => {
        if(response.status) {
            console.log(this.item_id, response.data)
           this.item = response.data.yards[0]
          
        }
      })
    
    }
  }
}
</script>
