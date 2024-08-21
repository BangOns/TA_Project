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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDataMahasiswaById, getDataPelajaran } from "@/utils/GetData";
import { EditDataNilaiPelajaran } from "@/utils/PostData";
const formSchema = z.object({
  nilai: z.coerce
    .number({
      message: "Please, input this number",
    })
    .min(1, {
      message: "Input be correctly",
    }),
  kehadiran: z.coerce
    .number({
      message: "Please, input this number",
    })
    .min(1, {
      message: "Input be correctly",
    })
    .lte(16, {
      message: "Kehadiran tidak boleh lebih dari 16",
    }),
  idPelajaran: z.string().nonempty({ message: "Input be correctly" }),
});
export default function Button_Edit_Nilai({ dataUserById }) {
  const [open, openSet] = useState(false);
  const [messageError, messageErrorSet] = useState("");
  const cookies = Cookies.get("token");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: async () => await getDataMahasiswaById(dataUserById, cookies),
  });
  const { data: dataPelajaran, isLoading: loadingPelajran } = useQuery({
    queryKey: ["tablepelajaran"],
    queryFn: async () => await getDataPelajaran(cookies),
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tablemahasiswa"] });
      openSet(false);
    },
    onError: (error) => {
      messageErrorSet(error.message);
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

  useEffect(() => {}, [data]);

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
                  {!loadingPelajran && dataPelajaran ? (
                    dataPelajaran.data.map((item, i) => (
                      <SelectItem key={i} value={item._id}>
                        {item.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="Loading">Loading</SelectItem>
                  )}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>

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
