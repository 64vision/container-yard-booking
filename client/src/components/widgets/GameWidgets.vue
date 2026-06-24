<template>
    <div>
    
            <table class="hpb-table hpb-table-border-bottom">
        
            <tbody>
              <tr v-for="(item,index) in SALESUMMARIES" :key="index">
 
                <td>
                    <div class="pa-4 font-weight-bold" style="height: 25px;" >
                           <span style="float: left;" >{{item.game}} </span>  <span style="float: right;">{{Money(item.total)}}</span>
                         
                    </div>

                </td>
           
              </tr>
            </tbody> 

          </table>

    </div>
</template>

<script>

export default {
    data: () => ({
        drawer: false,
        Seq:[]
    }),
  props: {
      show:{
          type: Boolean,
          default: false
      },
      type:{
          type: String,
          default: "sales"
      },
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
      this.Seq = this.$store.state.Seq
  },
  computed: {
    SALESUMMARIES(){
      let sumsales = []
      for (var i = 0; i < this.Seq.length; i++) {
        if(this.type=="sales") {
          sumsales.push({game:this.Seq[i], total: this.GameTotal(this.Seq[i])})
        } else {
          sumsales.push({game:this.Seq[i], total: this.GameWinTotal(this.Seq[i])})
        }
        
      }
      return sumsales
    }
  },
  methods: {
      CalculateRevenue(win,sales) {
     //   console.log(sales, win)
        return sales - win
      },
    
    //   gameSeq(per_games){
    //     console.log(per_games)
    //     if(per_games == undefined || per_games == null) {
    //       return []
    //     }
    //       var games = []
    //         for (var i = 0; i < this.Seq.length; i++) {
    //           let found = false
    //           for(var j = 0; j < per_games.length; j++) {
               
    //             if(this.Seq[i] == per_games[j].game) {
    //               found = true
                
    //               games.push(per_games[j])
    //             }
    //           }
    //           if(!found) {
    //             games.push({game: this.Seq[i], total: 0})
                
    //           }
            
    //         }
    //         return games
    //   },
    //   winperdrawgame(game, race_id){
    //     var wins = this.win_per_game(race_id) 
    //      var item = wins.reduce((res, item) =>{
    //                   if(item.game == game){
    //                     res = item
    //                   }
    //                   return res
    //           }, {})
    //         return item.total
    //   },
    // win_per_game(race_id){
    
    //     var wins =  this.win_summaries.reduce((res, item) =>{
    //       if(item.race_id == race_id){
    //           res = item
    //       }
    //       return res
    //     }, {})
    //     if(wins == undefined) {
    //       return {}
    //     }
    //     return this.gameSeq(wins.per_game)
    //   },
     
  }
}
</script>
