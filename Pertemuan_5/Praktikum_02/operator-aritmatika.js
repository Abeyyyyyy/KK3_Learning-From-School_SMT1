 // Fungsi untuk menghitung keliling persegi panjang
        function hitungKeliling() {
            const panjang = parseFloat(document.getElementById('panjang').value);
            const lebar = parseFloat(document.getElementById('lebar').value);
            
            if (isNaN(panjang) || isNaN(lebar) || panjang <= 0 || lebar <= 0) {
                document.getElementById('kelilingResult').innerHTML = 
                    '❌ Masukkan nilai panjang dan lebar yang valid!';
                return;
            }
            
            // Menggunakan operator aritmatika: + (penjumlahan) dan * (perkalian)
            const keliling = 2 * (panjang + lebar);
            
            document.getElementById('kelilingResult').innerHTML = 
                `Dengan panjang <span class="highlight">${panjang}</span> dan lebar <span class="highlight">${lebar}</span>:<br>
                Keliling = 2 × (${panjang} + ${lebar}) = 2 × ${panjang + lebar} = <strong>${keliling}</strong>`;
        }

        // Fungsi untuk menghitung sisa bagi
        function hitungSisaBagi() {
            const angka = 25;
            const pembagi = 4;
            
            // Menggunakan operator modulo (%) untuk mendapatkan sisa bagi
            const sisa = angka % pembagi;
            
            document.getElementById('sisaBagiResult').innerHTML = 
                `Sisa bagi dari ${angka} dibagi ${pembagi}:<br>
                ${angka} ÷ ${pembagi} = 6 sisa <strong>${sisa}</strong><br>
                Karena ${pembagi} × 6 = ${pembagi * 6}, dan ${angka} - ${pembagi * 6} = ${sisa}`;
        }

        // Fungsi untuk menghitung luas segitiga
        function hitungLuasSegitiga() {
            const alas = parseFloat(document.getElementById('alas').value);
            const tinggi = parseFloat(document.getElementById('tinggi').value);
            
            if (isNaN(alas) || isNaN(tinggi) || alas <= 0 || tinggi <= 0) {
                document.getElementById('luasSegitigaResult').innerHTML = 
                    '❌ Masukkan nilai alas dan tinggi yang valid!';
                return;
            }
            
            // Menggunakan operator aritmatika: * (perkalian)
            const luas = 0.5 * alas * tinggi;
            
            document.getElementById('luasSegitigaResult').innerHTML = 
                `Dengan alas <span class="highlight">${alas}</span> dan tinggi <span class="highlight">${tinggi}</span>:<br>
                Luas = ½ × ${alas} × ${tinggi} = 0.5 × ${alas} × ${tinggi} = <strong>${luas}</strong>`;
        }

        // Jalankan perhitungan sisa bagi secara otomatis saat halaman dimuat
        window.onload = function() {
            hitungSisaBagi();
        };