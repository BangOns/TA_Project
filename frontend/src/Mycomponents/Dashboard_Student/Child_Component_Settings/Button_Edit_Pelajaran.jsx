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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditDataPelajaran } from "@/utils/Post_And_Put_Data";
import { toast } from "react-toastify";
import { SchemaFormEditPelajaran } from "@/helper/SchemaZod";
import { FilePenLine } from "lucide-react";
import { GetDataPelajaranContext } from "@/utils/Context";
const formSchema = SchemaFormEditPelajaran;
export default function Button_Edit_Pelajaran() {
  const [open, openSet] = useState(false);
  const queryClient = useQueryClient();
  const { GetDataPelajaranByContext } = useContext(GetDataPelajaranContext);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldNamePelajaran: "",
      newNamePelajaran: "",
    },
  });
  const mutation = useMutation({
    mutationFn: EditDataPelajaran,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tablemahasiswa"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tablepelajaran"],
      });
      toast.success("Edit Pelajaran is Succcess ", {
        autoClose: 3000,
      });
      openSet(false);
    },
    onError: (error) => {
      toast.error("Edit Pelajaran is Failed ", {
        autoClose: 3000,
      });
      openSet(false);
    },
  });
  async function onSubmit(values) {
    const { oldNamePelajaran, newNamePelajaran } = values;
    mutation.mutate({
      oldNamePelajaran,
      newNamePelajaran,
    });
  }
  async function GetValueEditNilai(namePelajaran) {
    form.setValue("oldNamePelajaran", namePelajaran);
  }

  return (
    <Dialog open={open} onOpenChange={openSet}>
      <DialogTrigger asChild>
        <Button className="w-full border-0 justify-start" variant="outline">
          <div className="flex gap-3 justify-start">
            <FilePenLine width={20} height={20} />
            Edit Pelajaran
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className={"border-b-[1px] pb-[14px]  border-slate-200"}>
          <DialogTitle className="px-6">Edit Nilai User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 px-6"
          >
            <div className="flex gap-6 ">
              <FormField
                control={form.control}
                name="oldNamePelajaran"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>List Pelajaran</FormLabel>
                    <Select
                      onValueChange={(e) => GetValueEditNilai(e)}
                      className="w-12"
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pelajaran" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GetDataPelajaranByContext.map((item, i) => (
                          <SelectItem key={i} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Form Input Edit Pelajaran */}
              <FormField
                control={form.control}
                name="newNamePelajaran"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Update Pelajaran</FormLabel>
                    <FormControl>
                      <Input placeholder="Input Pelajaran" {...field} />
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
