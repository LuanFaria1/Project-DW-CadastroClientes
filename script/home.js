document.addEventListener('DOMContentLoaded', function() {
    const enderecoContainer = document.getElementById('endereco-container');

    // Função para renderizar os endereços
    function renderizarEnderecos() {
        enderecoContainer.innerHTML = ''; // Limpa o conteúdo atual

        // Recupera os endereços salvos no localStorage
        const enderecos = JSON.parse(localStorage.getItem('enderecos')) || [];

        enderecos.forEach(function(endereco, index) {
            const enderecoItem = document.createElement('div');
            enderecoItem.classList.add('endereco-item');
            enderecoItem.innerHTML = `
                <p><strong>Título:</strong> ${endereco.titulo}</p>
                <p><strong>Endereço:</strong> ${endereco.endereco}</p>
                <p><strong>Número:</strong> ${endereco.numero}</p>
                <p><strong>Complemento:</strong> ${endereco.complemento || 'N/A'}</p>
                <p><strong>CEP:</strong> ${endereco.cep}</p>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="editarEndereco(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="removerEndereco(${index})">Remover</button>
                </div>
            `;
            enderecoContainer.appendChild(enderecoItem);
        });
    }

    // Chamada inicial para renderizar os endereços
    renderizarEnderecos();

    // Função para remover um endereço
    window.removerEndereco = function(index) {
        const enderecos = JSON.parse(localStorage.getItem('enderecos')) || [];
        enderecos.splice(index, 1); // Remove o endereço do array
        localStorage.setItem('enderecos', JSON.stringify(enderecos)); // Atualiza o localStorage
        renderizarEnderecos(); // Renderiza novamente os endereços atualizados
    };

    // Função para editar um endereço
    window.editarEndereco = function(index) {
        // Implemente a lógica para editar um endereço de acordo com sua necessidade
        alert('Funcionalidade de edição ainda não implementada.');
    };
});