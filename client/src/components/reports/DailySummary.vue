<template>
    <div>
      <v-card color="accent"> 
            <table class="hpb-table hpb-table-border-bottom">
            <thead>
              <tr >
                <th class="text-left hp-head">Race Date</th>
                <th class="text-left hp-head">Race No.</th>
                <th class="text-right hp-head">Gross</th>
                <th class="text-right hp-head">Win</th>
                <th class="text-right hp-head">Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(summary,index) in sales_summaries" :key="index">
                <td :class="Even(index)">{{ $moment(summary.race_date).format("MMMM DD, YYYY")}}</td>
                <td :class="Even(index)">#{{ summary.race_no }}</td>
                <td  :class="Even(index)" class="text-right">{{ Money(gross_per_game(summary.per_game)) }}</td>
                <td  :class="Even(index)" class="text-right">{{ Money(win_per_game(summary.race_id)) }}</td>
                <td  class="text-right" :class="Even(index), parseClass(gross_per_game(summary.per_game) - win_per_game(summary.race_id))">{{ Money(gross_per_game(summary.per_game) - win_per_game(summary.race_id)) }}</td>
              </tr>
            </tbody> 
            <tfoot>
                <tr>
                    <th colspan="3" class="text-right text-h6 font-weight-bold  hp-head">{{Money(TOTAL)}}</th>
                    <th class="text-right text-h6 font-weight-bold  hp-head">{{Money(WINTOTAL)}}</th>
                    <th class="text-right text-h6 font-weight-bold  hp-head" >{{Money(TOTAL - WINTOTAL)}}</th>
                </tr>
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
    TOTAL(){
        var total = 0
        if( this.sales_summaries.length == 0) total
         this.sales_summaries.reduce((res, item) =>{
         
          total = total +  this.gross_per_game(item.per_game)
          return total
        }, 0)
        return total
      },
      WINTOTAL(){
        var total = 0
         this.sales_summaries.reduce((res, item) =>{
         
          total = total +  this.win_per_game(item.race_id)
          return total
        }, 0)
        return total
      }
  },
  methods: {
    win_per_game(race_id){
        var wins =  this.win_summaries.reduce((res, item) =>{
          if(item.race_id == race_id){
              res = item
          }
          return res
        }, {})
        if(wins == undefined) {
          return 0
        }
        if(wins.per_game  == null) {
          return 0
        }
       return wins.per_game.reduce((res, item) =>{
          return res + item.total
        }, 0)
      },
      gross_per_game(per_games){
        if(per_games == undefined) {
          return 0
        }
        return per_games.reduce((res, item) =>{
          return res + item.total
        }, 0)
    
    }
  }
}
</script>
