"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import * as Utils from "./utils";

const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 1000 };

const Graph = ({ list }: any) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = list.map((event: any) => event.name);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Attendance",
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
      },
      {
        label: "Attendance to Merch ",
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
      },
      {
        label: "Merch page to checkout ",
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.purple,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.purple, 0.5),
      },
      {
        label: "Profit ",
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.orange,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
      },
    ],
  };

  return (
    <div
      style={{
        width: "90vw",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
      }}
    >
      <Line
        data={data}
        options={{
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Events Insight",
            },
          },
        }}
      />
    </div>
  );
};

export default Graph;
