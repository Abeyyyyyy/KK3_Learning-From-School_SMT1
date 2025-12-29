 // File: anggota.js
        // Studi Kasus: Sistem Manajemen Perpustakaan Sekolah
        // Nama: Abiyya Hamdan Nurwandha
        // Nomor: 2425120672
        // Kelas: XI RPL III

        // Deklarasi variabel dengan const karena data tidak akan di-reassign
        const namaAnggota = "Abiyya Hamdan Nurwandha"; // string
        const nomorAnggota = 2425120672; // number
        const kelas = "XI RPL III"; // string
        const statusAktif = true; // boolean (aktif sebagai pelajar)

        // Array untuk daftar buku yang sedang dipinjam
        const bukuDipinjam = [
            "B. Indo", 
            "B Inggris", 
            "Matematika", 
            "Sejarah", 
            "PJOK", 
            "PAI", 
            "Pendidikan Pancasila"
        ];

        // Object untuk menyimpan alamat anggota secara terstruktur
        const alamat = {
            jalan: "Jl. Komp Warakawuri No. 128",
            rt: "RT 006 / RW 010",
            kelurahan: "Baleendah",
            kecamatan: "Baleendah",
            kota: "Bandung"
        };

        // Menampilkan data di console dengan format rapi, estetik, dan warna-warni
        console.log("%c📘 === DATA ANGGOTA PERPUSTAKAAN === 📘", "color: #3674B5; font-weight: bold; font-size: 16px; background-color: #f8fbff; padding: 10px; border-radius: 6px; border-left: 4px solid #578FCA;");
        
        console.log("%cℹ️ Informasi Pribadi", "color: #578FCA; font-weight: bold; font-size: 14px; margin: 12px 0 8px;");
        console.log("  Nama Anggota: %c" + namaAnggota, "color: #2C3E50; font-weight: 500;");
        console.log("  Nomor Anggota: %c" + nomorAnggota, "color: #2C3E50; font-weight: 500;");
        console.log("  Kelas: %c" + kelas, "color: #A1E3F9; font-weight: 500;");
        console.log("  Status: %cAKTIF (Pelajar)", "color: #2E8B57; font-weight: 500; background-color: #e8f5e8; padding: 1px 6px; border-radius: 10px;");
        
        console.log("%c🏠 Alamat Lengkap", "color: #3674B5; font-weight: bold; font-size: 14px; margin: 12px 0 8px;");
        console.log("  " + alamat.jalan);
        console.log("  " + alamat.rt);
        console.log("  Kelurahan " + alamat.kelurahan);
        console.log("  Kecamatan " + alamat.kecamatan);
        console.log("  Kota " + alamat.kota);
        
        console.log("%c📚 Daftar Buku yang Dipinjam", "color: #3674B5; font-weight: bold; font-size: 14px; margin: 12px 0 8px;");
        bukuDipinjam.forEach((buku, index) => {
            const numberColor = index % 2 === 0 ? "#578FCA" : "#3674B5";
            console.log(`  %c${index + 1}. ${buku}`, `color: ${numberColor}; font-weight: 500;`);
        });
        
        console.log("%c🎯 Tujuan Pembelajaran", "color: #A1E3F9; font-weight: bold; font-size: 14px; margin: 12px 0 8px;");
        console.log("  • Memahami konsep variabel dalam JavaScript");
        console.log("  • Menggunakan let dan const sesuai konteks");
        console.log("  • Menerapkan tipe data yang tepat");
        console.log("  • Implementasi variabel dalam studi kasus");
        
        console.log("%c✅ Data berhasil ditampilkan!", "color: #2E8B57; font-weight: bold; font-size: 13px; padding: 8px; background-color: #e8f5e8; border-radius: 6px; margin-top: 10px;");