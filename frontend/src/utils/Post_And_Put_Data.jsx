import { instance } from "@/axios/axios";

export async function AddDataMahasiswa(data) {
  try {
    const responseAddMahasiswa = await instance.post("/users", {
      ...data,
    });
    return responseAddMahasiswa;
  } catch (error) {
    return error;
  }
}

export async function EditDataUser(data) {
  const { id, ...updateDataUser } = data;

  try {
    const responseEditMahasiswaByIdMahasiswa = await instance.put(
      `/users/${id}`,
      {
        ...updateDataUser,
      }
    );
    return responseEditMahasiswaByIdMahasiswa;
  } catch (error) {
    return error;
  }
}

export async function EditDataNilaiPelajaran(data) {
  const { NpmMahasiswa, idPelajaran, ...updateNilai } = data;
  try {
    const responseEditPelajaranByIdPelajaran = await instance.put(
      `/pelajaran/${NpmMahasiswa}/${idPelajaran}`,
      {
        ...updateNilai,
      }
    );
    return responseEditPelajaranByIdPelajaran;
  } catch (error) {
    return error;
  }
}
