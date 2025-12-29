 function handleKeyPress(event) {
            // Cek apakah tombol yang ditekan adalah Enter (kode 13)
            if (event.key === 'Enter') {
                const inputElement = document.getElementById('textInput');
                const resultElement = document.getElementById('result');
                const inputValue = inputElement.value.trim();
                
                // Kosongkan hasil sebelumnya
                resultElement.className = 'result';
                
                if (inputValue === '') {
                    resultElement.innerHTML = `
                        <span class="emoji">⚠️</span>
                        Anda belum mengetik apa-apa!
                    `;
                    resultElement.classList.add('empty', 'show');
                } else {
                    resultElement.innerHTML = `
                        <span class="emoji">✅</span>
                        Anda mengetik: <strong>"${inputValue}"</strong>
                    `;
                    resultElement.classList.add('typed', 'show');
                }
                
                // Kosongkan input setelah menekan Enter
                inputElement.value = '';
            }
        }