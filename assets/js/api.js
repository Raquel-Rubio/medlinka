const apikey = 
'51144ec31f1e41d7ba25524c1779e4ba'

export async function fetchNoticias() {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=campinas%20AND%20(SAUDE%20OR%20MEDICO%20OR%20VACINA%20OR%20TRATAMENTO%20OR%20DOEN%C3%87A%20OR%20CAMAPANHA)%20&pageSize=10&apiKey=${apikey}`
        const response = await fetch(`${apiUrl}`)
        return await response.json()
    } catch (error) {
        console.error('Erro ao buscar notícias:', error)
    }
}

//Método alternativo usando createElement ---- não utilizado no código final
//Função para exibir as notícias na página
//Constrói as divs/elementos HTML e insere as informações de cada noticia recuperada da API

// function displayNoticias(noticias) {
//     noticiasContainer.innerHTML = ""
//     noticias.forEach((noticia) => {
//         const noticiaCard = document.createElement("div")  //Cria uma div
//         noticiaCard.classList.add("noticia-card")          //Adiciona a classe noticia-card à div criada
//         const cardImagem = document.createElement("div")   //Cria outra div
//         cardImagem.classList.add("card-imagem")            //Adiciona a classe card-imagem à div criada
//         const imagem = document.createElement("img")
//         imagem.src = noticia.urlToImage
//         imagem.alt = noticia.title
//         const cardBody = document.createElement("div")
//         cardBody.classList.add("card-body")
//         const cardTitle = document.createElement("div")
//         cardTitle.classList.add("card-title")
//         cardTitle.textContent = noticia.title
