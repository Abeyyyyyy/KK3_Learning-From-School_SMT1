        // Tambahkan event listener untuk semua link
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.getAttribute('href') === '#') {
                        e.preventDefault();
                        
                        // Hapus class active dari semua link
                        navLinks.forEach(l => l.classList.remove('active'));
                        
                        // Tambahkan class active ke link yang diklik
                        this.classList.add('active');
                        
                        // Beri feedback
                        const pageName = this.textContent.trim();
                        if (pageName !== 'Home') {
                            alert(`Anda sedang membuka halaman: ${pageName}`);
                        }
                    }
                });
            });
        });