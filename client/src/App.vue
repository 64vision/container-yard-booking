<template>
  <v-app class="open-sans-hpb _hpbr_bg">
    <v-main>
      
      <ToolBar v-if="isLoggedIn"/>
      <!-- <NavigationBar v-if="isLoggedIn"/> -->
      <router-view />

      <v-snackbar
      v-model="Alert"
      :color="alertColor"
      :timeout="2000"
       location="top"
     >
      {{alertText }}
    </v-snackbar>

    </v-main>
  </v-app>
</template>
<style src="@/assets/css/custom.css"></style>
<script>
  //
  import {
  mapMutations
} from 'vuex'

  
  export default {
    data: () => ({
      
    }),
    computed: {
      isLoggedIn(){
        return this.$store.state.isLoggedIn;
      },
      Alert: {
        get () {
          return this.$store.state.show_alert
          },
          set (val) {
            this.showAlert(val)
          }
      },
      alertText() {
        return this.$store.state.alert_text
      },
      alertColor(){
          return this.$store.state.alert_color
      },
    },
    methods: {
      ...mapMutations(['showAlert']),
  
      
    }
  }
</script>
