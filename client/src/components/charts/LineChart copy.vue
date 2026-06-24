<script setup>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";
import { Line } from "vue-chartjs";

// Register Chart.js components
Chart.register(...registerables);

// Chart data & options
const chartData = ref({

  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul ", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      borderWidth: 1,
      fill: false,
      label: "Sales",
      data: [10, 20, 30, 25, 40, 20, 60,40,10, 10, 20, 30, ],
      borderColor: "#42A5F5",
      backgroundColor: "rgba(66, 165, 245, 0.2)",
      tension: 0.2, // Smooth curve
    },
  ],
  
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
});
</script>

<template>
  <div>
 
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
export default {
  props: {
    
      chartdata: {
          type: Object,
          default:()=>{}
      }
  },
  computed: {
  },
}
</script>

