<template>
  <v-container fluid >
    
    <v-row no-gutters>
              <v-toolbar class="elevation-1" color="white" rounded>
                <v-toolbar-title class="font-weight-bold"><v-icon size="large" class="mr-2" theme="dark">mdi-ferry</v-icon>Shipping Lines</v-toolbar-title>
                <v-spacer></v-spacer>
            <div style="width: 350px;" class="mr-4">
          <v-text-field
                  label="Search"
                  class="mt-4"
                  outlined
                  variant="solo"
                  :onchange="resetPage()"
                  density="compact"
                  v-model="search"
                  clearable
                  append
                />
              </div>
              <v-divider class="mx-4" inset vertical></v-divider>
            <v-btn color="primary" class="ma-2" @click="actform=true, state='new'">
              
              <v-icon left class="mr-2">mdi-plus</v-icon>  Add
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
                  <th class="text-left">Address</th>
                  <!-- <th class="text-left">Capacity</th> -->
                  <th class="text-left">Status</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in PAGEDATA" :key="item.id">
                 
                  <td>
                     <v-icon @click="account=item, actform=true, state='edit'" size="small" class="mr-2">mdi-cog</v-icon>
                    {{ item.name}} 
                   
                  </td>
                  <td>{{ item.address}}</td>
                    <!-- <td>{{ item.Capacity}}</td> -->
                
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
     
  
      <ShippingForm :show="actform" :state="state" :item_id="account.id" @FormEvent="FormEvent"/>
    
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
        page_num:1,
        total_page_num: 0,
        item_count:0,
        per_page:40,
        loading: false,
        valid: true,
        account:{},
        drawer: false,
        search:"",
        itemlist:[],
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
       
        PAGEDATA(){
          let start_index = (this.page_num - 1) * this.per_page
          let end_index = start_index + this.per_page
          return this.FILTERDATA.slice(start_index, end_index)
        },
        FILTERDATA(){
          if (this.search == "") {
            return  this.itemlist
          } else {
              return this.searchItems()
          }
        }
      },
      methods: {
        ...mapMutations(['setLoggedIn']),
        resetPage(){
         // alert(this.search)
          this.page_num = 1
          
        },
        searchItems(){
          if (this.search == "") {
            return  this.accounts
          }
         return  this.accounts.reduce((res, item) =>{
            if(item.name.toLowerCase().includes(this.search.toLowerCase()) || item.address.toLowerCase().includes(this.search.toLowerCase())  ) {
                res.push(item)
            }
            return res
          },[])
        },
        
      
        FormEvent(e) {
          if('close' == e) {
             
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
                table: 'shippinglines',
                type: 'query',
                query: "select * from shipping_lines order by id desc"
            })
        .then(response => {
          if(response.status) {
            console.log("Data: ",response.data)
              this.itemlist = response.data.shippinglines
                this.item_count = response.data.shippinglines.length
                this.total_page_num = Math.ceil(this.item_count / this.per_page)
          }
        })
        }
      }
      
    }
  </script>
  