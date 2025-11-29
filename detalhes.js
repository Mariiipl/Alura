document.addEventListener('DOMContentLoaded', () => {
    // 1. Pega o parâmetro 'lang' da URL
    const params = new URLSearchParams(window.location.search);
    const langName = params.get('lang');

    const detalhesContainer = document.getElementById('detalhes-container');

    if (!langName) {
        detalhesContainer.innerHTML = '<p>Linguagem não especificada.</p>';
        return;
    }

    // 2. Carrega os dados do JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // 3. Encontra a linguagem correta
            const linguagem = data.find(item => item.nome === langName);

            if (linguagem) {
                // 4. Cria e insere o HTML na página
                detalhesContainer.innerHTML = `
                    <article class="card">
                       <h2>${linguagem.nome}</h2> 
                       <p>Ano de criação: ${linguagem.ano}</p>
                       <p>${linguagem.descricao}</p>
                       <a href="${linguagem.link}" target="_blank">Visitar documentação oficial</a>
                    </article>
                `;
            } else {
                detalhesContainer.innerHTML = `<p>Linguagem "${langName}" não encontrada.</p>`;
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
            detalhesContainer.innerHTML = '<p>Ocorreu um erro ao carregar as informações.</p>';
        });
});