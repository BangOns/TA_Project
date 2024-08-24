export function ConvertDataToExcel(data) {
  return data.map((items) => {
    const dataPelajaran = items.data_pelajaran.reduce((acc, pelajaran) => {
      acc[pelajaran.name] = pelajaran.Total_nilai;
      return acc;
    }, {});
    const dataConvert = {
      npm: items.npm,
      name: items.name,
      ...dataPelajaran,
      rata_rata: items.rata_rata_nilai,
    };
    return dataConvert;
  });
}
