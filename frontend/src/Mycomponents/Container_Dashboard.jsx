import React from "react";
import Navbar_header from "./Navbar/Navbar_header";
import Navbar_aside from "./Navbar/Navbar_aside";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar_header />
      <Navbar_aside />
      <main className="mt-[62px] h-auto ml-14 sm:ml-24 lg:ml-[280px] bg-slate-100">
        <article className="py-[35px] px-4 lg:px-[43px]">
          <Outlet />
        </article>
      </main>
    </>
  );
}
