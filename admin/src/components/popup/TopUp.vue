<template>
    <v-dialog
    v-model="dialog"
    persistent
    width="650">
   
    <v-card>
        <v-toolbar>
            <v-toolbar-title>Top-Up</v-toolbar-title>
            <v-spacer/>
            <v-btn  @click="emitToParent('close')" color="warning">
                close
            </v-btn>
        </v-toolbar>
          <v-card-text class="pa-4 def-font">
         
              <div >
                <label for="receiver">Enter Registered Mobile No.:</label>
                <input  v-model="receiver" name="receiver" class="amount_input"  />
                <label for="credits">Credits to send:</label>
                <input  v-model="amount" name="credits" class="amount_input"  type="number"/>

                  <label for="credits">Message:</label>
                <textarea  v-model="messagetxt" name="credits" class="amount_input" />
        
              <v-divider class="ma-1"/>
               
              <v-row>
                <v-col cols="12" class="text-center pa-4">
                    <v-btn color="primary" size="large" :loading="loading" @click="sendCredits()" v-if="amount>0">Proceed</v-btn>
                </v-col>
              </v-row>
            </div>
          
          </v-card-text>
          
    </v-card>
 
  </v-dialog>
</template>

<script>
  import api from '@/plugins/axios.js'
export default {
    data: () => ({
        amount: 0,
        showFrame: false,
        otp:"",
        loading: false,
        receiver:"",
        messagetxt:"",
        rer_id: 0,
      }),
  props: {
      show:{
          type: Boolean,
          default: false
      },
      message: {
            type: String,
          default:''
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
  computed: {
    dialog(){
        return this.show
    }
  },
  methods: {
   emitToParent (action) {
        this.showFrame = false
        this.otp = ""
        this.receiver = ""
        this.amount = 0
      this.$emit('ConfirmEvent', action)
    },
    dEv(){
        this.showFrame = false
    },
    
    sendCredits(){
      this.loading = true
        api.post('/credits/topup',{
                type: "topup",
                receiver: this.receiver,
                amount: this.IsNum(this.amount),
                message: this.messagetxt
            })
            .then(response => {
              this.loading = false
              if(response.data.status) {
                this.AlertMsg(response.data.message,"success")
             this.emitToParent("close")
              } else {
                this.AlertMsg(response.data.message,"warning")
              }
            })
    },

  }
}
</script>
