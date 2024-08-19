import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import Cookies from "js-cookie";
import { getDataMahasiswa, getDataPelajaran } from "@/utils/GetData";

export default function Card_Dashboard({ title, icons, persentation }) {
  const [data, dataSet] = useState([]);
  const cookies = Cookies.get("token");
  async function ChooseCard(title) {
    if (title.includes("Mahasiswa")) {
      const response = await getDataMahasiswa(cookies);
      dataSet(response);
    } else if (title.includes("Pelajaran")) {
      const response = await getDataPelajaran(cookies);
      dataSet(response.data);
    } else {
      const response = {
        data: [],
      };
      dataSet(response.data);
    }
  }

  useEffect(() => {
    ChooseCard(title);
  }, [title, cookies]);
  return (
    <section className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <img src={icons} alt="" className="mt-0 w-5 h-5 sm:w-10 sm:h-10" />
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-base sm:text-2xl">
            {data.length || 0}
          </p>
        </CardContent>
        <CardFooter>
          <TrendingUp color="#00B69B" className="pr-2" />
          <p className="max-sm:text-xs text-green-500 ">
            {persentation}{" "}
            <span className="text-slate-500">Up from yesterday</span>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
