document.getElementById('botaoPesquisarCEP').addEventListener('click', () => {
    const campoCEP = document.getElementById('campoCEP').value.trim();
    const divResultado = document.getElementById('resultado');
    const divErro = document.getElementById('erro');

    if (!/^\d{8}$/.test(campoCEP)) {
        divErro.textContent = "CEP inválido. Por favor, insira um CEP com 8 números.";
        divErro.style.display = "block";
        divResultado.style.display = "none";
        return;
    }

    fetch(`https://viacep.com.br/ws/${campoCEP}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.erro) {
                throw new Error("CEP não encontrado.");
            }
            divResultado.innerHTML = `
                <h3>Resultado da Pesquisa</h3>
                <p><strong>Endereço:</strong> ${dados.logradouro}</p>
                <p><strong>Bairro:</strong> ${dados.bairro}</p>
                <p><strong>Cidade:</strong> ${dados.localidade}</p>
                <p><strong>Estado:</strong> ${dados.uf}</p>`;
            divResultado.style.display = "block";
            divErro.style.display = "none";
        })
        .catch(erro => {
            divErro.textContent = erro.message;
            divErro.style.display = "block";
            divResultado.style.display = "none";
        });
});

document.getElementById('botaoPesquisarRua').addEventListener('click', () => {
    const campoRua = document.getElementById('campoRua').value.trim();
    const campoCidade = document.getElementById('campoCidade').value.trim();
    const divResultado = document.getElementById('resultado');
    const divErro = document.getElementById('erro');

    if (!campoRua || !campoCidade) {
        divErro.textContent = "Por favor, insira o nome da rua e da cidade.";
        divErro.style.display = "block";
        divResultado.style.display = "none";
        return;
    }

    fetch(`https://viacep.com.br/ws/PR/${campoCidade}/${campoRua}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
            if (!dados.length) {
                throw new Error("Nenhuma rua encontrada.");
            }
            divResultado.innerHTML = `
                <h3>Ruas Encontradas</h3>
                <ul>${dados.map(dado => `<li>${dado.logradouro}, ${dado.localidade} - ${dado.uf} - CEP: ${dado.cep}</li>`).join('')}</ul>`;
            divResultado.style.display = "block";
            divErro.style.display = "none";
        })
        .catch(erro => {
            divErro.textContent = erro.message;
            divErro.style.display = "block";
            divResultado.style.display = "none";
        });
});
