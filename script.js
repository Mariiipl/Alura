
let dados = [];
const mainContent = document.querySelector('main');
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('keydown', (event) =>
    event.key === 'Enter' && iniciarBusca()
);

// Executa quando o conteúdo HTML da página é totalmente carregado.
// Busca os dados do arquivo 'data.json' e armazena na variável 'dados'.
window.addEventListener('DOMContentLoaded', async () => {
  try{
        const resposta = await fetch('data.json');
        dados = await resposta.json();
        exibirCards(dados); // Exibe todos os cards inicialmente
  } catch (error) {
      console.error('Erro ao carregar os dados:', error);
      mainContent.innerHTML = "<p>Erro ao carregar os dados.</p>";
  }
});

// Filtra os cards com base no termo digitado no campo de busca.
function iniciarBusca() {
    const termobusca = searchInput.value.trim().toLowerCase();

    if (!termobusca) {
        exibirCards (dados);
        return;
    }

    const resultados = dados.filter(linguagem =>
        linguagem.nome.toLowerCase().includes(termobusca)
    );

    exibirCards(resultados);
 }

// Renderiza os cards na tela a partir de uma lista de linguagens.
 function exibirCards(linguagem) {
    // Cria o HTML para todos os cards de uma vez
    const cardsHTML = linguagem.map(lang => `
        <article class="card">
            <p><strong>Ano de criação:</strong> ${lang.ano}</p>
            <h2>${lang.nome}</h2>
            <p>${lang.descricao}</p>
            <a href="${lang.link}" target="_blank" rel="noopener noreferrer">Documentação Oficial</a>
        </article>
    `).join('');

    // Insere o contêiner e os cards dentro do <main>
    mainContent.innerHTML = `
        <section class="card-container">
            ${linguagem.length > 0 ? cardsHTML : "<p>Nenhum resultado encontrado.</p>"}
        </section>
    `;
}

// --- CÓDIGO ADICIONADO PARA EXIBIR DETALHES ---

/**
 * Renderiza a visualização de detalhes para uma única linguagem.
 * @param {object} linguagem - O objeto da linguagem a ser exibida.
 */
function exibirDetalhes(linguagem) {
    mainContent.innerHTML = `
        <section class="card-container">
            <article class="card">
                <h2>${linguagem.nome}</h2>
                <p><strong>Ano de criação:</strong> ${linguagem.ano}</p>
                <p>${linguagem.descricao}</p>
                <a href="${linguagem.link}" target="_blank" rel="noopener noreferrer">Visitar documentação oficial</a>
                <br><br>
                <button id="botao-busca" onclick="exibirCards(dados)">Voltar</button>
            </article>
        </section>
    `;
}

// Adiciona um "ouvinte" de cliques no elemento <main>
mainContent.addEventListener('click', (event) => {
    const cardClicado = event.target.closest('article.card');
    const nomeLinguagem = cardClicado?.querySelector('h2')?.textContent;
    const linguagemEncontrada = dados.find(lang => lang.nome === nomeLinguagem);

    if (linguagemEncontrada) {
        exibirDetalhes(linguagemEncontrada);
    }
});

// --- CÓDIGO ADICIONAL PARA O BOTÃO VOLTAR ---

// Adiciona um "ouvinte" de cliques no corpo do documento para o botão "Voltar"
document.body.addEventListener('click', function(event) {
    // Verifica se o elemento clicado é o botão "Voltar" dentro da tela de detalhes
    if (event.target.matches('#botao-busca') && event.target.textContent === 'Voltar') {
        exibirCards(dados); // Chama a função para exibir todos os cards
    }
});