import { instance } from "@/axios/axios";

export async function DeleteDataMahasiswa({ id, token }) {
  try {
    await instance.delete(`/users/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function LogoutUserOrAdmin() {
  try {
    await instance.delete("/logout");
  } catch (error) {
    return error;
  }
}
