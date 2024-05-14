let url = "https://go-wash-api.onrender.com/api/auth/address";
async function endereco(){

    let user = localStorage.getItem('user');
    let token = JSON.parse(user).access_token;

    let resposta = await fetch ( url,{
        method:"GET",
        headers:{
            "Authorization": "Bearer "+token
        }
    })

    let responseApi = await resposta.json();
    console.log(responseApi)

}

endereco()