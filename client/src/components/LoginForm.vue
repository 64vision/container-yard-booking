<template>
  <div class="pagehero">
     <PageHeader/>
  <div>   
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="450"
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
                  SIGN IN
                </div>
          <v-card class="elevation-2 ma-5">
            <v-card-text>
              <p class="text-center mb-8 text-h6 font-weight-light"></p>
              <v-text-field
                label="Email Address"
                outlined
                prepend-inner-icon="mdi-email"
                v-model="username"
                        :rules="emailRules"
              />
              <v-text-field
                label="Password"
                type="password"
                class="mt-4"
                outlined
                prepend-inner-icon="mdi-lock"
                v-model="password"
                        :rules="nameRules"
              />
              <div class="mt-8">
            <v-btn color="primary" block rounded size="x-large"
              :loading="loading"
              @click="loading=true,validate()"
            >
            SIGN IN</v-btn>
            </div>
            
            
              <p class="text-center ma-8"><v-btn  @click="$router.push('forgot')" flat size="small">Forgot Password?</v-btn></p>
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
      valid: true,
      username: '',
      password: '',
      emailRules: [
        v => !!v || 'Please enter your username'
      ],
      nameRules: [
        v => !!v || 'Please enter your password!'
      ],
      loading: false,
    }),
    created(){
      
    },
    methods:{
      ...mapMutations(['setLoggedIn']),
      validate () {
       
        if (this.$refs.form.validate()) {
          setTimeout(()=>{
            this.login()}, 1000)
          }
      },
      login () {
        console.log("Login..")
        api.post('account/login_by_password',{username: this.username, password: md5(this.password)})
      .then(response => {
         if(response.data.status) {
          sessionStorage.setItem('token', response.data.token)
          sessionStorage.setItem('account', JSON.stringify(response.data.account))
           this.setLoggedIn(true)
           this.$router.push('/dashboard')
          
         } else{
            this.AlertMsg(response.data.message,"warning")
         }
        this.loading=false
      })
      }
    }
  }
</script>
