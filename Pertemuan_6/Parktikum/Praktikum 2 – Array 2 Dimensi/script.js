    // Array 2 dimensi berisi data mahasiswa [nama, nim]
    let dataMhs = [
      ["ABIYYA HAMDAN NURWANDHA", "2310817110001"],
      ["ALIYYI AKBAR EL KHOMEINI", "2310817110002"],
      ["AQBIL RASHIF ANSHARI", "2310817110003"],
      ["BAGAS BIMA PRADANA", "2310817110004*"],
      ["BINTANG PUTRA SUGIATNO", "2310817110005"],
      ["DESTIA RAHMA", "2310817110006"],
      ["DHAFIN NAUFAL RIDHWAN", "2310817110007"],
      ["FACHMIE FIRMANSYAH", "2310817110008"],
      ["FAQIH AUNILLAH", "2310817110009"],
      ["FITHRI KHAIRUNNISSA AGUSTINA", "2310817110010"],
      ["GIANNI ZIDANE RIVANNO SETIAWAN", "2310817110011*"],
      ["IKHSAN TRI SAPUTRA", "2310817110012*"],
      ["ILHAM FATTAHILLAH ELANDI", "2310817110013"],
      ["KHALIFAH SAYID LATHIF", "2310817110014"],
      ["KRYSA PUTRI HIDAYAH", "2310817110015"],
      ["MARSHAL RAISYAN REVANALDI", "2310817110016"],
      ["MOCHAMAD ILHAM KAUTSAR PRATAMA", "2310817110017"],
      ["MOZA NANDA WIJAYA", "2310817110018"],
      ["MUHAMAD KEYSAN ARIF", "2310817110019"],
      ["MUHAMMAD ARI GILANG RAMADHAN", "2310817110020"],
      ["MUHAMMAD FAARIS ADZIKRA", "2310817110021"],
      ["MUHAMMAD HAIKAL AFWAN", "2310817110022"],
      ["MUHAMMAD KHOERUDIN", "2310817110023"],
      ["MUHAMMAD RIFQI ARYA FIRDAUS", "2310817110024"],
      ["NAURAH SALSABILA", "2310817110025"],
      ["RADEN DINDA NASYWATUNNISA", "2310817110026"],
      ["RADITYA NURAKMAL IRSYAD", "2310817110027*"],
      ["RAFIF AKBAR MALIQ FIRDAUS", "2310817110028"],
      ["RAKA AUGUSTA SYA'BANI", "2310817110029"],
      ["RASYA ARSHAVIN LEKSMAWAN", "2310817110030"],
      ["RESHAD AZHAR FADLURRAHMAN KALSAN", "2310817110031"],
      ["SITI SHAFA ZHARFAN ARIANI", "2310817110032"],
      ["WANDA NAZRA", "2310817110033"],
      ["YASER ALFONSO", "2310817110034*"],
      ["ZAENAL ARIFIN", "2310817110035"],
      ["ZIVEN LARENDRA", "2310817110036"]
    ];

    // Tampilkan jumlah data
    document.getElementById('total').textContent = dataMhs.length;

    // Tampilkan data di tabel
    const tbody = document.querySelector('#dataMhs tbody');
    
    for (let i = 0; i < dataMhs.length; i++) {
      const tr = document.createElement('tr');
      
      // Nomor urut
      const tdNo = document.createElement('td');
      tdNo.textContent = i + 1;
      tr.appendChild(tdNo);
      
      // Nama
      const tdNama = document.createElement('td');
      let nama = dataMhs[i][0];
      if (dataMhs[i][1].includes('*')) {
        tdNama.innerHTML = nama + ' <span class="star">*</span>';
      } else {
        tdNama.textContent = nama;
      }
      tr.appendChild(tdNama);
      
      // NIM
      const tdNim = document.createElement('td');
      tdNim.textContent = dataMhs[i][1].replace('*', '');
      tr.appendChild(tdNim);
      
      tbody.appendChild(tr);
    }