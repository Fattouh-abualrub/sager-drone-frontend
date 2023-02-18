<template>
  <div class="flex md:flex-row flex-col justify-center">
    <div class="w-full p-2">
      <Bar v-if="loaded" id="bar" :options="chartOptions" :data="chartDataBar" />
    </div>
    <div class="w-full p-2">
      <Pie v-if="loaded" id="pie" :options="chartOptions" :data="chartDataPie" />
    </div>
  </div>
</template>

<script>
import { Pie, Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

export default {
  name: "Charts",
  components: { Pie, Bar },
  data() {
    return {
      loaded: false,
      chartDataBar: {
        labels: [],
        datasets: [
          {
            label: "Users",
            backgroundColor: "#BAE6FD",
            data: [],
          },
          {
            label: "Products",
            backgroundColor: "#0EA5E9",
            data: [],
          },
          {
            label: "Categories",
            backgroundColor: "#0C4A6E",
            data: [],
          },
        ],
      },
      chartDataPie: {
        labels: ["Users", "Products", "Categories"],
        datasets: [
          {
            backgroundColor: ["#BAE6FD", "#0EA5E9", "#0C4A6E"],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {
    let response = await this.$store.dispatch("get_totals");
    if (response.status == true) {
      this.chartDataBar.labels = response.month_names;
      this.chartDataPie.datasets[0].data = response.total_numbers;
      this.chartDataBar.datasets[0].data = response.monthly_total.users;
      this.chartDataBar.datasets[1].data = response.monthly_total.products;
      this.chartDataBar.datasets[2].data = response.monthly_total.categories;
      this.loaded = true;
    } else {
      if (response.message != undefined) {
        this.$toast.error(response.message);
      }
    }
  },
};
</script>
