import IconsImport from "@/utils/IconsImport";
import ImagesImport from "@/utils/ImagesImport";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar_aside() {
  const { pathname } = useLocation();

  return (
    <nav className="max-sm:w-14 w-24 lg:w-[280px] fixed z-[2] left-0 top-0 h-svh bg-[#1C1C1C]">
      <header className="py-[42px] px-2 sm:px-[25px]">
        <figure className="">
          <img
            src={ImagesImport.Logo}
            alt="logo-sagara"
            className="hidden lg:block"
          />
          <img
            src={ImagesImport.LogoMobile}
            alt="logo-sagara"
            className="block lg:hidden"
          />
          <figcaption className="mt-[50px]">
            <p className="text-slate-400 max-sm:text-sm">Menu</p>
            <ul className="mt-[15px]">
              <li>
                <Link
                  to={"/"}
                  className={`  ${
                    pathname === "/" && "bg-red-500 text-white"
                  } flex items-center max-sm:justify-center gap-[10px] sm:w-full py-2 sm:px-[15px] hover:bg-red-500 hover:text-white text-slate-400 rounded mb-[6px]`}
                >
                  <img
                    src={IconsImport.Dashboard}
                    alt=""
                    className="max-sm:w-3 max-sm:h-3"
                  />
                  <p className="hidden lg:block ">Dashboard</p>
                </Link>
              </li>
              <li>
                <Link
                  to={"/student"}
                  className={` *:
                     ${pathname === "/student" && "bg-red-500 text-white"}
                    flex items-center max-sm:justify-center gap-[10px] w-full py-2 sm:px-[15px] hover:bg-red-500 hover:text-white text-slate-400 rounded`}
                >
                  <img src={IconsImport.Student} alt="" />
                  <p className="hidden lg:block ">Student</p>
                </Link>
              </li>
            </ul>
          </figcaption>
        </figure>
      </header>
    </nav>
  );
}
