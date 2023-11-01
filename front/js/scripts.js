const protocolo = "http://";
const baseURL = "localhost:3000";
const filmesEndPoint = "/filmes";

async function obterFilmes() {
    // console.log("teste 123");
    const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`;
    const filmes = (await axios.get(URLcompleta)).data;
    // console.log(filmes);
    let tabela = document.querySelector('.filmes');
    let corpoTabela = tabela.getElementsByTagName('tbody')[0];
    for (let filme of filmes) {
        let linha = corpoTabela.insertRow(0);
        //inserir no começo o 0 significa
        let celulaTitulo = linha.insertCell(0);
        let celulaSinopse = linha.insertCell(1);
        celulaTitulo.innerHTML = filme.titulo;
        celulaSinopse.innerHTML = filme.sinopse;
        // para cada filme da minha lista de filmes, vou inserir uma linha no corpo da
        // tabela
    }
}
async function cadastrarFilme() {
    const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`;
    // estamos selecionando o form do titulo e das sinopses
    let tituloInput = document.querySelector('#tituloInput');
    let sinopseInput = document.querySelector('#sinopseInput');
    //estamos capturando o que o usuario esceveu
    let titulo = tituloInput.value;
    let sinopse = sinopseInput.value;
    if(titulo && sinopse){
    //os itens abaixo limpam o form depois de capturar as informações 
    tituloInput.value = "";
    sinopseInput.value = "";
    //aqui estamos mandando um post pra essa url mandamos o objetio json (titulo e sinopse) vai e volta os dados dessa request a info (titulo e sinopse) pro banco e estamos recebendo o .data de volta. 
    const filmes = (await axios.post(URLcompleta, {titulo, sinopse})).data;
    // estamos buscando o elementeo da classe filmes
    let tabela = document.querySelector('.filmes')
    //busca quem tem a classe filmes 
    let corpoTabela = tabela.getElementsByTagName('tbody')[0];
    corpoTabela.innerHTML = "";
    for (let filme of filmes){
        let linha = corpoTabela.insertRow(0);
        let celulaTitulo = linha.insertCell(0);
        let celulaSinopse = linha.insertCell(1);
        celulaTitulo.innerHTML = filme.titulo;
        celulaSinopse.innerHTML = filme.sinopse;
    }
    }
    else{
        let alert = document.querySelector('.alert');
        alert.classList.add('show');
        alert.classList.remove('d-none');
        setTimeout (() => {
            alert.classList.add('d-none');
            alert.classList.remove('show');
        }, 2000)
    }
}