import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AddDataMahasiswaAndAdmin } from "@/utils/Post_And_Put_Data";
import { SchemaFormAddAdmin } from "@/helper/SchemaZod";
import { toast } from "react-toastify";
const formSchema = SchemaFormAddAdmin;
export default function FormRegister() {
  const [messageError, messageErrorSet] = useState("");
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      npm: "",
      password: "",
      rePassword: "",
    },
  });
  const mutation = useMutation({
    mutationFn: AddDataMahasiswaAndAdmin,
    onSuccess: () => {
      toast.success("Add Admin is success ", {
        autoClose: 3000,
      });
      navigate("/");
    },
    onError: () => {
      toast.error("Add Admin is failed ", {
        autoClose: 3000,
      });
    },
  });
  function onSubmit(values) {
    if (values.rePassword === values.password) {
      const newData = {
        name: values.name,
        npm: values.npm,
        password: values.password,
      };
      mutation.mutate(newData);
    } else {
      messageErrorSet("Password not match");
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
              name="name"
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
                        placeholder="Youre name"
                        {...field}
                        className="font-semibold max-sm:text-xs border-0 bg-white px-2"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="rePassword"
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
                        placeholder="Re-Password"
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
              Register
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
