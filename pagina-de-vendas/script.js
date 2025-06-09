// Pega o botão
let mybutton = document.getElementById("backToTopBtn");

// Quando o usuário rola a página 20px para baixo, mostra o botão
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block"; // Mostra o botão
  } else {
    mybutton.style.display = "none"; // Esconde o botão
  }
}

// Quando o usuário clica no botão, rola para o topo do documento
mybutton.addEventListener("click", topFunction);

function topFunction() {
  // Para navegadores modernos
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Faz a rolagem suave
  });

  // Para navegadores mais antigos (fallback)
  document.body.scrollTop = 0; // Para Safari
  document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE e Opera
}

// Lógica para o campo de pesquisa e filtro por letra de e-books
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const ebookItems = document.querySelectorAll(".ebook-item");
    const filterLetters = document.querySelectorAll(".filter-letter"); // Pega todos os botões de letra

    let currentSearchTerm = ""; // Armazena o termo de pesquisa atual
    let currentFilterLetter = "all"; // Armazena a letra de filtro atual (padrão: "all")

    // Função para aplicar os filtros
    function applyFilters() {
        ebookItems.forEach(item => {
            const title = item.querySelector("h3").textContent.toLowerCase();
            const author = item.querySelector(".author").textContent.toLowerCase();
            const description = item.querySelector(".description").textContent.toLowerCase();

            // Checa a pesquisa por texto
            const matchesSearch = title.includes(currentSearchTerm) ||
                                  author.includes(currentSearchTerm) ||
                                  description.includes(currentSearchTerm);

            // Checa a filtragem por letra
            let matchesLetter = false;
            if (currentFilterLetter === "all") {
                matchesLetter = true; // Se o filtro é "Todos", mostra todos
            } else if (currentFilterLetter === "0-9") {
                // Verifica se o título começa com um número
                matchesLetter = /^[0-9]/.test(title);
            } else {
                // Verifica se o título começa com a letra selecionada
                matchesLetter = title.startsWith(currentFilterLetter.toLowerCase());
            }

            // Mostra ou esconde o item dependendo de ambos os filtros
            if (matchesSearch && matchesLetter) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    }

    // Evento para o campo de pesquisa (keyup)
    if (searchInput) {
        searchInput.addEventListener("keyup", function() {
            currentSearchTerm = searchInput.value.toLowerCase();
            applyFilters(); // Aplica os filtros novamente
        });
    }

    // Eventos para os botões de filtro por letra (click)
    filterLetters.forEach(button => {
        button.addEventListener("click", function() {
            // Remove a classe 'active' de todos os botões
            filterLetters.forEach(btn => btn.classList.remove("active"));

            // Adiciona a classe 'active' ao botão clicado
            this.classList.add("active");

            // Atualiza o filtro de letra atual
            currentFilterLetter = this.dataset.filter; // Pega o valor do atributo data-filter
            applyFilters(); // Aplica os filtros novamente

            // Limpa o campo de pesquisa ao clicar em um filtro de letra
            if (searchInput) {
                searchInput.value = "";
                currentSearchTerm = "";
            }
        });
    });

    // Chama applyFilters() uma vez no início para garantir que o filtro "Todos" funcione
    applyFilters();
});