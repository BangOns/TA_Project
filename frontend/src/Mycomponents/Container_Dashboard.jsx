import React from "react";

export default function Container_Dashboard({ children }) {
  return (
    <main className="mt-[62px] h-auto ml-14 sm:ml-24 lg:ml-[280px] bg-slate-100">
      <article className="py-[35px] px-4 lg:px-[43px]">{children}</article>
    </main>
  );
}
