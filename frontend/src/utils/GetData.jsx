import { instance } from "@/axios/axios";

export async function getDataMahasiswa(token) {
  try {
    const response = await instance.get("/users", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const FilterUserMahasiswa = response.data.data.filter(
      (mhs) => mhs.role === "user"
    );

    return FilterUserMahasiswa;
  } catch (error) {
    return error.response.data;
  }
}
export async function getDataPelajaran(token) {
  try {
    const response = await instance.get("/pelajaran", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export async function getDataToCharts(token) {
  try {
    const dataMahasiswa = await getDataMahasiswa(token);
    const pelajaranSet = new Set();
    const datasets = dataMahasiswa.map((mahasiswa) => {
      mahasiswa.data_pelajaran.forEach((pelajaran) =>
        pelajaranSet.add(pelajaran.name)
      );
      return {
        label: mahasiswa.name,
        data: mahasiswa.data_pelajaran.map((pelajaran) => pelajaran.nilai),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)})`,
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      };
    });

    return [pelajaranSet, datasets];
  } catch (error) {
    return error;
  }
}
