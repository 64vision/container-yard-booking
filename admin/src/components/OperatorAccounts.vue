<template>
  <v-container fluid >
     <v-row  class="mb-4">
        <v-col cols="6" sm="4">
              <v-card class="pa-4 text-center text-info" tile>
                <v-icon size="small" class="mr-2">mdi-account-multiple</v-icon>  Acounts: {{Count(accounts.length)}}
              </v-card>
        </v-col>
        <v-col cols="6" sm="4">
              <v-card class="pa-4 text-center text-success">
                <v-icon color="success" size="small" class="mr-2">mdi-ferry</v-icon> Shipping Owners: {{Count(rolefilter('Shipping Owner'))}}
              </v-card>
        </v-col>
         <v-col cols="6" sm="4">
              <v-card class="pa-4 text-center text-info" tile>
                <v-icon size="small" class="mr-2">mdi-train-car-container</v-icon>  Yard Operator: {{Count(rolefilter('Yard Operator'))}}
              </v-card>
        </v-col>
       
      </v-row>
    <v-row no-gutters>
              <v-toolbar class="elevation-1" color="white" rounded>
                <v-toolbar-title class="font-weight-bold"><v-icon size="large" class="mr-2" theme="dark">mdi-account-multiple</v-icon>Admin and Operators</v-toolbar-title>
                <v-spacer></v-spacer>
            <div style="width: 350px;" class="mr-4">
          <v-text-field
                  label="Search"
                  class="mt-4"
                  outlined
                  variant="solo"
                  :onchange="resetPage()"
                  density="compact"
                  append-icon="mdi-account-search-outline"
                  v-model="search"
                  clearable
                  append
                />
              </div>
              <v-divider class="mx-4" inset vertical></v-divider>
            <v-btn color="primary" class="ma-2" @click="actform=true, state='new'">
              
              <v-icon left class="mr-2">mdi-account-plus</v-icon>  Add
            </v-btn>
              </v-toolbar>
      </v-row>
   
      <v-row>
  
        <v-col cols="12">
            <v-card tile class="elevation-0">
  
              <v-card-text>
            
            <table class="hpb-table hpb-table-border-bottom">
              <thead>
                <tr >
                 
                  <th class="text-left">Name</th>
                  <th class="text-left">Role</th>
                  <th class="text-left">Mobile</th>
                   <th class="text-left">Email</th>
                  <th class="text-left">Company</th>
                  <th class="text-left">Created</th>
                  <th class="text-left">Status</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in PAGEDATA" :key="item.id">
                 
                  <td>
                     <v-icon @click="account=item, actform=true, state='edit'" size="small" class="mr-2">mdi-open-in-new</v-icon>
                    {{ item.fullname}} 
                    <!-- <v-chip :color="item.level==1?'primary':'warning'" size="x-small" variant="outlined	">{{ AcctLabel(item.level) }}</v-chip> -->
                  </td>
                  <td>{{ item.role}}</td>
                  <td>{{ item.mobile_no}}</td>
                  <td>{{ item.email}}</td>
                  <td>{{ item.company}}</td>
                 
                   <td>{{ $moment(item.created_at).format("MMM DD, YYYY")}}</td>
                  <td>
                    <v-chip size="x-small" :color="Status(item.status)">
                      {{ item.status}}
                    </v-chip> 
                    </td>
                  
                </tr>
              </tbody>
            </table>

              <em>{{page_num}}  of {{total_page_num}} pages</em>

          </v-card-text>
          </v-card>
          
      </v-col>
      </v-row>
    
      <v-row no-gutters>
        <v-col cols="12" class="text-center">
          <v-pagination
            v-model="page_num"
            :length="total_page_num"
            :total-visible="total_page_num"
            color="primary"
            class="my-4"
          ></v-pagination>
        </v-col>
      </v-row>
     
  
      <AdminForm :show="actform" :state="state" :account_id="account.id" @FormEvent="FormEvent"/>
    
  </v-container>
  </template>
  <script>
  import api from '@/plugins/axios.js'
  import {
    mapMutations
  } from 'vuex'
    export default {
      data: () => ({
        state: "new",
        actform: false,
        myplayers: false,
        acthistory: false,
        page_num:1,
        total_page_num: 0,
        item_count:0,
        per_page:40,
        loading: false,
        valid: true,
        account:{},
        drawer: false,
        search:"",
        accounts:[],
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
         api.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.token
         this.getItems()
       }
    
      },
      computed: {
        BANNED(){
          return this.statusfilter("Banned")    
        },
        ACTIVE(){
          return this.statusfilter("Active")    
        },
        CREDITS(){
          let total =  this.accounts.reduce((res, item) =>res+=item.balance, 0)
          return total
        },
        PAGEDATA(){
          let start_index = (this.page_num - 1) * this.per_page
          let end_index = start_index + this.per_page
          return this.FILTERDATA.slice(start_index, end_index)
        },
        FILTERDATA(){
          if (this.search == "") {
            return  this.accounts
          } else {
              return this.searchPlayers()
          }
        }
      },
      methods: {
        ...mapMutations(['setLoggedIn']),
        resetPage(){
         // alert(this.search)
          this.page_num = 1
          
        },
        searchPlayers(){
          if (this.search == "") {
            return  this.accounts
          }
         return  this.accounts.reduce((res, item) =>{
            if(item.fullname.toLowerCase().includes(this.search.toLowerCase()) || item.company.toLowerCase().includes(this.search.toLowerCase()) || item.mobile_no.includes(this.search.toLowerCase()) || item.email.toLowerCase().includes(this.search.toLowerCase()) || item.role.toLowerCase().includes(this.search.toLowerCase()) ) {
                res.push(item)
            }
            return res
          },[])
        },
         pEvent(){
           this.myplayers = false
              this.acthistory = false
                this.actform = false
      },
      
        FormEvent(e) {
          if('close' == e) {
              this.myplayers = false
              this.acthistory = false
                this.actform = false
          }
          this.getItems()
        },
        validate () {
          if (this.$refs.form.validate()) {
            this.Update()
          }
        },
        statusfilter(status){
          let items =  this.accounts.reduce((res, item) =>{
                      if(item.status ==  status) {
                            res.push(item)
                      }
                      return res
                  }, [])
          return items
        },
        rolefilter(role){
          let items =  this.accounts.reduce((res, item) =>{
                      if(item.role ==  role) {
                            res.push(item)
                      }
                      return res
                  }, [])
          return items.length
        },
        
        getItems() {
          api.post('admin/qry',{
                table: 'administrators',
                type: 'query',
                query: "select * from administrators order by id desc"
            })
        .then(response => {
          if(response.status) {
            console.log("Data: ",response.data)
              this.accounts = response.data.administrators
              this.item_count = response.data.administrators.length
                this.total_page_num = Math.ceil(this.item_count / this.per_page)
          }
        })
        }
      }
      
    }
  </script>
  