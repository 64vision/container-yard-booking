<template>
  <div>
 
  
      <v-row >
        <v-col cols="12" sm="6">
          <v-card class="pa-2">
              <table class="hpb-table hpb-table-border-bottom montserrat-hpb">
              <thead>
                <tr >
                  <th class="text-left hp-head">City</th>
                  <th class="text-right hp-head">Sales</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in _CITYPERFORMANCES" :key="index">
                  <td>{{index}}</td>
                  <td class="text-right">{{ Money(_total(item))}}</td>
              
                </tr>
              </tbody> 
            
            </table>
       </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="pa-2">
          <table class="hpb-table hpb-table-border-bottom montserrat-hpb">
          <thead>
            <tr >
              <th class="text-left hp-head">Province</th>
              <th class="text-right hp-head">Sales</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(summary,index) in _PERFORMANCES" :key="index">
              <td>{{index}}</td>
               <td class="text-right">{{ Money(_getSales(summary))}}</td>
           
            </tr>
          </tbody> 
        
        </table>
        </v-card>
        </v-col>
      </v-row>
          

  </div>
</template>

<script>
import api from '@/plugins/axios.js'
import {
mapMutations
} from 'vuex'

export default {
  data: () => ({
      drawer: false,
  }),
props: {
    show:{
        type: Boolean,
        default: false
    },
    sales_summaries: {
          type: Array,
          default: ()=>[]
    },
    win_summaries: {
          type: Array,
          default: ()=>[]
    },
    okbtn: {
        type: String,
        default:''
    },
    cancelbtn: {
        type: String,
        default:''
    }
},
watch: {
  // show(val) {
  //   this.drawer = val
  //   console.log("value: " + val)
  //   if(val){
  //     this.fetchAccount()
  //   }
  // },
  // drawer(val) {
  //     console.log("value: " + val)
  //     if(!val) {
  //         this.emitToParent('close')
  //     }
  // }
},
created() {

},
computed: {
    _PERFORMANCES(){
     // var arr = []
        var sales = this._ProvinceSales()
        var arrData = sales.datas.flat()
        var groupedData = arrData.reduce((acc, item) => {
          if(item  != null) {
            (acc[item.province] = acc[item.province] || []).push({item});
          }
          return acc;
        }, {});

        return groupedData
    },
    _CITYPERFORMANCES(){
        var items= this.GroupBy(this._CitySales(), "city")
        return items
    },
    
 
},
methods: {
  _total(arr){
    return arr.reduce((res, item) => {
        res += this.IsNum(item.total)
          return res;
        }, 0)
  },
  _CitySales(){
    var cities =  this.sales_summaries.reduce((res, item) => {
        if(item.per_province != null){
          res.push(item.per_province);
        }
        
          return res;
        }, []);
      return cities.flat()
        },
  _ProvinceSales(){
          var labels =[]
          var datas = []
          var groupedData = this.sales_summaries.reduce((acc, item) => {
          (acc[item.race_date] = acc[item.race_date] || []).push(item.per_province);
          return acc;
        }, {});

          Object.keys(groupedData).forEach(race_date => {
              labels.push(race_date)
              datas.push(groupedData[race_date])
            });
            return {labels:labels,datas:datas.flat()}
        },
    _getSales(data){
      return data.reduce((res, item) => {
        return res + item.item.total
      }, 0)
    }, 
  getTotal(items){
        var total = 0
         items.reduce((res, item) =>{
         
          total = total +  this.gross_per_game(item.per_game)
          return total
        }, 0)
        return total
      },
}
}
</script>
