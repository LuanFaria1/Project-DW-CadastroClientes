const url = 'https://go-wash-api.onrender.com/api/login';

async function login() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('password').value;

    // Limpar qualquer mensagem de erro anterior
    document.getElementById('error-message').innerText = '';
    
    // Mostrar uma mensagem de carregamento ou indicador
    document.getElementById('loading').style.display = 'block';

    try {
        let resposta = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": senha,
                "user_type_id": 1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Esconder a mensagem de carregamento ou indicador
        document.getElementById('loading').style.display = 'none';

        if (!resposta.ok) {
            if (resposta.status === 401) {
                throw new Error('Credenciais invalidas. Por favor, verifique seu email e senha.');
            } else if (resposta.status === 500) {
                throw new Error('Erro no servidor. Tente novamente mais tarde.');
            } else {
                throw new Error('Falha ao realizar login. Verifique suas credenciais.');
            }
        }

        let data = await resposta.json();
        localStorage.setItem('user', JSON.stringify(data));

        // Redirecionar ou atualizar a interface do usuário para indicar login bem-sucedido
        window.location.href = 'home.html'; 
    } catch (error) {
        // Esconder a mensagem de carregamento ou indicador em caso de erro
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error-message').innerText = error.message;
    }
}