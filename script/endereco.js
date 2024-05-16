const url = 'https://go-wash-api.onrender.com/api/auth/address';

// Função assíncrona para salvar um endereço
async function salvarendereco() {  
    // Obter os valores dos campos do formulário
    const titulo = document.getElementById('Titulo').value;
    const cep = document.getElementById('CEP').value;
    const endereco = document.getElementById('Endereço').value;
    const numero = document.getElementById('Número').value;

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!titulo || !cep || !endereco || !numero) {
        alert("Preencha todos os campos obrigatórios");
        return;
    }

    // Verificar se o CEP é válido
    const cepValido = await verificarCEP(cep);
    if (!cepValido) {
        alert("CEP inválido. Por favor, insira um CEP válido cadastrado no site ViaCEP.");
        return;
    }

    // Enviar uma solicitação para salvar o endereço no servidor
    const resposta = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "title": titulo,
            "cep": cep,
            "address": endereco,
            "number": numero
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Verificar se a solicitação foi bem-sucedida
    if (resposta.ok) {
        alert("Cadastro feito com sucesso");
        // Salvar os dados localmente
        salvarDadosLocal(titulo, cep, endereco, numero);
        // Redirecionar para a página inicial
        window.location.href = "home.html"; 
    } else {
        alert("Ocorreu um erro ao cadastrar o endereço");
    }
}

// Função assíncrona para verificar a validade de um CEP
async function verificarCEP(cep) {
    const viaCEPURL = `https://viacep.com.br/ws/${cep}/json/`;
    try {
        const response = await fetch(viaCEPURL);
        const data = await response.json();

        // Verificar se o CEP é válido
        if (!data.erro) {
            document.getElementById('Endereço').value = data.logradouro;
            return true;
        } else {
            alert("CEP não encontrado. Por favor, verifique o CEP digitado.");
            return false;
        }
    } catch (error) {
        console.error("Erro ao verificar CEP:", error);
        return false;
    }
}

// Função para salvar os dados localmente
function salvarDadosLocal(titulo, cep, endereco, numero) {
    // Recupera os endereços salvos no localStorage
    let enderecos = JSON.parse(localStorage.getItem('enderecos')) || [];
    
    // Verifica se enderecos é um array
    if (!Array.isArray(enderecos)) {
        enderecos = [];
    }
    
    // Adiciona o novo endereço ao array de endereços
    enderecos.push({
        titulo: titulo,
        cep: cep,
        endereco: endereco,
        numero: numero
    });

    // Salva o array de endereços atualizado no localStorage
    localStorage.setItem('enderecos', JSON.stringify(enderecos));
}
document.getElementById('CEP').addEventListener('input', function() {
    const cep = this.value;
    verificarCEP(cep);
});
