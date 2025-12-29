let dataSiswa = [
  { nama: "Andi", umur: 17, jurusan: "RPL" },
  { nama: "Budi", umur: 16, jurusan: "RPL" },
  { nama: "Citra", umur: 17, jurusan: "RPL" },
];
console.log("=== Data Siswa ===");
dataSiswa.forEach(function (siswa) {
  console.log(
    "Nama: " +
      siswa.nama +
      ", Umur: " +
      siswa.umur +
      ", Jurusan: " +
      siswa.jurusan
  );
});
