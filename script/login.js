// Simulação de um banco de dados de usuários
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' }
];

// Função para verificar as credenciais do usuário
function login(username, password) {
    // Verifica se o usuário e a senha correspondem a um usuário existente
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        // Se as credenciais estiverem corretas, redirecione o usuário para a página de boas-vindas
        window.location.href = 'welcome.html';
    } else {
        // Se as credenciais estiverem incorretas, exiba uma mensagem de erro
        alert('Username or password is incorrect. Please try again.');
    }
}

// Exemplo de uso:
const usernameInput = 'user1'; // Aqui você obteria o valor do campo de entrada do usuário
const passwordInput = 'password1'; // Aqui você obteria o valor do campo de entrada de senha

// Chame a função login com os valores dos campos de entrada
login(usernameInput, passwordInput);
