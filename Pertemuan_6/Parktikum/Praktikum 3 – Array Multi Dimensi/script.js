    // Array multi dimensi berisi data mahasiswa dari dua kelas
    let kelas = [
      // Kelas A - 18 mahasiswa
      [
        ["ABIYYA HAMDAN NURWANDHA", "A1"],
        ["ALIYYI AKBAR EL KHOMEINI", "A2"],
        ["AQBIL RASHIF ANSHARI", "A3"],
        ["BAGAS BIMA PRADANA", "A4*"],
        ["BINTANG PUTRA SUGIATNO", "A5"],
        ["DESTIA RAHMA", "A6"],
        ["DHAFIN NAUFAL RIDHWAN", "A7"],
        ["FACHMIE FIRMANSYAH", "A8"],
        ["FAQIH AUNILLAH", "A9"],
        ["FITHRI KHAIRUNNISSA AGUSTINA", "A10"],
        ["GIANNI ZIDANE RIVANNO SETIAWAN", "A11*"],
        ["IKHSAN TRI SAPUTRA", "A12*"],
        ["ILHAM FATTAHILLAH ELANDI", "A13"],
        ["KHALIFAH SAYID LATHIF", "A14"],
        ["KRYSA PUTRI HIDAYAH", "A15"],
        ["MARSHAL RAISYAN REVANALDI", "A16"],
        ["MOCHAMAD ILHAM KAUTSAR PRATAMA", "A17"],
        ["MOZA NANDA WIJAYA", "A18"]
      ],
      // Kelas B - 18 mahasiswa
      [
        ["MUHAMAD KEYSAN ARIF", "B1"],
        ["MUHAMMAD ARI GILANG RAMADHAN", "B2"],
        ["MUHAMMAD FAARIS ADZIKRA", "B3"],
        ["MUHAMMAD HAIKAL AFWAN", "B4"],
        ["MUHAMMAD KHOERUDIN", "B5"],
        ["MUHAMMAD RIFQI ARYA FIRDAUS", "B6"],
        ["NAURAH SALSABILA", "B7"],
        ["RADEN DINDA NASYWATUNNISA", "B8"],
        ["RADITYA NURAKMAL IRSYAD", "B9*"],
        ["RAFIF AKBAR MALIQ FIRDAUS", "B10"],
        ["RAKA AUGUSTA SYA'BANI", "B11"],
        ["RASYA ARSHAVIN LEKSMAWAN", "B12"],
        ["RESHAD AZHAR FADLURRAHMAN KALSAN", "B13"],
        ["SITI SHAFA ZHARFAN ARIANI", "B14"],
        ["WANDA NAZRA", "B15"],
        ["YASER ALFONSO", "B16*"],
        ["ZAENAL ARIFIN", "B17"],
        ["ZIVEN LARENDRA", "B18"]
      ]
    ];

    // Tampilkan hasil
    const outputDiv = document.getElementById('output');
    
    // Menampilkan data mahasiswa dari kelas A (index 0)
    outputDiv.innerHTML += `<div class="kelas-header">KELAS A</div>`;
    for (let j = 0; j < kelas[0].length; j++) {
      const nama = kelas[0][j][0];
      const nim = kelas[0][j][1];
      const displayName = nim.includes('*') ? 
        `${nama}: ${nim.replace('*', '')} <span class="star">*</span>` : 
        `${nama}: ${nim}`;
      outputDiv.innerHTML += `<p>${j+1}. ${displayName}</p>`;
    }
    
    // Menampilkan data mahasiswa dari kelas B (index 1)
    outputDiv.innerHTML += `<div class="kelas-header">KELAS B</div>`;
    for (let j = 0; j < kelas[1].length; j++) {
      const nama = kelas[1][j][0];
      const nim = kelas[1][j][1];
      const displayName = nim.includes('*') ? 
        `${nama}: ${nim.replace('*', '')} <span class="star">*</span>` : 
        `${nama}: ${nim}`;
      outputDiv.innerHTML += `<p>${j+1}. ${displayName}</p>`;
    }
    
    // Total mahasiswa
    const totalMhs = kelas[0].length + kelas[1].length;
    outputDiv.innerHTML += `<p><strong>Total mahasiswa:</strong> ${totalMhs} orang</p>`;