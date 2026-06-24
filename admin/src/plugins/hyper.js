import {
    mapMutations
  } from 'vuex'



export default {
  data() {
    return {
      message: "Hello from Mixin!",
    };
  },
  methods: {
    ...mapMutations(['showAlert','setAlertColor', 'setAlertText']),
     AcctLabel(level){
        switch(level){
            case 3:
              return "Agent"
            case 2:
              return "Sub-Agent"
            default:
              return "Player"
        }
    },
    TOTALSALES(){
      var total = 0
      if(!this.$store.state.sales_summaries){ return total}
      this.$store.state.sales_summaries.reduce((res, item) =>{
       
        total = total +  this.gross_per_game(item.per_game)
        return total
      }, 0)
      return total
    },
    TOTALWIN(){
      var total = 0
   
      this.$store.state.win_summaries.reduce((res, item) =>{
       
        total = total +  this.gross_per_game(item.per_game)
        return total
      }, 0)
      return total
    },
    GameWinTotal(game) {
      var total = 0
      if(!this.$store.state.win_summaries){ return total}
      this.$store.state.win_summaries.forEach((item) => {
      
        if(item.per_game == undefined || item.per_game == null) {
          return
      }
      
        for(var i=0;i<item.per_game.length;i++) {
          if(item.per_game[i].game == game) {
            
            total += item.per_game[i].total
          }
        }
      
      })
      return total
    },
    GameTotal(game) {
      var total = 0
      if(!this.$store.state.sales_summaries){ return total}
      this.$store.state.sales_summaries.forEach((item) => {
      
        if(item.per_game == undefined || item.per_game == null) {
          return
      }
      
        for(var i=0;i<item.per_game.length;i++) {
          if(item.per_game[i].game == game) {
            
            total += item.per_game[i].total
          }
        }
      
      })
      return total
    },
    gross_per_game(per_games){
      if(per_games == undefined) {
        return 0
      }
      return per_games.reduce((res, item) =>{
        return res + item.total
      }, 0)
  
  },
    AlertMsg(text,color){
        this.showAlert(true)
        this.setAlertText(text)
        this.setAlertColor(color)
    },
    Money(amount) {
      if (!amount) { amount = 0 }
      if (isNaN(amount)) {
        amount = 0
      }
      amount = parseFloat(amount).toFixed(2)
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    IsNum(input) {
      if (isNaN(parseFloat(input)) || input == null) {
        return 0
      }
      input = parseFloat(input).toFixed(2)
      return parseFloat(input)
    },
    Count(input) { 
      return input.toLocaleString()
    },
    Even(num) { 
      let _even =  num % 2 !== 0;
      if(_even) {
        return "td-even"
      }
    },
    parseClass(number) {
      if(number < 0) {
       return "text-error"
      } else {
        return "text-success"
      }
    },
     GroupBy(arr, key) {
      return arr.reduce((acc, obj) => {
        (acc[obj[key]] = acc[obj[key]] || []).push(obj);
        return acc;
      }, {});
    },
    Status(status){
      switch(status){
        case 'Active':
          return "success"
          case 'success':
            return "success"  
        case 'Ready':
          return "info"
        case 'Generated':
            return "gray"
        case 'completed':
          return "success"
          case 'claimed':
            return "success"
            case 'unclaimed':
              return "warning"
              case 'cancelled':
                return "cancelled-lined"      
        default:
            return "info"
      }    
    }
}//eof methods
};