    // Array of object berisi data mahasiswa
    let siswa = [
      { nama: "ABIYYA HAMDAN NURWANDHA", umur: 16, nilai: 90, status: "A" },
      { nama: "ALIYYI AKBAR EL KHOMEINI", umur: 17, nilai: 85, status: "B" },
      { nama: "AQBIL RASHIF ANSHARI", umur: 16, nilai: 88, status: "B" },
      { nama: "BAGAS BIMA PRADANA", umur: 17, nilai: 92, status: "A" },
      { nama: "BINTANG PUTRA SUGIATNO", umur: 16, nilai: 87, status: "B" },
      { nama: "DESTIA RAHMA", umur: 17, nilai: 89, status: "A" },
      { nama: "DHAFIN NAUFAL RIDHWAN", umur: 16, nilai: 95, status: "A" },
      { nama: "FACHMIE FIRMANSYAH", umur: 17, nilai: 82, status: "C" },
      { nama: "FAQIH AUNILLAH", umur: 16, nilai: 91, status: "A" },
      { nama: "FITHRI KHAIRUNNISSA AGUSTINA", umur: 17, nilai: 86, status: "B" },
      { nama: "GIANNI ZIDANE RIVANNO SETIAWAN", umur: 16, nilai: 93, status: "A" },
      { nama: "IKHSAN TRI SAPUTRA", umur: 17, nilai: 84, status: "C" },
      { nama: "ILHAM FATTAHILLAH ELANDI", umur: 16, nilai: 88, status: "B" },
      { nama: "KHALIFAH SAYID LATHIF", umur: 17, nilai: 90, status: "A" },
      { nama: "KRYSA PUTRI HIDAYAH", umur: 16, nilai: 87, status: "B" },
      { nama: "MARSHAL RAISYAN REVANALDI", umur: 17, nilai: 85, status: "B" },
      { nama: "MOCHAMAD ILHAM KAUTSAR PRATAMA", umur: 16, nilai: 94, status: "A" },
      { nama: "MOZA NANDA WIJAYA", umur: 17, nilai: 83, status: "C" },
      { nama: "MUHAMAD KEYSAN ARIF", umur: 16, nilai: 92, status: "A" },
      { nama: "MUHAMMAD ARI GILANG RAMADHAN", umur: 17, nilai: 86, status: "B" },
      { nama: "MUHAMMAD FAARIS ADZIKRA", umur: 16, nilai: 88, status: "B" },
      { nama: "MUHAMMAD HAIKAL AFWAN", umur: 17, nilai: 84, status: "C" },
      { nama: "MUHAMMAD KHOERUDIN", umur: 16, nilai: 91, status: "A" },
      { nama: "MUHAMMAD RIFQI ARYA FIRDAUS", umur: 17, nilai: 85, status: "B" },
      { nama: "NAURAH SALSABILA", umur: 16, nilai: 88, status: "B" },
      { nama: "RADEN DINDA NASYWATUNNISA", umur: 17, nilai: 90, status: "A" },
      { nama: "RADITYA NURAKMAL IRSYAD", umur: 16, nilai: 94, status: "A" },
      { nama: "RAFIF AKBAR MALIQ FIRDAUS", umur: 17, nilai: 86, status: "B" },
      { nama: "RAKA AUGUSTA SYA'BANI", umur: 16, nilai: 87, status: "B" },
      { nama: "RASYA ARSHAVIN LEKSMAWAN", umur: 17, nilai: 89, status: "A" },
      { nama: "RESHAD AZHAR FADLURRAHMAN KALSAN", umur: 16, nilai: 88, status: "B" },
      { nama: "SITI SHAFA ZHARFAN ARIANI", umur: 17, nilai: 92, status: "A" },
      { nama: "WANDA NAZRA", umur: 16, nilai: 85, status: "B" },
      { nama: "YASER ALFONSO", umur: 17, nilai: 93, status: "A" },
      { nama: "ZAENAL ARIFIN", umur: 16, nilai: 88, status: "B" },
      { nama: "ZIVEN LARENDRA", umur: 17, nilai: 87, status: "B" }
    ];

    // Filter mahasiswa dengan nilai ≥ 88
    const siswaTerpilih = siswa.filter(mahasiswa => mahasiswa.nilai >= 88);
    
    // Urutkan berdasarkan nilai (tertinggi dulu)
    siswaTerpilih.sort((a, b) => b.nilai - a.nilai);

    // Tampilkan data di tabel
    const tbody = document.querySelector('#data-table tbody');
    const totalInfo = document.getElementById('total-info');
    
    siswaTerpilih.forEach((mahasiswa, index) => {
      const tr = document.createElement('tr');
      
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${mahasiswa.nama}</td>
        <td>${mahasiswa.umur} tahun</td>
        <td>${mahasiswa.nilai}</td>
        <td>Grade ${mahasiswa.status}</td>
      `;
      
      tbody.appendChild(tr);
    });
    
    // Tampilkan informasi total
    totalInfo.textContent = `Total mahasiswa dengan nilai ≥ 88: ${siswaTerpilih.length} orang`;