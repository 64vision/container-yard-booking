<template>
<v-container fluid>
</v-container>
</template>
<script>
import {
  mapMutations
} from 'vuex'
  export default {
    data: () => ({
    _account:{}
    }),
    created: function () {
     console.log(sessionStorage.account)
     
      if (!sessionStorage.account) {
       this.setLoggedIn(false)  // Set loggedIn to false when no account is found in sessionStorage
        this.$router.push('/login')
     } else {
       this.setLoggedIn(true)  // Set loggedIn to true when an account is found in sessionStorage
       this._account = JSON.parse(sessionStorage.account)
     }
  
    },
    computed: {

    },
    methods: {
      ...mapMutations(['setLoggedIn']),

    }
    
  }
</script>
