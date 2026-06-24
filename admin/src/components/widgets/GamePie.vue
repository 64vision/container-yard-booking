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
        Seq:[],
        sales:[],
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
      fetchSales() {
        console.log( this.from_date,  this.to_date  )
          api.post('/report/qry',{
            table: 'sales_summaries',
            type:'query',
            query: "select * from sales_summaries where to_date(race_date, 'YYYY-MM-DD') >= '" + this.from_date + "' and to_date(race_date, 'YYYY-MM-DD') <='" + this.to_date + "'"
              })
        .then(response => {
          if(response.status) {
            response.data.sales !=null?this.sales = response.data.sales:this.sales = [] 
          }
        })
        
      },

     
  }
}
</script>
