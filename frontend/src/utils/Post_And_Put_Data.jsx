import { instance } from "@/axios/axios";

export async function AddDataMahasiswaAndAdmin(data) {
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
    console.log(error);

    return error;
  }
}

export async function AddDataPelajaran(dataName) {
  try {
    const responseAddPelajaran = await instance.post(`/pelajaran`, {
      ...dataName,
    });
    return responseAddPelajaran;
  } catch (error) {
    return error;
  }
}
export async function EditDataPelajaran(dataName) {
  const { oldNamePelajaran, newNamePelajaran } = dataName;
  try {
    const responseAddPelajaran = await instance.put(
      `/pelajaran/${oldNamePelajaran}`,
      {
        name: newNamePelajaran,
      }
    );
    return responseAddPelajaran;
  } catch (error) {
    return error;
  }
}
