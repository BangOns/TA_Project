import DataCharts from "@/utils/DataChart";
import Cookies from "js-cookie";
import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: DataCharts.map((item) => item.nameLabel),

  datasets: [
    {
      label: "Pelajaran",
      data: DataCharts.map((item) => item.avarege),
      backgroundColor: DataCharts.map((item) => item.backgroundColor),
      borderWidth: 1,
    },
  ],
};
export default function Chart_Dashboard() {
  const cookies = Cookies.get("token");

  return (
    <div className="w-full max-lg:h-56 lg:h-[25rem] flex flex-col justify-between lg:block   bg-white px-5 lg:px-[39px] pt-[29px] rounded-lg">
      <h1 className="text-base lg:text-2xl font-bold">Student</h1>
      <Bar
        data={data}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}
