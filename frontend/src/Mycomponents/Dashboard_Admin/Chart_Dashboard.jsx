import { getDataMahasiswa, getDataToCharts } from "@/utils/GetData";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export default function Chart_Dashboard() {
  const cookies = Cookies.get("token");
  const [DataCharts, DataChartsSet] = useState({ labels: [], datasets: [] });

  function PositionLabelsCharts() {
    if (window.innerWidth < 600) {
      return "bottom"; // Ubah ke bottom jika lebar layar kurang dari 600px
    }
    return "top";
  }

  useEffect(() => {
    async function GetDataCharts() {
      const [pelajaranSet, datasets] = await getDataToCharts(cookies);
      DataChartsSet({ labels: Array.from(pelajaranSet), datasets: datasets });
    }
    GetDataCharts();
  }, [cookies]);
  return (
    <div
      className="w-full max-lg:h-56 lg:h-[25rem] flex flex-col justify-between lg:block
    max-sm:overflow-auto
    bg-white px-5 lg:px-[39px] pt-[29px] rounded-lg "
    >
      <h1 className="text-base lg:text-2xl font-bold ">Student</h1>
      {DataCharts.labels.length !== 0 ? (
        <Bar
          className=" "
          data={DataCharts}
          options={{
            plugins: {
              legend: {
                position: PositionLabelsCharts(),
                align: "start",
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
