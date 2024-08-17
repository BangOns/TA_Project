import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
export default function Card_Dashboard({ title, icons, range, persentation }) {
  return (
    <section className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <img src={icons} alt="" className="mt-0 w-5 h-5 sm:w-10 sm:h-10" />
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-base sm:text-2xl">{range}</p>
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
