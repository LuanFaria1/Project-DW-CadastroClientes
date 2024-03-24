// Definindo a URL da API para cadastro de usuários
const url = 'https://api-go-wash-efc9c9582687.herokuapp.com/api/user';

// Função para validar o formato de e-mail
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para validar o formato de CPF
function validaCpf(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); 
  if (cpf.length !== 11) return false; 

  // Estrutura de Validação de CPF / CNPJ
  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  let rest2 = (sum * 10) % 11;
  if (rest2 === 10 || rest2 === 11) {
    rest2 = 0;
  }
  if (rest2 !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

// Função para validar o formato de CPF/CNPJ
function isValidCpfCnpj(cpfCnpj) {
  // Validar CPF
  if (cpfCnpj.length === 11) {
    return validaCpf(cpfCnpj);
  }

  // Validar CNPJ
  if (cpfCnpj.length === 14) {
    // Implementar a validação de CNPJ
    return true; // Temporariamente retornando true, você deve implementar a lógica de validação do CNPJ
  }

  return false;
}

// Função assíncrona para realizar o cadastro do usuário
async function cadastroUsuario() {
  // Obtendo os elementos de input pelos seus IDs
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const cpf_cnpj = document.getElementById('cpf_cnpj');
  const user_type = document.getElementById('user_type');

  // Verificando se os campos obrigatórios estão preenchidos
  if (!name.value || !email.value || !cpf_cnpj.value) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Verificando o formato do e-mail
  if (!isValidEmail(email.value)) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }

  // Verificando o formato do CPF/CNPJ
  if (!isValidCpfCnpj(cpf_cnpj.value)) {
    alert('Por favor, insira um CPF/CNPJ válido.');
    return;
  }

  // Criando o objeto com os dados do usuário
  const userData = {
    name: name.value,
    email: email.value,
    user_type_id: user_type.value,
    password: document.getElementById('password').value, 
    cpf_cnpj: cpf_cnpj.value,
    terms: 1,
    birthday: document.getElementById('birthday').value
  };

  // Realizando uma requisição POST para a URL da API
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Verificando se a resposta é bem-sucedida
    if (response.ok) {
      // Redirecionar para a página de login
      window.location.href = 'login.html';
    } else {
      // Extraindo os dados da resposta da API no formato JSON
      const data = await response.json();

      // Verificar se a resposta possui uma mensagem de erro
      if (data && data.error && data.error.message) {
        alert('Erro no cadastro: ' + data.error.message);
      } else {
        alert('Erro na requisição: Não foi possível processar a requisição.');
      }
    }
  } catch (error) {
    // Exibir a mensagem de erro
    alert('Erro na requisição: ' + error.message);
  }
}
