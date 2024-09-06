import { GetDataMahasiswaContext } from "@/utils/Context";
import React, { useContext, useState } from "react";
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
  FormMessage,
} from "@/components/ui/form";
import { FileMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaFormDeletePelajaran } from "@/helper/SchemaZod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { DeleteDataPelajaran } from "@/utils/DeleteData";
import { toast } from "react-toastify";
const formSchema = SchemaFormDeletePelajaran;

export default function Button_Delete_Pelajaran() {
  const [open, openSet] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const mutation = useMutation({
    mutationFn: DeleteDataPelajaran,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tablemahasiswa"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tablepelajaran"],
      });
      toast.success("Delete Pelajaran is Succcess ", {
        autoClose: 3000,
      });
      openSet(false);
    },
    onError: (error) => {
      toast.error("Delete Pelajaran is Failed ", {
        autoClose: 3000,
      });
      openSet(false);
    },
  });
  async function onSubmit(values) {
    mutation.mutate(values);
  }
  return (
    <Dialog open={open} onOpenChange={openSet}>
      <DialogTrigger asChild>
        <Button className="w-full border-0 justify-start" variant="outline">
          <div className="flex gap-3 justify-start">
            <FileMinus width={20} height={20} />
            Hapus Pelajaran
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className={"pb-[14px]  "}>
          <DialogTitle className="px-6">Data Mahasiswa</DialogTitle>
        </DialogHeader>
        <section className="w-full px-3 space-y-4">
          <header className="text-sm text-center">
            <h1>Apakah anda ingin menghapus pelajaran ini?</h1>
            <p>Jika iya, maka input nama pelajaran di bawah ini</p>
            <p className="text-slate-400">
              <span className="text-red-500">*</span>Contoh: Pelajaran 1
            </p>
          </header>
          <section className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-3"
              >
                <div className="flex gap-6 ">
                  {/* Form Input Edit Pelajaran */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder="Input Pelajaran"
                            {...field}
                            className="text-center"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <section className="flex justify-center gap-3 ">
                  <Button
                    className="bg-orange-300 hover:bg-orange-400 text-white"
                    size="sm"
                    type="button"
                    onClick={() => openSet(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-400 text-white"
                    size="sm"
                    type="submit"
                  >
                    Delete
                  </Button>
                </section>
              </form>
            </Form>
          </section>
        </section>
      </DialogContent>
    </Dialog>
  );
}
