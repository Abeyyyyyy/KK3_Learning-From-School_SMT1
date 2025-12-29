let nama = "Siti Aisyah";
let umur = 17;
let isXIRPL3 = true;

alert("Nama: " + nama + "\nUmur: " + umur + "\nApakah XI RPL 3: " + isXIRPL3);

umur = 18;

document.getElementById("output").innerHTML = `
    <h2>Hasil Setelah Perubahan</h2>
    <p><strong>Nama:</strong> ${nama}</p>
    <p><strong>Umur:</strong> ${umur}</p>
    <p><strong>Apakah XI RPL 3:</strong> ${isXIRPL3 ? "Ya" : "Tidak"}</p>
`;
