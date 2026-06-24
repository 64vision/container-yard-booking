<template>
  <div>
    <v-card color="accent"> 
          <table class="hpb-table hpb-table-border-bottom">
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
          <tfoot>
              <!-- <tr>
                  <th colspan="3" class="text-right text-h6 font-weight-bold  hp-head">{{Money(TOTAL)}}</th>
                  <th class="text-right text-h6 font-weight-bold  hp-head">{{Money(WINTOTAL)}}</th>
                  <th class="text-right text-h6 font-weight-bold  hp-head" >{{Money(TOTAL - WINTOTAL)}}</th>
              </tr> -->
          </tfoot>
        </table>
      </v-card>    
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


      //   groupedData.forEach((value, key) => {
      //       console.log({province:key, sales: value}); // 0, 1, 2
      //       arr.push({province:key, sales: value}); // 0, 1, 2
      // });

        return groupedData
    }
 
},
methods: {
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
