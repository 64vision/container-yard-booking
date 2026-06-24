<script setup>
import { ref, watch  } from "vue";
import { Chart, registerables, Colors } from "chart.js";
import { Pie } from "vue-chartjs";

// Register Chart.js components
Chart.register(...registerables);
Chart.register(Colors);


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
    <Pie id="line-chart" :data="chartData" :options="chartOptions" v-if="show"/>
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
                  label: "Game Share",
                  data: this.chartdata.datas,
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(200, 66, 245)',
                    'rgb(163, 150, 31)',
                    'rgb(43, 181, 38)',
                    'rgb(224, 47, 145)',
                    'rgb(82, 235, 35)'
                  ],
            
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

