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
  Percent(total,part) {
    if (part == 0 || total == 0) {
      return "0.00%"
    }
     let percent = this.IsNum(total) * (this.IsNum(part) / 100)
     console.log("percent",percent)
    return percent.toFixed(2)
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
    SalesType(str){
        switch(str){
            case "personal":
              return "Personal"
            case "direct":
              return "Direct"
            case "sub_upline":
             return "Downline Level 1"  
            case "upline":
              return "Downline Level 2"  
            default:
              return "Player"
        }
    },
    GameName(str){
        switch(str){
            case "HW":
              return "BLAZE WIN"
            case "H2":
              return "BLAZE 2"
            case "H3":
             return "BLAZE 3"  
            case "H5":
              return "BLAZE 5"  
            case "S6":
              return "MAX 6"
            case "S7":
              return "MAX 7" 
             case "S8":
              return "MAX 8" 
             case "S9":
              return "MAX 9"        
            default:
              return "BLAZE"
        }
    },
    
    CopyTextLink(text){
      //const text = document.getElementById("textToCopy").innerText;

      var _reflink = "https://play.blazingsphere.net/?ref="+text
    
      navigator.clipboard.writeText(_reflink)
        .then(() =>   this.AlertMsg("Refferal link copied!","success"))
        .catch(err => console.error("Copy failed:", err));
    },
    CopyText(){
      const text = document.getElementById("textToCopy").innerText;

      var _reflink = "https://play.blazingsphere.net/?ref="+text
    
      navigator.clipboard.writeText(_reflink)
        .then(() =>   this.AlertMsg("Refferal link copied!","success"))
        .catch(err => console.error("Copy failed:", err));
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