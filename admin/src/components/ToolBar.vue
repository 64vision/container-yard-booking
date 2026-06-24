<template>
     <v-app-bar color="white">
        <template v-slot:prepend>
            <v-avatar>
      <v-img
        src="@/assets/hyperball.png"
      ></v-img>
    </v-avatar>
  </template>
       
        <v-toolbar-title><span class="font-weight-thin">Dashboard</span></v-toolbar-title>

        <v-spacer></v-spacer>
        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-power" color="error" @click="confirm=true"></v-btn>
        </template>
      </v-app-bar>
      <ConfirmDialog :show="confirm" message="Would you like to Logout?" cancelbtn="Not Now" okbtn="Logout" @ConfirmEvent="dEv"/>
</template>
<script>
import {
  mapMutations
} from 'vuex'
  export default {
    data: () => ({
      drawer: true,
      confirm: false,
      group: null
    }),

    watch: {
      group () {
        this.drawer = false
      },
       
    },
    methods: {
       ...mapMutations(['setLoggedIn']),
      dEv(e){
        this.confirm = false
        if(e == "ok") {
          this.setLoggedIn(false)
            sessionStorage.removeItem('account')
            sessionStorage.removeItem('token')
          this.$router.push('/login')
        }
        
      },
    }
  }
</script>