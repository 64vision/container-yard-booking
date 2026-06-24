<template>
    <v-dialog
    v-model="dialog"
    persistent
    width="1200">
   
    <v-card>
        <v-toolbar>
          <v-toolbar-title>BUY CREDITS</v-toolbar-title>
            <v-spacer/>
            <v-btn  @click="emitToParent('close')" color="warning">
                close
            </v-btn>
        </v-toolbar>
          <v-card-text class="pa-4 def-font">
            <div v-if="progress"  class="mt-10">
                <p>
      <v-img
       height="70"
       src="@/assets/loading_me.gif"
     />
     </p>
            </div>
        
                    <iframe id="checkoutUrl"
                    :src="checkoutUrl"
                style="border: none; width: 100%; height: 700px;" 
                scrolling="no" 
                frameborder="0"></iframe>

          </v-card-text>
          
    </v-card>
  </v-dialog>
</template>

<script>

export default {
    data: () => ({
        amount: 0,
        progress: true,
        loading: false
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
      checkoutUrl: {
        type: String,
          default:''
      },
      cancelbtn: {
          type: String,
          default:''
      }
  },
  watch:{
    show(value) {
        if(value){
            setTimeout(()=>{
              
                if (this.checkoutUrl) {
                  console.log("Checkout URL: " + this.checkoutUrl)
                    document.getElementById("checkoutUrl").src = this.checkoutUrl;
                     }
                this.progress = false;
            },1000)
          
        } else { 
            this.progress = true
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
      this.$emit('ConfirmEvent', action)
    },

  }
}
</script>
