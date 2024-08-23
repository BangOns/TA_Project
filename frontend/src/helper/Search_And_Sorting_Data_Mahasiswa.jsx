export function GetDataMahasiswaBySortAndSearch(data, sortCategory, search) {
  const filterData = data.filter((items) => {
    return items.name.toLowerCase().includes(search.toLowerCase());
  });
  if (filterData.length !== 0) {
    return filterData.sort((itemsA, itemsB) => {
      const NilaiPelajaranA =
        itemsA.data_pelajaran.find(
          (pelajaran) => pelajaran.name === sortCategory
        ).Total_nilai || 0;
      const NilaiPelajaranB =
        itemsB.data_pelajaran.find(
          (pelajaran) => pelajaran.name === sortCategory
        ).Total_nilai || 0;
      return NilaiPelajaranB - NilaiPelajaranA;
    });
  } else {
    return filterData;
  }
}
export function GetDataMahasiswaBySort(data, sortCategory) {
  return data.sort((itemsA, itemsB) => {
    const NilaiPelajaranA =
      itemsA.data_pelajaran.find((pelajaran) => pelajaran.name === sortCategory)
        .Total_nilai || 0;
    const NilaiPelajaranB =
      itemsB.data_pelajaran.find((pelajaran) => pelajaran.name === sortCategory)
        .Total_nilai || 0;
    return NilaiPelajaranB - NilaiPelajaranA;
  });
}
export function GetDataMahasiswaBySearch(data, search) {
  const filterData = data.filter((items) => {
    return items.name.toLowerCase().includes(search.toLowerCase());
  });
  return filterData;
}
