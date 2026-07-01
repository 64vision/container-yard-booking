<template>
 <v-navigation-drawer v-model="drawer" location="right" width="700"  temporary>
      <div>
          <v-row>
            <v-col cols="12">
             
            <div class="pa-4">
              <div class="font-weight-bold ma-2"> {{state == 'new' ? 'Add New Shipping Line' : 'Edit Shipping Line'}} <span v-if="state == 'edit'" class="text-caption">({{item.name}})</span>   
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
                      
                        <p class="font-weight-thin pa-1">Contact Person</p>
                        <v-divider class="mb-4"/>
                             
                            <v-select
                             v-if="owner.id != null"
                              v-model="owner"
                              label="Contact Person"
                                density="compact"
                                 item-title="fullname"
                                :rules="textrules"
                               return-object
                                :items="operators"
                                hide-details
                              >
                               <template v-slot:item="{ props, item }">
                              <v-list-item v-bind="props" 
                                :title="`${item.raw.fullname}`"
                                :subtitle="item.raw.company"
                              />
                            </template>
                              </v-select> 
                             <div class="pa-2">
                                <!-- <p>{{ owner.fullname }}</p> -->
                                <p class="font-weight-thin font-italic">Company: {{ owner.company }}</p>

                             </div>
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
        operators:[],
        owner: {},
         textrules: [
        v => !!v || 'This field is required',
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
      this.fetchOperator()
      if(val){
        if(this.state === "edit") {
          this.fetchItem()
          setTimeout(()=>{
            this.owner = this.operators.find(op => op.id === this.item.owner)
          }, 1000)
        } else {
          this.item = {}
          this.owner = {id: 0, fullname: "Select Contact Person", company: ""}
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
                  this.add()
                } else {
                  this.update()
                }  
            }, 1000)
          } else {
                this.loading =false
          }
        },600)
        
      },
     fetchOperator(){
        api.post('/admin/qry',{
          table: 'administrators',
          type: 'query',
          query: `select id, fullname, company from administrators where role='Shipping Owner' order by id desc`
      })
      .then(response => {
        if(response.status) {
            console.log(this.item_id, response.data)
           this.operators = response.data.administrators
          
        }
      }) 
     },  
    add(){
        console.log("Registering new yard")
         api.post('/admin/qry',{
          table: 'shippinglines',
          type: 'update account',
          query: `INSERT INTO shipping_lines 
      (name, address, status, owner) 
      VALUES ('${this.item.name}', '${this.item.address}', '${this.item.status}', 
              '${this.owner.id}')`
      })
      .then(response => {
        if(response.status) {
            console.log(response.data)
           // this.fetchAccount()
            this.AlertMsg('New shipping line has been created',"success")
            this.drawer = false
          
        } else {
            this.AlertMsg(response.data.message,"warning")
        }
        this.loading =false
      })
    },
    update(){
        api.post('/admin/qry',{
          table: 'shippinglines',
          type: 'update account',
          query: `update shipping_lines set name='${this.item.name}', address='${this.item.address}',
           status='${this.item.status}', 
          owner='${this.owner.id}' where id=${this.item_id}`
      })
      .then(response => {
        if(response.status) {
            console.log(this.item_id, response.data)
            this.fetchItem()
            this.AlertMsg(response.data.message,"success")
          
        } else {
            this.AlertMsg(response.data.message,"warning")
        }
        this.loading =false
      })
    
    },
    
    fetchItem(){
      
        api.post('/admin/qry',{
          table: 'shippinglines',
          type: 'query',
          query: "select * from shipping_lines where id="+this.item_id
      })
      .then(response => {
        if(response.status) {
            console.log(this.item_id, response.data)
           this.item = response.data.shippinglines[0]
           this.capacity = this.item.capacity
          
        }
      })
    
    }
  }
}
</script>
