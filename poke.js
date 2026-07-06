const prompt = require('prompt-sync')();
// Input o eleccion de un Pokémon para obtener información sobre él. 

let name = prompt("Enter a Pokémon name:");

let searchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok){
        console.log(`Error: ${response.status}`);
        return null;
    } 
    const data = await response.json();
    }

let dataPokemon = searchPokemon(name);
// searchPokemon(name);

let mostrarficha = (pokemon) => {
    searchPokemon(dataPokemon);
}
console.log(object);