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

import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDataMahasiswaById } from "@/utils/GetData";
import { EditDataNilaiPelajaran } from "@/utils/Post_And_Put_Data";
import { toast } from "react-toastify";
import { SchemaFormNilai } from "@/helper/SchemaZod";
import { GetDataPelajaranContext } from "@/utils/Context";
const formSchema = SchemaFormNilai;
export default function Button_Edit_Nilai({ dataUserById }) {
  const [open, openSet] = useState(false);
  const cookies = Cookies.get("token");
  const queryClient = useQueryClient();
  const { GetDataPelajaranByContext } = useContext(GetDataPelajaranContext);
  const { data } = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: async () => await getDataMahasiswaById(dataUserById, cookies),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nilai: "",
      kehadiran: "",
      idPelajaran: "",
    },
  });

  const mutation = useMutation({
    mutationFn: EditDataNilaiPelajaran,
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries({ queryKey: ["tablemahasiswa"] });
      toast.success("Edit Nilai is Succcess ", {
        autoClose: 3000,
      });
      openSet(false);
    },
    onError: (error) => {
      console.log(error);

      toast.error("Edit Nilai is Failed ", {
        autoClose: 3000,
      });
      openSet(false);
    },
  });
  async function onSubmit(values) {
    const NpmMahasiswa = await data.data.data.npm;
    const { idPelajaran, nilai, kehadiran } = values;
    mutation.mutate({
      NpmMahasiswa,
      idPelajaran,
      nilai,
      kehadiran,
    });
  }
  async function GetValueEditNilai(idPelajaran) {
    if (idPelajaran && data) {
      const getDataPelajaranById = await data.data.data.data_pelajaran?.find(
        (value) => {
          return value._id === idPelajaran;
        }
      );
      form.setValue("idPelajaran", idPelajaran);
      form.setValue("nilai", getDataPelajaranById.nilai);
      form.setValue("kehadiran", getDataPelajaranById.kehadiran);
    }
  }

  return (
    <Dialog open={open} onOpenChange={openSet}>
      <DialogTrigger asChild>
        <Button className="bg-transparent group hover:bg-orange-500 w-full text-black justify-start hover:text-white py-0">
          Edit Nilai
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
            <FormField
              control={form.control}
              name="idPelajaran"
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
                        <SelectItem key={i} value={item._id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-6 ">
              <FormField
                control={form.control}
                name="nilai"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nilai</FormLabel>
                    <FormControl>
                      <Input placeholder="Input Nilai" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kehadiran"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Kehadiran</FormLabel>
                    <FormControl>
                      <Input placeholder="Input Kehadiran" {...field} />
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
