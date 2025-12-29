    // Array 1 dimensi berisi nama-nama teman
    let teman = [
      "ABIYYA HAMDAN NURWANDHA",
      "ALIYYI AKBAR EL KHOMEINI",
      "AQBIL RASHIF ANSHARI",
      "BAGAS BIMA PRADANA*",
      "BINTANG PUTRA SUGIATNO",
      "DESTIA RAHMA",
      "DHAFIN NAUFAL RIDHWAN",
      "FACHMIE FIRMANSYAH",
      "FAQIH AUNILLAH",
      "FITHRI KHAIRUNNISSA AGUSTINA",
      "GIANNI ZIDANE RIVANNO SETIAWAN*",
      "IKHSAN TRI SAPUTRA*",
      "ILHAM FATTAHILLAH ELANDI",
      "KHALIFAH SAYID LATHIF",
      "KRYSA PUTRI HIDAYAH",
      "MARSHAL RAISYAN REVANALDI",
      "MOCHAMAD ILHAM KAUTSAR PRATAMA",
      "MOZA NANDA WIJAYA",
      "MUHAMAD KEYSAN ARIF",
      "MUHAMMAD ARI GILANG RAMADHAN",
      "MUHAMMAD FAARIS ADZIKRA",
      "MUHAMMAD HAIKAL AFWAN",
      "MUHAMMAD KHOERUDIN",
      "MUHAMMAD RIFQI ARYA FIRDAUS",
      "NAURAH SALSABILA",
      "RADEN DINDA NASYWATUNNISA",
      "RADITYA NURAKMAL IRSYAD*",
      "RAFIF AKBAR MALIQ FIRDAUS",
      "RAKA AUGUSTA SYA'BANI",
      "RASYA ARSHAVIN LEKSMAWAN",
      "RESHAD AZHAR FADLURRAHMAN KALSAN",
      "SITI SHAFA ZHARFAN ARIANI",
      "WANDA NAZRA",
      "YASER ALFONSO*",
      "ZAENAL ARIFIN",
      "ZIVEN LARENDRA"
    ];

    // Tampilkan jumlah teman
    document.getElementById('info').textContent = `Jumlah teman: ${teman.length} orang`;

    // Tampilkan semua nama teman
    const friendList = document.getElementById('friendList');
    
    for (let i = 0; i < teman.length; i++) {
      const li = document.createElement('li');
      li.className = 'friend-item';
      
      // Periksa apakah nama mengandung tanda bintang
      let nama = teman[i];
      let displayName = nama.includes('*') 
        ? nama.replace('*', '') + ' <span class="star">*</span>' 
        : nama;
      
      li.innerHTML = `Teman ke-${i+1}: <strong>${displayName}</strong>`;
      friendList.appendChild(li);
    }