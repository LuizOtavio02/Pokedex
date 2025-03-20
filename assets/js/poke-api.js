// esse obejeto vai representar a nossa API
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    
    // essa é uma funçao a onde eu recebo de getPokemonsDetail muitos detalhes sobre os pokemons 
    //  mas entao instancio em uma classe apenas os detalhes que eu quero instanciando na classe abaixo
    const pokemon = new Pokemon()
    pokemon.id = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
    const [type] = types
     
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.base_stat = pokeDetail.stats.map(a => a.base_stat)
    pokemon.name_stat = pokeDetail.stats.map(a => a.stat.name)
    
    return pokemon
}


// adicionando um metodo com o objetivo de ir buscar os detalhes dos pokemons
pokeApi.getPokemonsDetail = (pokemon) => {
    // recebendo a lista json da response body fiz mais essa requisao para pegar mais detalhes
    //  e mando para a funçao convertPokeApiDetailToPokemon para recolher os detalhes especificos que eu quero
    return fetch(pokemon.url).then(response => response.json()).then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonsByNameOrId = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    return fetch(url)
                .then(response => response.json())
                .then(responseBody => responseBody.results)
                .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
                .then(detaillRequest => Promise.all(detaillRequest))
                .then(pokemonsDetaills => pokemonsDetaills)
                .catch(error => console.error(error))
                
}




// adicionando um metodo ao objeto pokeApi onde vai retornar toda a manipulaçao do nosso fetch
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    // codigo de consumo de API
    return fetch(url)
    // o fetch devolveu uma promise de response
                .then(response => response.json())
                // converti a Response(body) para json 
                .then(responseBody => responseBody.results)
                // aqui eu vou pegar os results do body(json)
                .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
                // estou mapeando a lista de pokemons mandando para o metodo getPokemonsDetail para uma lista mais detalhada
                .then(detaillRequest => Promise.all(detaillRequest))
                // fazendo com que espere a promise de todas os detalhes de pokemons
                
                .then(pokemonsDetaills => pokemonsDetaills)
                // apos passar pelo metodo e funçao convertPokeApiDetailToPokemon eu tenho apenas os detalhes que eu quero em uma classe instanciado

                .catch(error => console.error(error))
                //fazendo ptratamento para que veja qual foi o erro caso ocorra
                
}

