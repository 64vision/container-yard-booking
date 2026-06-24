<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="450"
    >
      <v-img
         class="animate__animated animate__zoomIn"
        height="100"
        src="@/assets/hyperball.png"
      />
      <v-row>
        <v-col cols="12">
          <v-form
             ref="form"
             class="animate__animated animate__zoomIn"
             v-model="valid"
             lazy-validation
          >
          <v-card class="elevation-2 ma-5">
            <v-card-text>
              <p class="text-center mb-8 text-h6 font-weight-light">Create Account</p>
              <v-text-field
                label="Referral Code (Optional)"
                density="compact"
                outlined
                v-model="referral"
              />
              <v-text-field
                label="Mobile Number"
                density="compact"
                outlined
                v-model="mobile"
                        :rules="mobileRules"
              />
              <v-text-field
                label="First Name"
                outlined
                density="compact"
                v-model="firstname"
                        :rules="nameRules"
              />
              <v-text-field
                label="Last Name"
                outlined
                density="compact"
                v-model="lastname"
                        :rules="lastRules"
              />
              <v-text-field
                label="Enter your PIN"
                type="password"
                density="compact"
                class="mt-4"
                outlined
                  v-model="password"
                        :rules="passRules"
              />
              <v-text-field
                label="Re-enter PIN"
                density="compact"
                type="password"
                class="mt-4"
                outlined
                  v-model="repassword"
              />
              <div class="mt-8">
            <v-btn color="primary" block rounded size="x-large"
              :loading="loading"
              @click="loading=true,validate()"
            >
            SIGN IN</v-btn>
            </div>
            
            
            <p class="text-center ma-8"><v-btn href="login" @click="$router.push('login')" flat size="small">Already have an account?</v-btn></p>
          </v-card-text>
        </v-card>
      </v-form>
        </v-col>
      </v-row>
      
    </v-responsive>
  </v-container>
</template>

<script>
import {
  mapMutations
} from 'vuex'
import api from '@/plugins/axios.js'
import { md5 } from 'js-md5';
  export default {
    data: () => ({
      valid: true,
      username: '',
      referral:"",
      mobile: '',
      firstname:'',
      lastname:'',
      password: '',
      repassword:'',
      nameRules: [
        v => !!v || 'Please enter your fistname!'
      ],
      lastRules: [
        v => !!v || 'Please enter your last name!'
      ],
      mobileRules: [
        v => !!v || 'Please enter your mobile'
      ],
      passRules: [
        v => !!v || 'Please enter your password!'
      ],
      loading: false,
    }),
    created(){
      
    },
    methods:{
      ...mapMutations(['setLoggedIn']),
      validate () {
        this.loading=false
        if (this.$refs.form.validate()) {
          this.login()
        }
      },
      login () {
        console.log("Login..")
        api.post('account/login_by_password',{username: this.username, password: md5(this.password)})
      .then(response => {
         if(response.data.status) {
          sessionStorage.setItem('token', response.data.token)
          sessionStorage.setItem('account', JSON.stringify(response.data.account))
          if(response.data.account.level ==1) {
            this.AlertMsg("Permission Denied!","warning")
          } else {
            this.setLoggedIn(true)
           this.$router.push('/dashboard')
          }
          
         } else{
            this.AlertMsg(response.data.message,"warning")
         }
 
      })
      }
    }
  }
</script>
