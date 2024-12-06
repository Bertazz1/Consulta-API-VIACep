document.getElementById('searchCep').addEventListener('click', () => {
    const cep = document.getElementById('cep').value.trim();
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    if (!/^\d{8}$/.test(cep)) {
        errorDiv.textContent = "CEP inválido. Por favor, insira um CEP com 8 números.";
        errorDiv.style.display = "block";
        resultDiv.style.display = "none";
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                throw new Error("CEP não encontrado.");
            }
            resultDiv.innerHTML = `<strong>Endereço:</strong> ${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            resultDiv.style.display = "block";
            errorDiv.style.display = "none";
        })
        .catch(error => {
            errorDiv.textContent = error.message;
            errorDiv.style.display = "block";
            resultDiv.style.display = "none";
        });
});

document.getElementById('searchStreet').addEventListener('click', () => {
    const street = document.getElementById('street').value.trim();
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    if (!street) {
        errorDiv.textContent = "Por favor, insira o nome de uma rua.";
        errorDiv.style.display = "block";
        resultDiv.style.display = "none";
        return;
    }

    const city = document.getElementById('city').value.trim();
    if (!city) {
        errorDiv.textContent = "Por favor, insira o nome de uma cidade.";
        errorDiv.style.display = "block";
        resultDiv.style.display = "none";
        return;
    }
    fetch(`https://viacep.com.br/ws/PR/${city}/${street}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.length) {
                throw new Error("Nenhuma rua encontrada.");
            }
            resultDiv.innerHTML = `<strong>Ruas encontradas:</strong><ul>${data.map(d => `<li>${d.logradouro}, ${d.localidade} - ${d.uf}</li>`).join('')}</ul>`;
            resultDiv.style.display = "block";
            errorDiv.style.display = "none";
        })
        .then(data => {
            if (!data.length) {
            throw new Error("Nenhuma rua encontrada.");
            }
            resultDiv.innerHTML = `<strong>Ruas encontradas:</strong><ul>${data.map(d => `<li>${d.logradouro}, ${d.localidade} - ${d.uf} - CEP: ${d.cep}</li>`).join('')}</ul>`;
            resultDiv.style.display = "block";
            errorDiv.style.display = "none";
        })
        .catch(error => {
            errorDiv.textContent = error.message;
            errorDiv.style.display = "block";
            resultDiv.style.display = "none";
        });
});
