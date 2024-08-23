import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AtSign, KeyRound, ShieldCheck } from "lucide-react";
import { instance } from "@/axios/axios";
const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "fullname must be at least 2 characters.",
  }),
  npm: z.string().min(10, {
    message: "Npm must be at least 10 characters.",
  }),
  password: z.string().min(1, { message: "Please enter a valid password." }),
});
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function FormLogin() {
  const [messageError, messageErrorSet] = useState("");
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      npm: "",
      password: "",
    },
  });
  async function onSubmit(values) {
    try {
      const { fullname, npm, password } = values;
      const response = await instance.post("/login", {
        fullname,
        npm,
        password,
      });
      if (response.status === 200) {
        navigate("/admin");
      }
    } catch (error) {
      messageErrorSet(error.response.data.data.errors[0].msg || error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 sm:space-y-4 px-3 sm:px-7 "
        >
          <div className="flex gap-6 ">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center border rounded-lg  bg-white px-3">
                      <AtSign
                        width={20}
                        height={20}
                        className="text-slate-500"
                      />
                      <Input
                        placeholder="Fullname"
                        {...field}
                        className="font-semibold max-sm:text-xs border-0 bg-white px-2"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6 ">
            <FormField
              control={form.control}
              name="npm"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center px-3 border rounded-lg   bg-white">
                      <ShieldCheck
                        width={20}
                        height={20}
                        className="text-slate-500"
                      />
                      <Input
                        placeholder="Npm"
                        {...field}
                        className="font-semibold max-sm:text-xs border-0 bg-white px-2"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-6 ">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center px-3 border rounded-lg   bg-white">
                      <KeyRound
                        width={20}
                        height={20}
                        className="text-slate-500"
                      />
                      <Input
                        placeholder="Password"
                        {...field}
                        type="password"
                        className="font-semibold max-sm:text-xs border-0 bg-white px-2"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {messageError && <p className="text-red-500">{messageError}</p>}
          <div className="w-full flex justify-center">
            <Button
              type="submit"
              size="sm"
              className="bg-red-500 w-full hover:bg-red-700 text-white text-sm sm:text-base shadow-lg font-semibold"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
