<template>
    <v-dialog
    v-model="dialog"
    persistent
    width="750">
   
    <v-card>
        <v-toolbar>
            <v-toolbar-title>Buy Credits</v-toolbar-title>
            <v-spacer/>
            <v-btn  @click="emitToParent('close')" color="warning">
                close
            </v-btn>
        </v-toolbar>
          <v-card-text class="pa-4 def-font">
              <v-row>
                <v-col cols="3">
                        <v-img
                        @click="amount=200"
                        src="@/assets//img/200.png"
                        />
                    </v-col>
                <v-col cols="3">
                        <v-img
                           @click="amount=500"
                        src="@/assets//img/500.png"
                        />
                    </v-col>
                    <v-col cols="3">
                        <v-img
                             @click="amount=1000"
                        src="@/assets//img/1k.png"
                        />
                    </v-col>
                    <v-col cols="3">
                        <v-img
                           @click="amount=2000"
                        src="@/assets//img/2k.png"
                        />
                    </v-col>
                    <v-col cols="3">
                        <v-img
                           @click="amount=5000"
                        src="@/assets//img/5k.png"
                        />
                    </v-col>
                    <v-col cols="3">
                        <v-img
                           @click="amount=10000"
                        src="@/assets//img/10k.png"
                        />
                    </v-col>
                    <v-col cols="3">
                        <v-img
                           @click="amount=20000"
                        src="@/assets//img/20k.png"
                        />
                    </v-col>
                    <v-col cols="3">
                        <v-img
                           @click="amount=50000"
                        src="@/assets//img/50k.png"
                        />
                    </v-col>
                  
              </v-row>
              <v-divider class="ma-4"/>
              <v-row>
                <v-col cols="12" class="text-center">
                    <div class="mb-4">
                        <span class="text-h3">{{Money(amount)}}</span>
                        <br/>
                        <span class="caption text-body-2">Credits to Buy</span>
                    </div>
                    <v-btn color="primary" size="large" :loading="loading" @click="buyCredits()" v-if="amount>0">Buy Via GCASH</v-btn>
                </v-col>
              </v-row>
          </v-card-text>
          
    </v-card>
    <FrameDialog :show="showFrame" :checkoutUrl="checkoutUrl" @ConfirmEvent="dEv" />
  </v-dialog>
</template>

<script>
  import api from '@/plugins/axios.js'
export default {
    data: () => ({
        amount: 0,
        showFrame: false,
        loading: false,
        checkoutUrl:""
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
      this.$emit('ConfirmEvent', action)
    },
    dEv(){
        this.showFrame = false
        setTimeout(()=>{
     
                this.emitToParent('close')
        }, 400)
    },
    buyCredits(){
        api.post('/credits/buy',{
                req_amount: this.amount,
                partner: "GCASH"
            })
            .then(response => {
              if(response.status) {
                console.log(response.data.response.checkoutUrl)
                this.checkoutUrl = response.data.response.checkoutUrl
     
                this.showFrame = true
              } 
            })
    },

  }
}
</script>
