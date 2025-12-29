    function hitungLuas(panjang, lebar) {
      return panjang * lebar;
    }

    let luas = hitungLuas(8, 5);
    document.getElementById("output").innerHTML =
      "Luas persegi panjang: " + luas + " cm²";