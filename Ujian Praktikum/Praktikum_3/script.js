let hobi = ["membaca", "olahraga", "musik", "coding", "gaming"];

console.log("Array hobi awal:", hobi);

hobi.push("traveling");

console.log("Array hobi setelah push:", hobi);

let elemenPertama = hobi[0];
let elemenTerakhir = hobi[hobi.length - 1];

alert(
  "Elemen pertama: " + elemenPertama + "\nElemen terakhir: " + elemenTerakhir
);
