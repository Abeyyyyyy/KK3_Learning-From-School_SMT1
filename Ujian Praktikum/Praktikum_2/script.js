let panjang = 10;
let lebar = 5;

let luas = panjang * lebar;
let keliling = 2 * (panjang + lebar);

console.log("Luas persegi panjang:", luas);
console.log("Keliling persegi panjang:", keliling);

let nilaiTugas = 80;
let nilaiUTS = 75;
let nilaiUAS = 90;

let rataRata = (nilaiTugas + nilaiUTS + nilaiUAS) / 3;

document.getElementById("output").innerHTML = `
            <div class="hasil">
                <h3>Hasil Perhitungan Nilai</h3>
                <p>Nilai Tugas: ${nilaiTugas}</p>
                <p>Nilai UTS: ${nilaiUTS}</p>
                <p>Nilai UAS: ${nilaiUAS}</p>
                <p><strong>Rata-rata: ${rataRata.toFixed(2)}</strong></p>
            </div>
        `;
