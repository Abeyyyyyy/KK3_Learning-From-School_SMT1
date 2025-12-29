let angka = [2, 4, 6, 8, 10];
console.log("=== Elemen Array Angka (dengan for) ===");
for (let i = 0; i < angka.length; i++) {
  console.log(angka[i]);
}

let total = 0;
for (let i = 0; i < angka.length; i++) {
  total += angka[i];
}
console.log("Total jumlah semua elemen:", total);

let siswa = ["Andi", "Budi", "Citra", "Dewi", "Eko"];

console.log("=== Nama Siswa (dengan forEach) ===");
siswa.forEach(function (nama) {
  console.log(nama);
});
