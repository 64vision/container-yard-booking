<template>
  <div>
        <PageHeader/>
   <div class="pagehero">
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="650"
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
                   REGISTER
                </div>
          <v-card class="elevation-2 ma-2">
            <v-card-text>
              <p class="mb-1 font-weight-light"><v-icon left class="mr-2" color="warning">mdi-domain</v-icon>Company Details</p>
                 <v-divider class="my-4" primary></v-divider>
              <v-text-field
                label="Company Name"
                density="compact"
                outlined
                :rules="textRules"
                v-model="company_name"
              />
              <v-text-field
                label="Company Address"
                density="compact"
                outlined
                v-model="company_address"
                        :rules="textRules"
              />
              <v-autocomplete
                :items="['TRUCKER', 'BROOKER', 'FORWARDER', 'SHIPPING LINE']"
                label="Company Type"
                density="compact"
                outlined
                v-model="company_type"
                :rules="textRules"
              />

            
              <p class="mb-1 font-weight-light"><v-icon left class="mr-2" color="warning">mdi-account</v-icon> Contact Person</p>
                <v-divider class="my-4" primary></v-divider>
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
                label="Contact Number"
                outlined
                density="compact"
                v-model="mobile"
                        :rules="mobileRules"
              /> 
                <p class="mb-1 font-weight-light"><v-icon left class="mr-2" color="warning">mdi-key</v-icon>Login Credentials</p>
                <v-divider class="my-4" primary></v-divider>
               <v-text-field
                label="Email Address"
                outlined
                density="compact"
                v-model="email"
                        :rules="emailRules"
              />
              <v-text-field
                label="Enter your password"
                type="password"
                density="compact"
                outlined
                  v-model="password"
                        :rules="passRules"
              />
              <v-text-field
                label="Re-enter Password"
                density="compact"
                type="password"
                outlined
                  v-model="repassword"
              />
              <div class="mt-8">
            <v-btn color="primary" block rounded size="x-large"
              :loading="loading"
              @click="loading=true,validate()"
            >
            register</v-btn>
            </div>
            
            
            <p class="text-center ma-8"><v-btn href="login" @click="$router.push('login')" flat size="small">Already have an account?</v-btn></p>
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
      email: '',
      mobile: '',
      firstname:'',
      lastname:'',
      password: '',
      repassword:'',
      company_name:'',
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
        console.log("Registering...")
      
      }
    }
  }
</script>
