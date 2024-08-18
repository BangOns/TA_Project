import FormLogin from "@/Mycomponents/Login/FormLogin";
import React from "react";

export default function Login() {
  return (
    <main className="h-screen w-screen bg-slate-300/80">
      <article className="w-full h-full grid place-items-center max-md:px-3">
        <section className="w-full md:w-2/3 lg:w-2/5 h-auto p-4 bg-white shadow-lg rounded-lg pb-10">
          <header className="w-full text-center">
            <h1 className=" text-3xl sm:text-5xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-black from-30%  to-slate-300 to-70% ">
              R
            </h1>
            <section className="mt-2 sm:mt-5">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Welcome Back
              </h2>
              <p className="mt-1 max-sm:text-sm font-semibold text-slate-400">
                Input youre account in here{" "}
              </p>
            </section>
          </header>
          <section className="w-full mt-5">
            <FormLogin />
          </section>
        </section>
      </article>
    </main>
  );
}
