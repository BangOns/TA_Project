import React, { useContext, useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { SchemaFormEditUser } from "@/helper/SchemaZod";
import { UserPen } from "lucide-react";
import { GetIdContext } from "@/utils/Context";
import { EditDataUser } from "@/utils/Post_And_Put_Data";
const formSchema = SchemaFormEditUser;
export default function Button_Edit_Admin() {
  const { getDataById } = useContext(GetIdContext);
  const [open, openSet] = useState(false);
  const [messageError, messageErrorSet] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: EditDataUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Edit Data is Succcess ", {
        autoClose: 3000,
      });
      openSet(false);
    },
    onError: () => {
      toast.error("Add Data is failed ", {
        autoClose: 3000,
      });
      openSet(false);
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
    let newDataAdmin = null;
    const olderPassword = await getDataById.password;
    const idUser = await getDataById._id;
    if (values.oldPassword !== olderPassword) {
      messageErrorSet("Password lama salah");
    } else if (
      values.newPassword.length !== 0 ||
      values.oldPassword === olderPassword
    ) {
      newDataAdmin = {
        id: idUser,
        name: values.name,
        npm: values.npm,
        password: values.newPassword || olderPassword,
      };
      mutation.mutate(newDataAdmin);
    } else {
      messageErrorSet("Password lama salah");
    }
  }
  async function GetValueEditMahasiswa(data) {
    if (data) {
      form.setValue("name", data.name);
      form.setValue("npm", data.npm);
      form.setValue("oldPassword", data.password);
    }
  }
  useEffect(() => {
    GetValueEditMahasiswa(getDataById);
  }, [getDataById]);
  return (
    <Dialog open={open} onOpenChange={openSet}>
      <DialogTrigger asChild>
        <Button
          className="border-0 hover:text-white items-center w-full gap-3 group hover:bg-sky-500 justify-start"
          variant="outline"
        >
          <UserPen />
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
                        disabled={getDataById.npm.length >= 12 ? true : false}
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
            {messageError && (
              <p className="text-red-500 text-sm">{messageError}</p>
            )}
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
