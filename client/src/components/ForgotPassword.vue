<template>
  <div>
        <PageHeader/>
   <div class="pagehero">
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="350"
    >
    
      <v-row>
        <v-col cols="12">
          <v-form
             ref="form"
             class="animate__animated animate__zoomIn"
             v-model="valid"
             lazy-validation
          >
          <div class="text-h5 font-weight-black text-center">
                   Forgot Password?
                </div>
          <v-card class="elevation-2 ma-2">
            <v-card-text>
                <template v-if="!verified">
              <v-alert type="info" color="" prominent class="mb-5">
                Enter your registered email address and we will send you a temporary password.
              </v-alert>

              <v-text-field
                label="Email Address"
                :rules="emailRules"
                v-model="email"
              />
              <div class="mt-4">
            <v-btn color="warning" block rounded 
              :loading="loading"
              @click="loading=true,validate()"
            >
           <v-icon color="white" class="mr-4">mdi-check</v-icon> Forgot Password?</v-btn>
            </div>
            </template>
             <p  class="text-center ma-8 font-italic" v-if="verified" >
                Redirecting to login page... 
      <v-img
       height="70"
       src="@/assets/loading_me.gif"
     />
     </p>
            <p class="text-center ma-8" v-if="!verified"><v-btn  @click="$router.push('login')" flat size="small">Back to login</v-btn></p>
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
              this.forgot()
            }, 1000)
        }
      },
      
      forgot () {
        console.log("Sending forgot password request...", this.email)
       
          api.post('account/forgot', {email: this.email})
        .then(response => {
             console.log(response.data)
          if(response.data.status) {
           
            this.AlertMsg(response.data.message,"success")
             this.verified = true
            setTimeout(()=>{
                this.$router.push('/login')
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
