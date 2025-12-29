function tampilkanPesan() {
            const pesanContainer = document.getElementById('pesanContainer');
            
            // Hapus pesan sebelumnya jika ada
            pesanContainer.innerHTML = '';
            
            // Buat elemen baru untuk pesan
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            messageDiv.innerHTML = `
                <span class="emoji">🎉</span>
                <strong>Selamat Belajar JavaScript, XI RPL 3!</strong>
                <span class="emoji">🚀</span>
            `;
            
            // Tambahkan efek fade in dengan sedikit delay
            pesanContainer.appendChild(messageDiv);
            messageDiv.style.opacity = '0';
            messageDiv.style.transition = 'opacity 0.5s ease-in';
            
            setTimeout(() => {
                messageDiv.style.opacity = '1';
            }, 100);
        }
