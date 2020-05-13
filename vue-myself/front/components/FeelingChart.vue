<template>
  <div id="chart-container">
    <canvas id="myChart" width="300" height="200"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
export default {
  props: {
    feel: { type: Object, required: true }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      let ctx = document.getElementById("myChart");
      let myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["최고", "행복", "좋아", "우울", "최악"],
          datasets: [
            {
              // label: false,
              data: [
                this.feel.awesome,
                this.feel.good,
                this.feel.okay,
                this.feel.depressed,
                this.feel.terrible
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1.5
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "이번 달 기분 체크",
            position: "bottom"
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 5
                }
              }
            ]
          },
          legend: {
            display: false
          }
        }
      });
    }
  }
};
</script>

<style scoped>
#chart-container {
  width: 300px;
  height: 200px;
}
</style>