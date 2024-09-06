import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddDataMahasiswaAndAdmin } from "@/utils/Post_And_Put_Data";
import { toast } from "react-toastify";
import { SchemaFormAddUser } from "@/helper/SchemaZod";

const formSchema = SchemaFormAddUser;
export default function Button_Add_Student() {
  const [open, openSet] = useState(false);
  const [messageError, messageErrorSet] = useState("");
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ["tablemahasiswa"] });
      toast.success("Add Student is success ", {
        autoClose: 3000,
      });
      openSet(false);
    },
    onError: () => {
      toast.error("Add Student is failed ", {
        autoClose: 3000,
      });
      openSet(false);
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
    <Dialog open={open} onOpenChange={openSet}>
      <DialogTrigger asChild>
        <Button
          className="bg-red-500 hover:bg-red-700 max-sm:text-xs text-white  gap-1 sm:gap-2 items-center max-sm:px-2"
          size="sm"
        >
          <Plus className="max-sm:w-4 max-sm:h-4" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className={"border-b-[1px] pb-[14px]  border-slate-200"}>
          <DialogTitle className="px-6">Add New Student</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 px-6"
          >
            <div className="flex gap-6 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhon" {...field} />
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
                    <FormLabel>NPM</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="****" {...field} type="password" />
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
                    <FormLabel>Re-Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*****" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {messageError && <p>{messageError}</p>}
            <div className="flex justify-end">
              <Button
                type="submit"
                size="sm"
                className="bg-red-500 hover:bg-red-700 text-white"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
