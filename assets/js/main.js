const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const more = document.getElementById("more");
const maxRecords = 151;
const limit = 10;
let offset = 0;

//ESSA FUNCAO PODERIA SER FEITA DIRETA NO MAP DA OUTRA FUNCAO ESTA AQUI APENAS PARA FORMA DE APRENDIZADO
function convertPokemonToHtml(pokemon) {
  return `<li class="pokemon ${pokemon.type} ">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types ">
                        ${pokemon.types
                          .map(
                            (type) => `<li class="type ${type}">${type}</li>`
                          )
                          .join("")}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                 </div>        
                 <button id="more" type="button" data-id="${
                   pokemon.id
                 }" class="about ${pokemon.type}">
                    Sobre
                    </button>
                     <div class="stat-sheet">
                        <ol>
                        ${pokemon.name_stat
                          .map(
                            (type) => `<li class="type ${type}">${type}</li>`
                          )
                          .join("")}
                        </ol>
                        <ol>
                        ${pokemon.base_stat
                          .map(
                            (type) => `<li class="type ${type}">${type}</li>`
                          )
                          .join("")}
                        </ol>
                    </div>
            </li>`;
}

// estamos transformando essa lista de pokemons em outra lista de pokemons em HTML
function loadMoreItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    // map assim como o for eu vou para cada elemento dele fazendo a funçao passada de converter para HTML e utilizando o join para concatenar
    // Poderia ser feito dentro do map direto em vez de outra funçao
    const newHtml = pokemons.map(convertPokemonToHtml).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadMoreItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordWithNextPage = offset + limit;

  if (qtdRecordWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadMoreItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadMoreItems(offset, limit);
  }
});

document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "more") {
    const card = event.target.closest(".pokemon");
    card.classList.toggle("active");
  }
});
