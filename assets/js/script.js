import { fetchNoticias } from "./api.js";

fetchNoticias().then(data => displayNoticias(data.articles))

const noticiasContainer = document.getElementById('noticias-container');

function displayNoticias(noticias) {
noticias.forEach((noticia) => {
    const data = {
        urlImagem: noticia.urlToImage,
        titulo: noticia.title,
        fonte: noticia.source.name,
        texto: noticia.description,
        link: noticia.url
    }

    const noticiaCard = `
    <div class="noticia-card">
        <div class="card-imagem">
            <img src="${data.urlImagem}" alt="${data.titulo}">
        </div>
        <div class="card-body">
        <div class="card-title">${data.titulo}</div>
            <p class="card-source">${data.fonte}</p>
            <p class="card-text"> ${data.texto} </p>
            <a href="${data.link}" class="card-botao">Ver notícia completa</a>
        </div>
    </div>
    `
    noticiasContainer.insertAdjacentHTML('beforeend', noticiaCard);
})
}

// Estrutura do HTML que deve ser gerada para cada notícia:
    //   <div class="noticia-card">
    //     <div class="card-imagem">
    //       <img src="../assets/img/noticia_1.jpg" alt="Brasil ganha segunda fábrica de mosquitos para combater dengue">
    //     </div>
    //     <div class="card-body">
    //       <div class="card-title">Brasil ganha segunda fábrica de mosquitos para combater dengue</div>
    //       <p class="card-source">Olhardigital.com.br</p>
    //       <p class="card-text">
    //         A maior e mais avançada fábrica de mosquitos do mundo é uma das grandes apostas para reduzir casos de dengue, zika e chikungunya não apenas no Brasil, mas em outros países endêmicos. A unidade constr…
    //       </p>
    //       <a href="(LINK DA API)" class="card-botao">Saiba Mais</a>
    //     </div>
    //   </div>