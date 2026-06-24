<template>
    <v-dialog
    v-model="dialog"
    persistent
    width="350">
   
    <v-card color="#2C5B82" dark>
        
          <v-card-text class="pa-4 def-font">
              {{message}}
          </v-card-text>
          <v-card-actions>
              <v-btn small color="error" text @click="emitToParent('close')">
                  {{cancelbtn}}
              </v-btn>
              <v-spacer/>
              <v-btn small color="success" text @click="emitToParent('ok')">
                  {{okbtn}}
              </v-btn>
          </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
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
    }
  }
}
</script>
