import { instance } from "@/axios/axios";

export async function EditDataMahasiswa(data) {
  const { id, ...updateDataMahasiswa } = data;
  try {
    const responseEditMahasiswaByIdMahasiswa = await instance.put(
      `/users/${id}`,
      {
        ...updateDataMahasiswa,
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