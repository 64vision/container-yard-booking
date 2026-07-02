<template>
 <v-navigation-drawer v-model="drawer" location="right" width="700"  temporary>
      <div>
          <v-row>
            <v-col cols="12">
             
            <div class="pa-4">
              <div class="font-weight-bold ma-2"> {{state == 'new' ? 'Open Slot' : 'Edit Slot'}} <span v-if="state == 'edit'" class="text-caption">({{item.name}})</span>   
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
           
             
 <v-row class="justify-center">
      <v-date-picker
        :weekday-format="$vuetify.display.width > 550 ? 'long' : 'short'"
        v-model="booking_date"
        width="700"
      ></v-date-picker>
    </v-row>
                         <v-select
                              v-model="item.status"
                              label="Status"
                                density="compact"
                                :rules="textrules"
                                required
                                :items="['Open','Closed']"
                                
                              >
                              </v-select> 
                      
                       
                        <v-divider class="mb-4"/>
                             <template  v-if="yards.length !=0">
                            <v-select
                         
                              v-model="yard"
                              label="Yard"
                                density="compact"
                                 item-title="name"
                                 return-object
                                :rules="textrules"
                            
                                :items="yards"
                                hide-details
                              >
                               <template v-slot:item="{ props, item }">
                              <v-list-item v-bind="props" 
                                :title="`${item.raw.name}`"
                                :subtitle="item.raw.address"
                              />
                            </template>
                              </v-select> 
                            <div class="font-weight-thin pa-4">
                                <p>Capacity:</p>
                                <p>Withdrawal: {{ yard.capacity.withdrawal_per_hour }}/hr | Return: {{ yard.capacity.return_per_hour }}/hr | Storage: {{ yard.capacity.storage_per_hour }}/hr</p>
                            </div>
                         </template>   
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
import _template from '../_template.vue';
export default {
  components: { _template },
    data: () => ({
        drawer: false,
        loading: false,
        item: {},
        booking_date:'',
        password: '',
        yard: {},
        yards:[],
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
      this.fetchYards()
      if(val){
        if(this.state === "edit") {
          this.fetchItem()
          setTimeout(()=>{
            this.yard = this.yards.find(op => op.id === this.item.yard_id)
          }, 1000)
        } else {
          this.item = {}
          this.yard = {id: 0, name: "Select Yard", address: "", capacity:{
                withdrawal_per_hour:0, 
                return_per_hour:0, 
                storage_per_hour:0,
                rate_due_per_hour: 0.00,
                booking_rate:0.00,
                daily_storage_rate:0.00,
                document_fee: 0.00
            }
        }
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
     fetchYards(){
        api.post('/admin/qry',{
          table: 'yards',
          type: 'query',
          query: `select * from yards order by id desc`
      })
      .then(response => {
        if(response.status) {
            console.log(this.item_id, response.data)
           this.yards = response.data.yards
          
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
          table: 'booking_slots',
          type: 'query',
          query: "select * from booking_slots where id="+this.item_id
      })
      .then(response => {
        if(response.status) {
            console.log(this.item_id, response.data)
           this.item = response.data.bookingslots[0]
          
        }
      })
    
    }
  }
}
</script>
