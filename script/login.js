const url = 'https://go-wash-api.onrender.com/api/login';

async function login() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('password').value;

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

        if (!resposta.ok) {
            throw new Error('Falha ao realizar login. Verifique suas credenciais.');
        }

        let data = await resposta.json();
        localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
        document.getElementById('error-message').innerText = error.message;
    }
}
