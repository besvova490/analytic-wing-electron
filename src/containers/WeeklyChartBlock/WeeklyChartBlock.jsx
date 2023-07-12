import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

// components
import InfoCard from "../../components/InfoCard";

// helpers
import formatThousands from "../../helpers/formatThousands";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);

const ticksStyles = {
  font: { size: "12px", lineHeight: "160%", family: "'Inter', sans-serif" },
  color: "#64748B",
};

const gridOptions = { drawBorder: false, display: false, };

const options = {
  maintainAspectRatio: false,
  fill: true,
  responsive: true,
  legend: { display: false },
  scales: {
    x: { grid: gridOptions, ticks: ticksStyles },
    y: { grid: gridOptions, ticks: { beginAtZero: true, callback: formatThousands, ...ticksStyles }, }
  },
};

function WeeklyChartBlock({ labels, data }) {

  const configData = {
    labels,
    datasets: [
      {
        label: "Weekly",
        data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <InfoCard
      subTitle="User Activity"
      title="10,320"
    >
      <Bar options={options} data={configData} height={null} width="100%"/>
    </InfoCard>
  );
}

WeeklyChartBlock.propTypes = {
  labels: PropTypes.array,
  data: PropTypes.array,
};

export default WeeklyChartBlock;
