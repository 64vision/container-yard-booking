<template>
    <div>
      <v-card color="accent"> 
            <table class="hpb-table hpb-table-border-bottom">
            <thead>
              <tr >
                <th class="text-left hp-head">Race Date</th>
                <th class="text-left hp-head">Race No.</th>
                <th class="hp-head">Games Gross</th>
                <th class="text-right hp-head">Win</th>
                <th class="text-right hp-head">Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(summary,index) in sales_summaries" :key="index">
                <td :class="Even(index)">{{ $moment(summary.race_date).format("MMMM DD, YYYY")}}</td>
                <td :class="Even(index)">#{{ summary.race_no }}</td>
                <td  :class="Even(index)">
                    <div v-for="(item,g) in  gameSeq(summary.per_game)" :key="g" class="pa-4" style="height: 25px;">
                           <span style="float: left;">{{item.game}} </span>  <span style="float: right;">{{Money(item.total)}}</span>
                            <v-divider/>
                    </div>

                </td>
                <td  :class="Even(index)">
                  <div v-for="(item,g) in  win_per_game(summary.race_id)" :key="g" class="pa-4" style="height: 25px;">
                    <span style="float: right;">{{Money(item.total)}}</span>
                            <v-divider/>
                    </div>


                </td>
                <td  class="text-right" :class="Even(index)">
                  <div v-for="(item,g) in  gameSeq(summary.per_game)" :key="g" class="pa-4" style="height: 25px;">
                      <span style="float: right;" :class="parseClass(CalculateRevenue(winperdrawgame(item.game, summary.race_id), item.total))">{{Money(CalculateRevenue(winperdrawgame(item.game, summary.race_id), item.total))}}</span>
                            <v-divider/>
                    </div>

                </td>
              </tr>
            </tbody> 
            <tfoot>
                <tr>
                    <th colspan="3" class="text-right text-h6 font-weight-bold  hp-head"></th>
                    <th class="text-right text-h6 font-weight-bold  hp-head"></th>
                    <th class="text-right text-h6 font-weight-bold  hp-head"></th>
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
        Seq:["HW","H2","H3","H5","S6","S7","S8","S9"]
    }),
  props: {
      show:{
          type: Boolean,
          default: false
      },
      sales_summaries: {
            type: Array,
            default: 0
      },
      win_summaries: {
            type: Array,
            default: 0
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
      CalculateRevenue(win,sales) {
     //   console.log(sales, win)
        return sales - win
      },
      gameSeq(per_games){
        console.log(per_games)
        if(per_games == undefined) {
          return []
        }
          var games = []
            for (var i = 0; i < this.Seq.length; i++) {
              let found = false
              for(var j = 0; j < per_games.length; j++) {
               
                if(this.Seq[i] == per_games[j].game) {
                  found = true
                  console.log(per_games[j].game,this.Seq[i])
                  games.push(per_games[j])
                }
              }
              if(!found) {
                games.push({game: this.Seq[i], total: 0})
                
              }
            
            }
            return games
      },
      winperdrawgame(game, race_id){
        var wins = this.win_per_game(race_id) 
         var item = wins.reduce((res, item) =>{
                      if(item.game == game){
                        res = item
                      }
                      return res
              }, {})
            return item.total
      },
    win_per_game(race_id){
    
        var wins =  this.win_summaries.reduce((res, item) =>{
          if(item.race_id == race_id){
              res = item
          }
          return res
        }, {})
        if(wins == undefined) {
          return {}
        }
        return this.gameSeq(wins.per_game)
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
