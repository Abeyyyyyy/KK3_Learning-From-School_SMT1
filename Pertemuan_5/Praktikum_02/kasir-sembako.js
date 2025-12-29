// Fungsi utama untuk menghitung harga sembako
        function hitungHarga() {
            // Ambil nilai dari form
            const barang = document.getElementById('barang').value;
            const jumlah = parseFloat(document.getElementById('jumlah').value);
            const resultDiv = document.getElementById('result');
            
            // Kosongkan hasil sebelumnya
            resultDiv.className = 'result';
            
            // Validasi input
            if (barang === '') {
                resultDiv.innerHTML = `
                    <span class="emoji">❌</span>
                    Silakan pilih barang terlebih dahulu!
                `;
                resultDiv.classList.add('error', 'show');
                return;
            }
            
            if (isNaN(jumlah) || jumlah <= 0) {
                resultDiv.innerHTML = `
                    <span class="emoji">❌</span>
                    Jumlah harus lebih dari 0!
                `;
                resultDiv.classList.add('error', 'show');
                return;
            }
            
            // Daftar harga barang
            const daftarHarga = {
                beras: 12000,
                gula: 14000,
                minyak: 17000,
                telur: 2500,
                tepung: 12000
            };
            
            // Nama barang dan satuan
            const namaBarang = {
                beras: 'Beras',
                gula: 'Gula',
                minyak: 'Minyak',
                telur: 'Telur',
                tepung: 'Tepung'
            };
            
            const satuan = {
                beras: 'kg',
                gula: 'kg',
                minyak: 'kg',
                telur: 'butir',
                tepung: 'kg'
            };
            
            // Hitung total harga
            const hargaPerSatuan = daftarHarga[barang];
            const totalHarga = hargaPerSatuan * jumlah;
            
            // Format angka ke format Rupiah
            const formatRupiah = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(totalHarga);
            
            // Tampilkan hasil
            resultDiv.innerHTML = `
                <div class="emoji">✅</div>
                <div style="margin-left: 10px; flex: 1;">
                    <strong>Detail Pembelian:</strong><br>
                    Barang: <strong>${namaBarang[barang]}</strong><br>
                    Harga per ${satuan[barang]}: <strong>Rp ${hargaPerSatuan.toLocaleString('id-ID')}</strong><br>
                    Jumlah: <strong>${jumlah} ${satuan[barang]}</strong><br>
                    <div class="total">
                        Total Harga: ${formatRupiah}
                    </div>
                </div>
            `;
            
            resultDiv.classList.add('success', 'show');
        }
        
        // Tambahkan event listener untuk tombol Enter pada input jumlah
        document.getElementById('jumlah').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                hitungHarga();
            }
        });