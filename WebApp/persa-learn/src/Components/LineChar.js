import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as Charts } from "chart.js/auto";
const LineChar = ({ chartData }) => {
  return (
    <Line
      data={chartData}
      options={{
        resposive: true,
        // maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
};

export default LineChar;
