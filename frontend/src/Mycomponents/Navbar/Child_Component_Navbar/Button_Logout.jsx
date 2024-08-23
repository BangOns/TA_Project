import { Button } from "@/components/ui/button";
import { LogoutUserOrAdmin } from "@/utils/DeleteData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Button_Logout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: LogoutUserOrAdmin,
    onSuccess: () => {
      toast.success("Logout Success");
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["detected"] });
    },
  });
  return (
    <Button
      className="border-0 w-full gap-3 group hover:bg-red-500 justify-start"
      variant="outline"
      onClick={() => mutation.mutate()}
    >
      <LogOut className="group-hover:text-white" />
      <p className="group-hover:text-white">Logout</p>
    </Button>
  );
}
