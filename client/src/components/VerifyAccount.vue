<template>
  <div>
        <PageHeader/>
   <div class="pagehero">
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="400"
    >
    
      <v-row>
        <v-col cols="12">
          <v-form
             ref="form"
             class="animate__animated animate__zoomIn"
             v-model="valid"
             lazy-validation
          >
          <div class="text-h4 font-weight-black text-center">
                   Verify Account
                </div>
          <v-card class="elevation-2 ma-2">
            <v-card-text>
                <template v-if="!verified">
              <v-alert type="info" color="" prominent class="mb-5">
                Verification Code was sent to your email {{email}}.
              </v-alert>

              <v-text-field
                label="Enter Verification Code"
                :rules="textRules"
                v-model="code"
              />
              <div class="mt-8">
            <v-btn color="warning" block rounded size="x-large"
              :loading="loading"
              @click="loading=true,validate()"
            >
           <v-icon color="white" class="mr-4">mdi-check</v-icon> Verify Account</v-btn>
            </div>
            </template>
             <p  class="text-center ma-8 font-italic" v-if="verified" >
                Loading account dashboard...
      <v-img
       height="70"
       src="@/assets/loading_me.gif"
     />
     </p>
            <p class="text-center ma-8" v-if="!verified"><v-btn href="login" @click="$router.push('login')" flat size="small">Already have an account?</v-btn></p>
          </v-card-text>
        </v-card>
      </v-form>
        </v-col>
      </v-row>
      
    </v-responsive>
  </v-container>
  </div>
  </div> 
</template>

<script>
import {
  mapMutations
} from 'vuex'
import api from '@/plugins/axios.js'
import { md5 } from 'js-md5';

  export default {
    data: () => ({
      verified: false,
      valid: true,
      email: '',
      mobile: '',
      firstname:'',
      lastname:'',
      password: '',
      repassword:'',
      company_name:'',
      code:'',
      company_address:'',
      company_type:'',
      textRules: [
        v => !!v || 'Field is required'
      ],
      nameRules: [
        v => !!v || 'Please enter your first name!'
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
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Invalid email",
      ],
      loading: false,
    }),
    created(){
      this.email = localStorage.email
      this.password = localStorage._check
    },
    methods:{
      ...mapMutations(['setLoggedIn']),
      validate () {
        
        if (this.$refs.form.validate()) {
           setTimeout(()=>{
              this.verify()
            }, 1000)
        }
      },
       login () {
        console.log("Login..")
        api.post('account/login_by_password',{username: this.email, password: md5(this.password)})
      .then(response => {
         if(response.data.status) {
          sessionStorage.setItem('token', response.data.token)
          sessionStorage.setItem('account', JSON.stringify(response.data.account))
           this.setLoggedIn(true)
           this.$router.push('/dashboard')
          
         } else{
            this.AlertMsg(response.data.message,"warning")
         }
 
      })
      },
      verify () {
        console.log("Verifying......")
        var params = {
          code: this.code,
          value: this.email,
          type: "email"
        }
          api.post('account/verify', params)
        .then(response => {
          if(response.data.status) {
       
            this.AlertMsg(response.data.message,"success")
             this.verified = true
            setTimeout(()=>{
              this.login()
            }, 1500)
           
          } else{
              this.AlertMsg(response.data.message,"warning")
          }
           this.loading=false
          
        })
      }
    }
  }
</script>
