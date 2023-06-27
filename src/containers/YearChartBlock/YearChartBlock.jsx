import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

// components
import InfoCard from "../../components/InfoCard";

// helpers
import formatThousands from "../../helpers/formatThousands";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const ticksStyles = {
  font: { size: "12px", lineHeight: "160%", family: "'Inter', sans-serif" },
  color: "#64748B",
};

const options = {
  fill: true,
  responsive: true,
  legend: { display: false },
  scales: {
    x: { grid: { drawBorder: false, display: false, }, ticks: ticksStyles },
    y: { ticks: { beginAtZero: true, callback: formatThousands, ...ticksStyles }, }
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgba(37, 99, 235, 1)",
      tension: 0.6,
      backgroundColor: ({ chart: { ctx, chartArea } }) => {
        if (!chartArea) return null;

        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

        gradient.addColorStop(1, "rgba(37, 99, 235, .4)");
        gradient.addColorStop(0, "rgba(37, 99, 235, 0)");

        return gradient;
      },
    },
  ],
};


function YearChartBlock() {


  return (
    <InfoCard
      title="5,566.01"
      subtitle="Overall revenue"
    >
      <Line options={options} data={data} />
    </InfoCard>
  );
}

export default YearChartBlock;
