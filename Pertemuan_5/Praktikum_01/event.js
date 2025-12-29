    document.getElementById("btn").addEventListener("click", function() {
      const pesan = document.getElementById("pesan");
      pesan.innerHTML = "🎉 Tombol sudah diklik!";
      pesan.className = "show";
    });