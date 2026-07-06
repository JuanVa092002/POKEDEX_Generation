const prompt = require('prompt-sync')();
// Input o eleccion de un Pokémon para obtener información sobre él. 

let name = prompt("Enter a Pokémon name:");

async function getPokemon(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    console.log(response.status);
    const data = await response.json();
        
        console.log('Tipos');
            data.types.forEach(type => {
                console.log(type.type.name);
            });
        console.log('===============');
        
        console.log('\nStats');
            data.stats.forEach(stat => {
                console.log(`${stat.stat.name}: ${stat.base_stat}`);
        });
        console.log('===============');
        console.log('\nHabilidades');
            data.abilities.forEach(ability => {
                console.log(ability.ability.name);
            });
        console.log('===============');
}
getPokemon(name);

getPokemon('pikachu')
getPokemon('bulbasaur')
getPokemon('charmander')
getPokemon('squirtle')
getPokemon('jigglypuff')

forEach