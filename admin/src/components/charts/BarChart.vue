<script setup>
import { ref, watch  } from "vue";
import { Chart, registerables, Colors } from "chart.js";
import { Bar } from "vue-chartjs";

// Register Chart.js components
Chart.register(...registerables);
Chart.register(Colors);

// // Chart data & options
// var chartData = ref({

//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul ", "Aug", "Sep", "Oct", "Nov", "Dec"],
//   datasets: [
//     {
//       borderWidth: 1,
//       fill: false,
//       label: "Sales",
//       data: [10, 20, 30, 25, 40, 20, 60,40,10, 10, 20, 30, ],
//       borderColor: "#42A5F5",
//       backgroundColor: "rgba(66, 165, 245, 0.2)",
//       tension: 0.2, // Smooth curve
//     },
//   ],
  
// });

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    colors: {
      enabled: false,
      forceOverride: true
    }
  },
});


</script>

<template>
  <div>
    <Bar id="line-chart" :data="chartData" :options="chartOptions" v-if="show"/>
    <div class="text-center" v-else>
                    <v-progress-circular
                
                :size="50"
                color="success"
                indeterminate
              ></v-progress-circular></div>
 
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    chartData: null
    }),
  props: {
      chartdata: {
          type: Object,
          default:()=>{}
      }
  },
  computed: {

  },
  created() {
    console.log("CD")
       
          setTimeout(() => {
            console.log("chart")
          
       
            this.chartData = ref({

              labels: this.chartdata.labels,
              datasets: [
                {
                  borderWidth: .5,
    
                  fill: true,
                  label: "Sales",
                  data: this.chartdata.datas,
                  borderColor: "#42A5F5",
                  tension: 0.2, // Smooth curve
                  backgroundColor:'#9BD0F5'

                },
              ],

              });
              this.show = true
           
          }, 800);
        },
  watch: {
  
  }
}
</script>

