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
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddDataPelajaran } from "@/utils/Post_And_Put_Data";
import { toast } from "react-toastify";
import { SchemaFormAddPelajaran } from "@/helper/SchemaZod";

const formSchema = SchemaFormAddPelajaran;
export default function Button_Add_Pelajaran() {
  const [open, openSet] = useState(false);
  const [messageError, messageErrorSet] = useState("");
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const mutation = useMutation({
    mutationFn: AddDataPelajaran,
    onSuccess: (data) => {
      if (data.status !== 200) {
        toast.error("Add Pelajaran is Failed ", {
          autoClose: 3000,
        });
        messageErrorSet("Pelajaran is already exist");
        openSet(true);
      } else {
        queryClient.invalidateQueries({ queryKey: ["tablepelajaran"] });
        toast.success("Add Pelajaran is success ", {
          autoClose: 3000,
        });
        openSet(false);
      }
    },
    onError: () => {
      toast.error("Add Pelajaran is failed ", {
        autoClose: 3000,
      });
      openSet(false);
    },
  });
  function onSubmit(values) {
    mutation.mutate(values);
  }
  return (
    <Dialog open={open} onOpenChange={openSet}>
      <DialogTrigger asChild>
        <Button
          className="bg-red-500 hover:bg-red-700 max-sm:text-xs text-white  gap-1 sm:gap-2 items-center max-sm:px-2"
          size="sm"
        >
          <Plus className="max-sm:w-4 max-sm:h-4" />
          Add Pelajaran
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className={"border-b-[1px] pb-[14px]  border-slate-200"}>
          <DialogTitle className="px-6">Add New Student</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 px-6"
          >
            <div className="flex gap-2 flex-col">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name Pelajaran</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {messageError && (
                <p className="my-0 text-red-500 text-sm">{messageError}</p>
              )}
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
