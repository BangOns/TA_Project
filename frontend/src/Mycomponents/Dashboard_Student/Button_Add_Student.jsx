import React, { useState } from "react";
import validator from "validator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DataCharts from "@/utils/DataChart";
import DataUser from "@/utils/DataUser";
import Instances from "@/utils/DataInstance";
const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "fullname must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(2, {
      message: "fullname must be at least 2 characters.",
    })
    .email({ message: "Please enter a valid email address." }),
  phoneNumber: z
    .string()
    .refine(validator.isMobilePhone, "Please enter a valid phone number.")
    .optional(),
  instance: z.string().nonempty("Please enter a valid instance."),
  password: z.string({
    message: "Please enter a valid password.",
  }),
  rePassword: z.string({
    message: "Please enter a valid password.",
  }),
});
export default function Button_Add_Student({ dataUsersSet, dataUsers }) {
  const [open, openSet] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phoneNumber: "",
      instance: "",
      password: "",
      rePassword: "",
    },
  });
  function onSubmit(values) {
    const Program = DataCharts.map((item) => item.nameLabel);
    if (values.rePassword === values.password) {
      const createdAt = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const newUser = {
        fullname: values.fullname,
        email: values.email,
        phoneNumber: values.phoneNumber,
        instance: values.instance,
        password: values.password,
        Program: Program[Math.floor(Math.random() * Program.length)],
        createdAt,
      };
      openSet(false);
      dataUsersSet([...dataUsers, newUser]);
    } else {
      openSet(true);
      alert("password not match");
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
                name="fullname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>fullname</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhon" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jhondoe@gmail.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex  gap-6">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+62 0987324968" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instance"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Instance</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="w-12"
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Instance" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Instances.map((item, i) => (
                          <SelectItem key={i} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

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
                    <FormLabel>password</FormLabel>
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
            <DialogFooter>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  className="bg-red-500 hover:bg-red-700 text-white"
                >
                  Save
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
