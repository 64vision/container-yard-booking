<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="450"
    >
      <v-img
        class="animate__animated animate__zoomIn"
        height="200"
        src="@/assets/hyperball.png"
      />
      <v-row>
        <v-col cols="12">
          <v-form
             ref="form"
             v-model="valid"
              class="animate__animated animate__zoomIn"
             lazy-validation
          >
          <v-card class="elevation-2 ma-5">
            <v-card-text>
              <p class="text-center mb-8 text-h6 font-weight-light">SIGN IN</p>
              <v-text-field
                label="Username"
                outlined
                v-model="username"
                        :rules="emailRules"
              />
              <v-text-field
                label="Password"
                type="password"
                class="mt-4"
                outlined
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
            
            
            <p class="text-center ma-8">Forgot Password?</p>
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
        this.loading=false
        if (this.$refs.form.validate()) {
          this.login()
        }
      },
      login () {
        console.log("Login..")
        api.post('admin/login',{username: this.username, password: md5(this.password)})
      .then(response => {
         if(response.data.status) {
          sessionStorage.setItem('token', response.data.token)
          sessionStorage.setItem('account', JSON.stringify(response.data.account))
          this.setLoggedIn(true)
           this.$router.push('/')
         } else{
            this.AlertMsg(response.data.message,"warning")
         }
 
      })
      }
    }
  }
</script>
