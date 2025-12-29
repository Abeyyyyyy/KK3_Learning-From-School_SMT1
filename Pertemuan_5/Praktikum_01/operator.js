let a = 10, b = 5;
    let penjumlahan = a + b;
    let perbandingan = a > b;
    let logika = a > 5 && b < 10;

    document.getElementById("hasil").innerHTML =
      "Penjumlahan: " + penjumlahan + "<br>" +
      "Apakah a lebih besar dari b? " + perbandingan + "<br>" +
      "Logika (a > 5 && b < 10): " + logika;