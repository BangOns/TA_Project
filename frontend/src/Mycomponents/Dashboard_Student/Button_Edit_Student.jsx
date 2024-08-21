import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDataMahasiswaById } from "@/utils/GetData";
import { EditDataMahasiswa } from "@/utils/PostData";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "fullname must be at least 2 characters.",
  }),
  npm: z
    .string()
    .min(12, {
      message: "fullname must be at least 12 characters.",
    })
    .max(12, {
      message: "fullname must be at least 12 characters.",
    }),

  oldPassword: z.string({
    message: "Please enter a valid password.",
  }),
  newPassword: z
    .string({
      message: "Please enter a valid password.",
    })
    .optional(),
});
export default function Button_Edit_Student({ dataUserById }) {
  const [open, openSet] = useState(false);
  const [messageError, messageErrorSet] = useState("");
  const queryClient = useQueryClient();
  const cookies = Cookies.get("token");
  const { data } = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: async () => await getDataMahasiswaById(dataUserById, cookies),
  });
  const mutation = useMutation({
    mutationFn: EditDataMahasiswa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tablemahasiswa"] });
      openSet(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      npm: "",
      oldPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit(values) {
    let newDataMahasiswa = null;
    const olderPassword = await data.data.data.password;
    const idUser = await data.data.data._id;
    if (values.oldPassword !== olderPassword) {
      messageErrorSet("Password lama salah");
    } else if (
      values.newPassword.length !== 0 ||
      values.oldPassword === olderPassword
    ) {
      newDataMahasiswa = {
        id: idUser,
        name: values.name,
        npm: values.npm,
        password: values.newPassword || olderPassword,
      };
      mutation.mutate(newDataMahasiswa);
    } else {
      messageErrorSet("Password lama salah");
    }
  }
  async function GetValueEditMahasiswa(data) {
    if (data) {
      const getDataPelajaranById = await data.data.data;
      form.setValue("name", getDataPelajaranById.name);
      form.setValue("npm", getDataPelajaranById.npm);
      form.setValue("oldPassword", getDataPelajaranById.password);
    }
  }
  useEffect(() => {
    GetValueEditMahasiswa(data);
  }, [data]);
  return (
    <Dialog open={open} onOpenChange={openSet}>
      <DialogTrigger asChild>
        <Button className="bg-transparent group hover:bg-amber-500 w-full text-black justify-start hover:text-white py-0">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className={"border-b-[1px] pb-[14px]  border-slate-200"}>
          <DialogTitle className="px-6">Edit Profile Student</DialogTitle>
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
                      <Input
                        placeholder="jhondoe@gmail.com"
                        {...field}
                        disabled={
                          data.data.data.npm.length >= 12 ? true : false
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-6 ">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input placeholder="****" {...field} type="password" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>New Password</FormLabel>
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
