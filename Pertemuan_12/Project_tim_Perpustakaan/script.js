const { createApp, ref, computed, onMounted, watch } = Vue;

createApp({
    setup() {
        // State aplikasi
        const currentView = ref('dashboard');
        const books = ref([]);
        const members = ref([]);
        const borrowings = ref([]);
        const bookSearchQuery = ref('');
        const bookCategoryFilter = ref('');
        const membersSlider = ref(null);
        
        // Form state
        const bookForm = ref({
            id: null,
            title: '',
            author: '',
            publisher: '',
            year: '',
            category: ''
        });
        
        const borrowingForm = ref({
            id: null,
            memberName: '',
            bookTitle: '',
            borrowDate: '',
            returnDate: '',
            status: 'Dipinjam'
        });
        
        // Error state
        const bookFormErrors = ref({});
        const borrowingFormErrors = ref({});
        
        // UI state
        const isEditingBook = ref(false);
        const isEditingBorrowing = ref(false);
        
        // Data statis
        const bookCategories = ref(['Novel', 'Fiksi', 'Fantasi', 'Religi', 'Sejarah', 'Biografi', 'Pendidikan', 'Teknologi', 'Pengembangan Diri', 'Motivasi', 'Bisnis', 'Filsafat', 'Manajemen', 'Sains', 'Klasik', 'Sastra', 'Drama', 'Thriller', 'Romantis', 'Realisme Magis']);
        
        // Computed properties
        const filteredBooks = computed(() => {
            let result = books.value;
            
            if (bookSearchQuery.value) {
                const query = bookSearchQuery.value.toLowerCase();
                result = result.filter(book => 
                    book.title.toLowerCase().includes(query) || 
                    book.author.toLowerCase().includes(query)
                );
            }
            
            if (bookCategoryFilter.value) {
                result = result.filter(book => book.category === bookCategoryFilter.value);
            }
            
            return result;
        });
        
        const recentBorrowings = computed(() => {
            return borrowings.value.slice(0, 5); // Ambil 5 peminjaman terbaru
        });
        
        const availableBooks = computed(() => {
            // Hanya tampilkan buku yang tidak sedang dipinjam
            const borrowedBookTitles = borrowings.value
                .filter(b => b.status === 'Dipinjam')
                .map(b => b.bookTitle);
            
            return books.value.filter(book => !borrowedBookTitles.includes(book.title));
        });
        
        // Statistik dinamis
        const borrowingStats = computed(() => {
            const stats = {
                labels: [],
                data: []
            };
            
            // Hitung peminjaman per hari dalam 7 hari terakhir
            const last7Days = [];
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                last7Days.push(date.toISOString().split('T')[0]);
            }
            
            stats.labels = last7Days.map(date => {
                const d = new Date(date);
                return `${d.getDate()}/${d.getMonth()+1}`;
            });
            
            stats.data = last7Days.map(date => {
                return borrowings.value.filter(b => b.borrowDate === date).length;
            });
            
            return stats;
        });
        
        const categoryStats = computed(() => {
            const stats = {
                labels: [],
                data: []
            };
            
            // Hitung kategori buku yang paling sering dipinjam
            const categoryCount = {};
            
            borrowings.value.forEach(borrowing => {
                const book = books.value.find(b => b.title === borrowing.bookTitle);
                if (book && book.category) {
                    categoryCount[book.category] = (categoryCount[book.category] || 0) + 1;
                }
            });
            
            // Urutkan berdasarkan jumlah peminjaman
            const sortedCategories = Object.entries(categoryCount)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 8); // Ambil 8 kategori teratas
            
            stats.labels = sortedCategories.map(item => item[0]);
            stats.data = sortedCategories.map(item => item[1]);
            
            return stats;
        });
        
        // Methods
        const changeView = (view) => {
            currentView.value = view;
        };
        
        const scrollMembers = (direction) => {
            if (!membersSlider.value) return;
            
            const scrollAmount = 200;
            if (direction === 'left') {
                membersSlider.value.scrollLeft -= scrollAmount;
            } else {
                membersSlider.value.scrollLeft += scrollAmount;
            }
        };
        
        const showBookForm = (book = null) => {
            if (book) {
                // Edit mode
                bookForm.value = { ...book };
                isEditingBook.value = true;
            } else {
                // Add mode
                bookForm.value = {
                    id: null,
                    title: '',
                    author: '',
                    publisher: '',
                    year: '',
                    category: ''
                };
                isEditingBook.value = false;
            }
            
            bookFormErrors.value = {};
            const modal = new bootstrap.Modal(document.getElementById('bookFormModal'));
            modal.show();
        };
        
        const validateBookForm = () => {
            const errors = {};
            
            if (!bookForm.value.title.trim()) {
                errors.title = 'Judul buku harus diisi';
            }
            
            if (!bookForm.value.author.trim()) {
                errors.author = 'Pengarang harus diisi';
            }
            
            if (!bookForm.value.publisher.trim()) {
                errors.publisher = 'Penerbit harus diisi';
            }
            
            if (!bookForm.value.year) {
                errors.year = 'Tahun terbit harus diisi';
            } else if (bookForm.value.year < 1900 || bookForm.value.year > new Date().getFullYear()) {
                errors.year = 'Tahun terbit tidak valid';
            }
            
            if (!bookForm.value.category) {
                errors.category = 'Kategori harus dipilih';
            }
            
            bookFormErrors.value = errors;
            return Object.keys(errors).length === 0;
        };
        
        // Fungsi untuk membuat dan mengunduh file
        const downloadFile = (filename, content) => {
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
        
        // Fungsi untuk membuat file buku
        const createBookFile = (bookData) => {
            const content = `
DATA BUKU PERPUSTAKAAN
======================

ID Buku: ${bookData.id}
Judul: ${bookData.title}
Pengarang: ${bookData.author}
Penerbit: ${bookData.publisher}
Tahun Terbit: ${bookData.year}
Kategori: ${bookData.category}

Deskripsi:
----------
Buku "${bookData.title}" karya ${bookData.author} 
diterbitkan oleh ${bookData.publisher} pada tahun ${bookData.year}.
Buku ini termasuk dalam kategori ${bookData.category}.

Status: Tersedia di perpustakaan

Perpustakaan Digital Sekolah
${new Date().toLocaleDateString('id-ID')}
            `;
            
            const filename = `Buku_${bookData.title.replace(/[^a-z0-9]/gi, '_')}_${bookData.id}.txt`;
            downloadFile(filename, content);
        };
        
        // Fungsi untuk membuat file peminjaman
        const createBorrowingFile = (borrowingData) => {
            const book = books.value.find(b => b.title === borrowingData.bookTitle);
            const member = members.value.find(m => m.name === borrowingData.memberName);
            
            const content = `
DATA PEMINJAMAN BUKU
=====================

ID Peminjaman: ${borrowingData.id}
Nama Peminjam: ${borrowingData.memberName}
NIS: ${member ? member.nis : '-'}
Kelas: ${member ? member.class : '-'}
Judul Buku: ${borrowingData.bookTitle}
Tanggal Pinjam: ${formatDate(borrowingData.borrowDate)}
Tanggal Kembali: ${formatDate(borrowingData.returnDate)}
Status: ${borrowingData.status}

Detail Buku:
------------
Judul: ${book ? book.title : '-'}
Pengarang: ${book ? book.author : '-'}
Penerbit: ${book ? book.publisher : '-'}
Tahun: ${book ? book.year : '-'}
Kategori: ${book ? book.category : '-'}

Catatan:
- Harap mengembalikan buku tepat waktu
- Denda keterlambatan Rp 2.000/hari
- Buku yang hilang harus diganti dengan yang sama

Perpustakaan Digital Sekolah
${new Date().toLocaleDateString('id-ID')}
            `;
            
            const filename = `Peminjaman_${borrowingData.memberName.replace(/[^a-z0-9]/gi, '_')}_${borrowingData.id}.txt`;
            downloadFile(filename, content);
        };
        
        const saveBook = () => {
            if (!validateBookForm()) return;
            
            if (isEditingBook.value) {
                // Update buku
                const index = books.value.findIndex(b => b.id === bookForm.value.id);
                if (index !== -1) {
                    books.value[index] = { ...bookForm.value };
                }
            } else {
                // Tambah buku baru
                const newBook = {
                    ...bookForm.value,
                    id: generateId()
                };
                books.value.push(newBook);
                
                // Buat file untuk buku baru
                createBookFile(newBook);
            }
            
            saveToLocalStorage();
            const modal = bootstrap.Modal.getInstance(document.getElementById('bookFormModal'));
            modal.hide();
        };
        
        const editBook = (book) => {
            showBookForm(book);
        };
        
        const deleteBook = (id) => {
            if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
                books.value = books.value.filter(book => book.id !== id);
                saveToLocalStorage();
            }
        };
        
        const downloadBookFile = (book) => {
            createBookFile(book);
        };
        
        const showBorrowingForm = (borrowing = null) => {
            if (borrowing) {
                // Edit mode
                borrowingForm.value = { ...borrowing };
                isEditingBorrowing.value = true;
            } else {
                // Add mode
                const today = new Date();
                const returnDate = new Date();
                returnDate.setDate(today.getDate() + 7); // Default 7 hari
                
                borrowingForm.value = {
                    id: null,
                    memberName: '',
                    bookTitle: '',
                    borrowDate: today.toISOString().split('T')[0],
                    returnDate: returnDate.toISOString().split('T')[0],
                    status: 'Dipinjam'
                };
                isEditingBorrowing.value = false;
            }
            
            borrowingFormErrors.value = {};
            const modal = new bootstrap.Modal(document.getElementById('borrowingFormModal'));
            modal.show();
        };
        
        const validateBorrowingForm = () => {
            const errors = {};
            
            if (!borrowingForm.value.memberName) {
                errors.memberName = 'Nama peminjam harus dipilih';
            }
            
            if (!borrowingForm.value.bookTitle) {
                errors.bookTitle = 'Judul buku harus dipilih';
            }
            
            if (!borrowingForm.value.borrowDate) {
                errors.borrowDate = 'Tanggal pinjam harus diisi';
            }
            
            if (!borrowingForm.value.returnDate) {
                errors.returnDate = 'Tanggal kembali harus diisi';
            } else if (borrowingForm.value.returnDate < borrowingForm.value.borrowDate) {
                errors.returnDate = 'Tanggal kembali tidak boleh sebelum tanggal pinjam';
            }
            
            borrowingFormErrors.value = errors;
            return Object.keys(errors).length === 0;
        };
        
        const saveBorrowing = () => {
            if (!validateBorrowingForm()) return;
            
            if (isEditingBorrowing.value) {
                // Update peminjaman
                const index = borrowings.value.findIndex(b => b.id === borrowingForm.value.id);
                if (index !== -1) {
                    borrowings.value[index] = { ...borrowingForm.value };
                }
            } else {
                // Tambah peminjaman baru
                const newBorrowing = {
                    ...borrowingForm.value,
                    id: generateId()
                };
                borrowings.value.push(newBorrowing);
                
                // Buat file untuk peminjaman baru
                createBorrowingFile(newBorrowing);
            }
            
            saveToLocalStorage();
            const modal = bootstrap.Modal.getInstance(document.getElementById('borrowingFormModal'));
            modal.hide();
        };
        
        const editBorrowing = (borrowing) => {
            showBorrowingForm(borrowing);
        };
        
        const deleteBorrowing = (id) => {
            if (confirm('Apakah Anda yakin ingin menghapus data peminjaman ini?')) {
                borrowings.value = borrowings.value.filter(borrowing => borrowing.id !== id);
                saveToLocalStorage();
            }
        };
        
        const downloadBorrowingFile = (borrowing) => {
            createBorrowingFile(borrowing);
        };
        
        const returnBook = (id) => {
            const borrowing = borrowings.value.find(b => b.id === id);
            if (borrowing) {
                borrowing.status = 'Dikembalikan';
                saveToLocalStorage();
            }
        };
        
        const formatDate = (dateString) => {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('id-ID', options);
        };
        
        const getStatusBadgeClass = (status) => {
            switch (status) {
                case 'Dipinjam': return 'bg-warning text-dark';
                case 'Dikembalikan': return 'bg-success';
                case 'Terlambat': return 'bg-danger';
                default: return 'bg-secondary';
            }
        };
        
        const getInitials = (name) => {
            return name.split(' ').map(n => n[0]).join('').toUpperCase();
        };
        
        const getMemberNis = (memberName) => {
            const member = members.value.find(m => m.name === memberName);
            return member ? member.nis : '-';
        };
        
        const generateId = () => {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        };
        
        // Fungsi untuk memeriksa status peminjaman
        const checkBorrowingStatus = () => {
            const today = new Date().toISOString().split('T')[0];
            
            borrowings.value.forEach(borrowing => {
                if (borrowing.status === 'Dipinjam' && borrowing.returnDate < today) {
                    borrowing.status = 'Terlambat';
                }
            });
        };
        
        // LocalStorage functions
        const saveToLocalStorage = () => {
            localStorage.setItem('libraryBooks', JSON.stringify(books.value));
            localStorage.setItem('libraryBorrowings', JSON.stringify(borrowings.value));
        };
        
        const loadFromLocalStorage = () => {
            const savedBooks = localStorage.getItem('libraryBooks');
            const savedBorrowings = localStorage.getItem('libraryBorrowings');
            
            if (savedBooks) {
                books.value = JSON.parse(savedBooks);
            } else {
                // Data buku dari tabel yang diberikan
                books.value = [
                    { id: generateId(), title: 'Laskar Pelangi', author: 'Andrea Hirata', publisher: 'Bentang Pustaka', year: 2005, category: 'Novel / Inspiratif' },
                    { id: generateId(), title: 'Sang Pemimpi', author: 'Andrea Hirata', publisher: 'Bentang Pustaka', year: 2006, category: 'Novel' },
                    { id: generateId(), title: 'Edensor', author: 'Andrea Hirata', publisher: 'Bentang Pustaka', year: 2007, category: 'Novel Petualangan' },
                    { id: generateId(), title: 'Maryamah Karpov', author: 'Andrea Hirata', publisher: 'Bentang Pustaka', year: 2008, category: 'Novel' },
                    { id: generateId(), title: 'Negeri 5 Menara', author: 'Ahmad Fuadi', publisher: 'Gramedia Pustaka Utama', year: 2009, category: 'Novel / Pendidikan' },
                    { id: generateId(), title: 'Ranah 3 Warna', author: 'Ahmad Fuadi', publisher: 'Gramedia Pustaka Utama', year: 2011, category: 'Novel' },
                    { id: generateId(), title: 'Rantau 1 Muara', author: 'Ahmad Fuadi', publisher: 'Gramedia Pustaka Utama', year: 2013, category: 'Novel' },
                    { id: generateId(), title: 'Bumi', author: 'Tere Liye', publisher: 'Gramedia Pustaka Utama', year: 2014, category: 'Fantasi' },
                    { id: generateId(), title: 'Bulan', author: 'Tere Liye', publisher: 'Gramedia Pustaka Utama', year: 2015, category: 'Fantasi' },
                    { id: generateId(), title: 'Matahari', author: 'Tere Liye', publisher: 'Gramedia Pustaka Utama', year: 2016, category: 'Fantasi' },
                    { id: generateId(), title: 'Hujan', author: 'Tere Liye', publisher: 'Gramedia Pustaka Utama', year: 2016, category: 'Fiksi / Romantis' },
                    { id: generateId(), title: 'Pulang', author: 'Tere Liye', publisher: 'Republika', year: 2015, category: 'Drama / Aksi' },
                    { id: generateId(), title: 'Pergi', author: 'Tere Liye', publisher: 'Republika', year: 2018, category: 'Drama / Aksi' },
                    { id: generateId(), title: 'Negeri Para Bedebah', author: 'Tere Liye', publisher: 'Gramedia Pustaka Utama', year: 2012, category: 'Thriller' },
                    { id: generateId(), title: 'Negeri di Ujung Tanduk', author: 'Tere Liye', publisher: 'Gramedia Pustaka Utama', year: 2013, category: 'Thriller' },
                    { id: generateId(), title: 'Bidadari Bermata Bening', author: 'Habiburrahman El Shirazy', publisher: 'Republika', year: 2017, category: 'Religi / Romantis' },
                    { id: generateId(), title: 'Ayat-Ayat Cinta', author: 'Habiburrahman El Shirazy', publisher: 'Republika', year: 2004, category: 'Religi / Romantis' },
                    { id: generateId(), title: 'Ketika Cinta Bertasbih', author: 'Habiburrahman El Shirazy', publisher: 'Republika', year: 2007, category: 'Religi / Romantis' },
                    { id: generateId(), title: 'Dalam Mihrab Cinta', author: 'Habiburrahman El Shirazy', publisher: 'Republika', year: 2010, category: 'Religi' },
                    { id: generateId(), title: 'Habis Gelap Terbitlah Terang', author: 'R.A. Kartini', publisher: 'Balai Pustaka', year: 1922, category: 'Sejarah / Biografi' },
                    { id: generateId(), title: 'Siti Nurbaya', author: 'Marah Rusli', publisher: 'Balai Pustaka', year: 1922, category: 'Klasik / Sastra' },
                    { id: generateId(), title: 'Tenggelamnya Kapal Van Der Wijck', author: 'Hamka', publisher: 'Balai Pustaka', year: 1938, category: 'Klasik / Romantis' },
                    { id: generateId(), title: 'Di Bawah Lindungan Ka bah', author: 'Hamka', publisher: 'Balai Pustaka', year: 1936, category: 'Religi / Romantis' },
                    { id: generateId(), title: 'Salah Asuhan', author: 'Abdul Muis', publisher: 'Balai Pustaka', year: 1928, category: 'Klasik / Sosial' },
                    { id: generateId(), title: 'Anak Semua Bangsa', author: 'Pramoedya Ananta Toer', publisher: 'Hasta Mitra', year: 1980, category: 'Sejarah / Sosial' },
                    { id: generateId(), title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', publisher: 'Hasta Mitra', year: 1980, category: 'Sejarah / Sosial' },
                    { id: generateId(), title: 'Rumah Kaca', author: 'Pramoedya Ananta Toer', publisher: 'Hasta Mitra', year: 1988, category: 'Sejarah' },
                    { id: generateId(), title: 'Jejak Langkah', author: 'Pramoedya Ananta Toer', publisher: 'Hasta Mitra', year: 1985, category: 'Sejarah' },
                    { id: generateId(), title: 'Cantik Itu Luka', author: 'Eka Kurniawan', publisher: 'Gramedia Pustaka Utama', year: 2002, category: 'Fiksi / Realisme Magis' },
                    { id: generateId(), title: 'Lelaki Harimau', author: 'Eka Kurniawan', publisher: 'Gramedia Pustaka Utama', year: 2004, category: 'Fiksi' },
                    { id: generateId(), title: 'Seperti Dendam, Rindu Harus Dibayar Tuntas', author: 'Eka Kurniawan', publisher: 'Gramedia Pustaka Utama', year: 2014, category: 'Fiksi' },
                    { id: generateId(), title: 'Atomic Habits', author: 'James Clear', publisher: 'Penguin Random House', year: 2018, category: 'Pengembangan Diri' },
                    { id: generateId(), title: 'The 7 Habits of Highly Effective People', author: 'Stephen R. Covey', publisher: 'Simon & Schuster', year: 1989, category: 'Pengembangan Diri' },
                    { id: generateId(), title: 'Rich Dad Poor Dad', author: 'Robert T. Kiyosaki', publisher: 'Warner Books', year: 1997, category: 'Keuangan / Motivasi' },
                    { id: generateId(), title: 'Think and Grow Rich', author: 'Napoleon Hill', publisher: 'The Ralston Society', year: 1937, category: 'Motivasi / Bisnis' },
                    { id: generateId(), title: 'The Psychology of Money', author: 'Morgan Housel', publisher: 'Harriman House', year: 2020, category: 'Ekonomi / Psikologi' },
                    { id: generateId(), title: 'Start With Why', author: 'Simon Sinek', publisher: 'Portfolio', year: 2009, category: 'Kepemimpinan' },
                    { id: generateId(), title: 'Leaders Eat Last', author: 'Simon Sinek', publisher: 'Penguin', year: 2014, category: 'Kepemimpinan' },
                    { id: generateId(), title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', publisher: 'HarperOne', year: 2016, category: 'Motivasi / Filosofi' },
                    { id: generateId(), title: 'Everything is F*cked', author: 'Mark Manson', publisher: 'Harper', year: 2019, category: 'Filosofi / Psikologi' },
                    { id: generateId(), title: 'Filsafat Ilmu', author: 'Jujun S. Suriasumantri', publisher: 'Pustaka Sinar Harapan', year: 2010, category: 'Filsafat / Pendidikan' },
                    { id: generateId(), title: 'Manajemen Strategik', author: 'Fred R. David', publisher: 'Pearson Education', year: 2016, category: 'Manajemen / Bisnis' },
                    { id: generateId(), title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', publisher: 'MIT Press', year: 2009, category: 'Teknologi / Ilmu Komputer' },
                    { id: generateId(), title: 'Clean Code', author: 'Robert C. Martin', publisher: 'Prentice Hall', year: 2008, category: 'Teknologi / Pemrograman' },
                    { id: generateId(), title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas', publisher: 'Addison-Wesley', year: 1999, category: 'Teknologi / Pemrograman' },
                    { id: generateId(), title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell, Peter Norvig', publisher: 'Pearson', year: 2021, category: 'Teknologi / AI' },
                    { id: generateId(), title: 'Computer Networking: A Top-Down Approach', author: 'James F. Kurose, Keith W. Ross', publisher: 'Pearson', year: 2017, category: 'Teknologi / Jaringan' },
                    { id: generateId(), title: 'The Art of Computer Programming', author: 'Donald E. Knuth', publisher: 'Addison-Wesley', year: 2011, category: 'Teknologi / Algoritma' },
                    { id: generateId(), title: 'Python Crash Course', author: 'Eric Matthes', publisher: 'No Starch Press', year: 2019, category: 'Teknologi / Pemrograman' },
                    { id: generateId(), title: 'Hands-On Machine Learning with Scikit-Learn and TensorFlow', author: 'Aurélien Géron', publisher: 'O Reilly Media', year: 2023, category: 'Teknologi / AI & Data Science' }
                ];
            }
            
            if (savedBorrowings) {
                borrowings.value = JSON.parse(savedBorrowings);
                // Periksa status peminjaman saat memuat data
                checkBorrowingStatus();
            } else {
                // Data peminjaman kosong di awal
                borrowings.value = [];
            }
        };
        
        // Inisialisasi data anggota dengan NIS
        const initializeMembers = () => {
            members.value = [
                { nis: '2425120672', name: 'ABIYYA HAMDAN NURWANDHA', class: 'XI RPL III' },
                { nis: '2425120673', name: 'ALIYYI AKBAR EL KHOMEINI', class: 'XI RPL III' },
                { nis: '2425120674', name: 'AQBIL RASHIF ANSHARI', class: 'XI RPL III' },
                { nis: '2425120675', name: 'BAGAS BIMA PRADANA', class: 'XI RPL III' },
                { nis: '2425120676', name: 'BINTANG PUTRA SUGIATNO', class: 'XI RPL III' },
                { nis: '2425120677', name: 'DESTIA RAHMA', class: 'XI RPL III' },
                { nis: '2425120678', name: 'DHAFIN NAUFAL RIDHWAN', class: 'XI RPL III' },
                { nis: '2425120679', name: 'FACHMIE FIRMANSYAH', class: 'XI RPL III' },
                { nis: '2425120680', name: 'FAQIH AUNILLAH', class: 'XI RPL III' },
                { nis: '2425120681', name: 'FITHRI KHAIRUNNISSA AGUSTINA', class: 'XI RPL III' },
                { nis: '2425120682', name: 'GIANNI ZIDANE RIVANNO SETIAWAN', class: 'XI RPL III' },
                { nis: '2425120683', name: 'IKHSAN TRI SAPUTRA', class: 'XI RPL III' },
                { nis: '2425120684', name: 'ILHAM FATTAHILLAH ELANDI', class: 'XI RPL III' },
                { nis: '2425120685', name: 'KHALIFAH SAYID LATHIF', class: 'XI RPL III' },
                { nis: '2425120686', name: 'KRYSA PUTRI HIDAYAH', class: 'XI RPL III' },
                { nis: '2425120687', name: 'MARSHAL RAISYAN REVANALDI', class: 'XI RPL III' },
                { nis: '2425120688', name: 'MOCHAMAD ILHAM KAUTSAR PRATAMA', class: 'XI RPL III' },
                { nis: '2425120689', name: 'MOZA NANDA WIJAYA', class: 'XI RPL III' },
                { nis: '2425120690', name: 'MUHAMAD KEYSAN ARIF', class: 'XI RPL III' },
                { nis: '2425120691', name: 'MUHAMMAD ARI GILANG RAMADHAN', class: 'XI RPL III' },
                { nis: '2425120692', name: 'MUHAMMAD FAARIS ADZIKRA', class: 'XI RPL III' },
                { nis: '2425120693', name: 'MUHAMMAD HAIKAL AFWAN', class: 'XI RPL III' },
                { nis: '2425120694', name: 'MUHAMMAD KHOERUDIN', class: 'XI RPL III' },
                { nis: '2425120695', name: 'MUHAMMAD RIFQI ARYA FIRDAUS', class: 'XI RPL III' },
                { nis: '2425120696', name: 'NAURAH SALSABILA', class: 'XI RPL III' },
                { nis: '2425120697', name: 'RADEN DINDA NASYWATUNNISA', class: 'XI RPL III' },
                { nis: '2425120698', name: 'RADITYA NURAKMAL IRSYAD', class: 'XI RPL III' },
                { nis: '2425120699', name: 'RAFIF AKBAR MALIQ FIRDAUS', class: 'XI RPL III' },
                { nis: '2425120700', name: 'RAKA AUGUSTA SYA BANI', class: 'XI RPL III' },
                { nis: '2425120701', name: 'RASYA ARSHAVIN LEKSMAWAN', class: 'XI RPL III' },
                { nis: '2425120702', name: 'RESHAD AZHAR FADLURRAHMAN KALSAN', class: 'XI RPL III' },
                { nis: '2425120703', name: 'SITI SHAFA ZHARFAN ARIANI', class: 'XI RPL III' },
                { nis: '2425120704', name: 'WANDA NAZRA', class: 'XI RPL III' },
                { nis: '2425120705', name: 'YASER ALFONSO', class: 'XI RPL III' },
                { nis: '2425120706', name: 'ZAENAL ARIFIN', class: 'XI RPL III' },
                { nis: '2425120707', name: 'ZIVEN LARENDRA', class: 'XI RPL III' }
            ];
        };
        
        // Chart instances
        let borrowingChart = null;
        let categoryChart = null;
        
        // Fungsi untuk update chart
        const updateCharts = () => {
            // Update borrowing chart
            if (borrowingChart) {
                borrowingChart.data.labels = borrowingStats.value.labels;
                borrowingChart.data.datasets[0].data = borrowingStats.value.data;
                borrowingChart.update();
            }
            
            // Update category chart
            if (categoryChart) {
                categoryChart.data.labels = categoryStats.value.labels;
                categoryChart.data.datasets[0].data = categoryStats.value.data;
                categoryChart.update();
            }
        };
        
        // Lifecycle
        onMounted(() => {
            initializeMembers();
            loadFromLocalStorage();
            
            // Inisialisasi chart setelah komponen dimount
            setTimeout(initializeCharts, 100);
        });
        
        // Watch for changes in borrowings to update charts
        watch(borrowings, () => {
            updateCharts();
        }, { deep: true });
        
        // Fungsi untuk inisialisasi chart
        const initializeCharts = () => {
            // Chart untuk statistik peminjaman
            const borrowingCtx = document.getElementById('borrowingChart').getContext('2d');
            borrowingChart = new Chart(borrowingCtx, {
                type: 'bar',
                data: {
                    labels: borrowingStats.value.labels,
                    datasets: [{
                        label: 'Jumlah Peminjaman',
                        data: borrowingStats.value.data,
                        backgroundColor: 'rgba(120, 134, 199, 0.7)',
                        borderColor: 'rgba(45, 51, 107, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Peminjaman 7 Hari Terakhir'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
            
            // Chart untuk kategori buku
            const categoryCtx = document.getElementById('categoryChart').getContext('2d');
            categoryChart = new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: categoryStats.value.labels,
                    datasets: [{
                        data: categoryStats.value.data,
                        backgroundColor: [
                            'rgba(169, 181, 223, 0.7)',
                            'rgba(120, 134, 199, 0.7)',
                            'rgba(45, 51, 107, 0.7)',
                            'rgba(255, 107, 107, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Kategori Paling Sering Dipinjam'
                        }
                    }
                }
            });
        };
        
        // Return semua yang diperlukan di template
        return {
            currentView,
            books,
            members,
            borrowings,
            bookSearchQuery,
            bookCategoryFilter,
            bookForm,
            borrowingForm,
            bookFormErrors,
            borrowingFormErrors,
            isEditingBook,
            isEditingBorrowing,
            bookCategories,
            filteredBooks,
            recentBorrowings,
            availableBooks,
            membersSlider,
            changeView,
            scrollMembers,
            showBookForm,
            saveBook,
            editBook,
            deleteBook,
            downloadBookFile,
            showBorrowingForm,
            saveBorrowing,
            editBorrowing,
            deleteBorrowing,
            downloadBorrowingFile,
            returnBook,
            formatDate,
            getStatusBadgeClass,
            getInitials,
            getMemberNis
        };
    }
}).mount('#app');