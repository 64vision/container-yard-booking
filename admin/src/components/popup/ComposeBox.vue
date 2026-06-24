<template>
    <v-dialog
    v-model="dialog"
    persistent
    width="650">
   
    <v-card>
        <v-toolbar>
            <v-toolbar-title>COMPOSE MESSAGE</v-toolbar-title>
            <v-spacer/>
            <v-btn  @click="emitToParent('close')" color="warning">
                close
            </v-btn>
        </v-toolbar>
          <v-card-text class="pa-4 def-font">
            <v-textarea
              v-model="messagetxt"
            />
            <small>{{txtlen}}/160 </small>
            <p><v-select
              v-model="receiver_type"
              label="Select Reciever"
              density="compact"
              :items="['Player', 'All Players']"
              /></p>
               <p><v-text-field 
                v-if="receiver_type == 'Player'"
              density="compact"
              v-model="receiver_number"
              label="Player mobile number"
              /></p>
              <br />
              <v-btn color="primary" block rounded :loading="loading" @click="sendMessage()">Send</v-btn>
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
        loading: false,
        otp:"",
        loading: false,
        receiver:"",
        messagetxt:"",
        receiver_number:"",
        receiver_type:"Player",
        rer_id: 0,
      }),
  props: {
      show:{
          type: Boolean,
          default: false
      },
   
  },
  computed: {
    dialog(){
        return this.show
    },
    txtlen(){
        return this.messagetxt.length
    }
  },
  methods: {
   emitToParent (action) {
        this.receiver_type=""
        this.receiver_number = ""
        this.messagetxt = ""
        this.showFrame = false
      this.$emit('ConfirmEvent', action)
    },
    dEv(){
        this.showFrame = false
    },
    
    sendMessage(){
      this.loading = true
        api.post('/send/message',{
                receiver_type: this.receiver_type,
                receiver: this.receiver_number,
                message_txt: this.messagetxt
            })
            .then(response => {
                this.loading = false
              if(response.data.status) {
              this.AlertMsg(response.data.message,"success")
              } else {
                this.AlertMsg(response.data.message,"warning")
              }
              this.emitToParent("close")
            })
    },

  }
}
</script>
