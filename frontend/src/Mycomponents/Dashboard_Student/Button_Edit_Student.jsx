import React, { useEffect, useState } from "react";
import validator from "validator";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pencil, Plus } from "lucide-react";
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
  rePassword: z
    .string({
      message: "Please enter a valid password.",
    })
    .optional(),
});
export default function Button_Edit_Student({
  dataUserById,
  DataUsers,
  DataUsersSet,
}) {
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
    if (values.rePassword === values.password) {
      const createdAt = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const updateUser = {
        fullname: values.fullname,
        email: values.email,
        phoneNumber: values.phoneNumber,
        instance: values.instance,
        password: values.password,
        createdAt,
        id: dataUserById.id,
      };
      DataUsersSet(
        DataUsers.map((user) =>
          user.id === dataUserById.id ? updateUser : user
        )
      );
      openSet(false);
    } else {
      openSet(true);
      alert("Password doesn't match");
    }
  }
  useEffect(() => {
    form.setValue("fullname", dataUserById.fullname);
    form.setValue("email", dataUserById.email);
    form.setValue("phoneNumber", dataUserById.phoneNumber);
    form.setValue("instance", dataUserById.instance);
    form.setValue("password", dataUserById.password);
    form.setValue("rePassword", dataUserById.password);
  }, []);
  return (
    <Dialog open={open} onOpenChange={openSet}>
      <DialogTrigger asChild>
        <Button className="bg-transparent group hover:bg-orange-500" size="sm">
          <Pencil
            role="button"
            className=" w-5 h-5 text-orange-400 group-hover:text-white"
          />
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
                          <SelectValue
                            placeholder="Instance"
                            defaultValue={field.value}
                            onChange={field.onChange}
                          />
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
