import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteDataMahasiswa } from "@/utils/DeleteData";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function Button_Delete_Student({ id }) {
  const [open, openSet] = useState(false);
  const tokenCookies = Cookies.get("token");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, token }) => DeleteDataMahasiswa({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tablemahasiswa"] });
      openSet(false);
      toast.success("Delete success ", {
        autoClose: 3000,
      });
    },
    onError: (error, variables, context) => {
      openSet(false);
      toast.error(`Delete failed, because: ${error.message}`, {
        autoClose: 3000,
      });
    },
  });
  function handleDelete(id) {
    mutation.mutate({
      id,
      token: tokenCookies,
    });
  }
  return (
    <Dialog open={open} onOpenChange={openSet}>
      <DialogTrigger asChild>
        <Button className="bg-transparent  group hover:bg-red-500 " size="sm">
          <Trash2
            role="button"
            className=" w-5 h-5 text-red-500 group-hover:text-white"
            width={20}
            height={20}
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className={"border-b-[1px] pb-[14px]  border-slate-200"}>
          <DialogTitle className="text-center">
            Are you absolutely sure?
          </DialogTitle>
        </DialogHeader>
        <section className="text-center">
          <p>Yakin untuk menghapus akun ini ? 😥</p>
          <div className="mt-3 w-full flex justify-center gap-3">
            <Button
              className={"bg-yellow-300 hover:bg-yellow-500  text-black"}
              onClick={() => {
                openSet(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className={"bg-red-500 hover:bg-red-700  text-white"}
              onClick={() => handleDelete(id)}
            >
              Delete
            </Button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
