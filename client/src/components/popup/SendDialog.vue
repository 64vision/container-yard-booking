<template>
    <v-dialog
    v-model="dialog"
    persistent
    width="450">
   
    <v-card>
        <v-toolbar>
            <v-toolbar-title>Send Credits</v-toolbar-title>
            <v-spacer/>
            <v-btn  @click="emitToParent('close')" color="warning">
                close
            </v-btn>
        </v-toolbar>
          <v-card-text class="pa-4 def-font">
            <div v-if="!showFrame">
              <div style="width: 300px; margin: auto;">
                <label for="receiver">Enter Registered Mobile No.:</label>
                <input  v-model="receiver" name="receiver" class="amount_input"  />
                <label for="credits">Credits to send:</label>
                <input  v-model="amount" name="credits" class="amount_input"  type="number"/>
              </div>
              <v-divider class="ma-1"/>
               
              <v-row>
                <v-col cols="12" class="text-center pa-4">
                    <v-btn color="primary" size="large" :loading="loading" @click="sendCredits()" v-if="amount>0">Proceed</v-btn>
                </v-col>
              </v-row>
            </div>
            <div v-else>
                <p class="small-font ma-2 font-italic text-info text-center">
                        OTP was send to your registered mobile number. 
                    </p>
                <div style="width: 300px; margin: auto;" class="animate__animated animate__zoomIn">
                  
                <label for="code">Enter OTP:</label>
                <input  v-model="otp" name="code" class="amount_input"  />
            
              </div>
              <v-divider class="ma-1"/>
               
              <v-row>
                <v-col cols="12" class="text-center pa-4">
                    <v-btn color="primary" size="large" :loading="loading" @click="Verify()" v-if="amount>0">Send</v-btn>
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
        checkoutUrl:"",
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
    Verify(){
        api.post('/credits/proceed',{
                code: this.otp,
                id: this.req_id,
            })
            .then(response => {
                console.log(response.data)
              if(response.data.status) {
                this.AlertMsg(response.data.message,"success")
              this.emitToParent("close")
              } else {
                this.AlertMsg(response.data.message,"warning")
              }
            })
    },
    sendCredits(){
        api.post('/credits/send',{
                type: "Transfer",
                receiver: this.receiver,
                amount: this.IsNum(this.amount)
            })
            .then(response => {
                console.log(response.data)
              if(response.data.status) {
                this.req_id = this.IsNum(response.data.requested.id)
                this.showFrame = true
              } else {
                this.AlertMsg(response.data.message,"warning")
              }
            })
    },

  }
}
</script>
