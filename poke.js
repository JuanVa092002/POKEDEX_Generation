const pedirTextoAlUsuario = require("prompt-sync")();

async function buscarPokemon(nombreDelPokemon) {
  let nombreEnMinusculas = nombreDelPokemon.toLowerCase();
  let direccionWeb = "https://pokeapi.co/api/v2/pokemon/" + nombreEnMinusculas;
  let respuesta = await fetch(direccionWeb);

  if (!respuesta.ok) {
    console.log("No encontre a " + nombreEnMinusculas);
    return null;
  }

  let datosDelPokemon = await respuesta.json();
  return datosDelPokemon;
}

async function mostrarFichaDelPokemon(nombreDelPokemon) {
  let pokemon = await buscarPokemon(nombreDelPokemon);

  if (pokemon === null) {
    return;
  }

  console.log("");
  console.log("POKEMON: " + pokemon.name.toUpperCase());
  console.log("Numero en la pokedex: " + pokemon.id);

  console.log("TIPOS:");
  for (let i = 0; i < pokemon.types.length; i++) {
    let tipo = pokemon.types[i];
    let nombreDelTipo = tipo.type.name;
    console.log("- " + nombreDelTipo);
  }

  console.log("HABILIDADES:");
  for (let i = 0; i < pokemon.abilities.length; i++) {
    let habilidad = pokemon.abilities[i];
    let nombreDeLaHabilidad = habilidad.ability.name;
    console.log("- " + nombreDeLaHabilidad);
  }

  console.log("ESTADISTICAS:");
  for (let i = 0; i < pokemon.stats.length; i++) {
    let estadistica = pokemon.stats[i];
    let nombreDeLaStat = estadistica.stat.name;
    let valorDeLaStat = estadistica.base_stat;
    console.log(nombreDeLaStat + ": " + valorDeLaStat);
  }
  console.log("");
}

function obtenerValorDeStat(pokemon, nombreDeLaStat) {
  let statBuscada = nombreDeLaStat.toLowerCase();

  for (let i = 0; i < pokemon.stats.length; i++) {
    let estadistica = pokemon.stats[i];
    let nombreActual = estadistica.stat.name;

    if (nombreActual === statBuscada) {
      return estadistica.base_stat;
    }
  }

  return null;
}

function sumarTodasLasStats(pokemon) {
  let sumaTotal = 0;

  for (let i = 0; i < pokemon.stats.length; i++) {
    let valor = pokemon.stats[i].base_stat;
    sumaTotal = sumaTotal + valor;
  }

  return sumaTotal;
}

async function compararDosPokemonPorStat(primerNombre, segundoNombre, nombreDeLaStat) {
  let primerPokemon = await buscarPokemon(primerNombre);
  let segundoPokemon = await buscarPokemon(segundoNombre);

  if (primerPokemon === null || segundoPokemon === null) {
    console.log("No se puede comparar porque uno de los dos no existe");
    return;
  }

  let puntosDelPrimero = obtenerValorDeStat(primerPokemon, nombreDeLaStat);
  let puntosDelSegundo = obtenerValorDeStat(segundoPokemon, nombreDeLaStat);

  if (puntosDelPrimero === null || puntosDelSegundo === null) {
    console.log("Esa estadistica no es valida");
    console.log("Puedes usar: hp, attack, defense, special-attack, special-defense, speed");
    return;
  }

  console.log(primerPokemon.name + ": " + puntosDelPrimero);
  console.log(segundoPokemon.name + ": " + puntosDelSegundo);

  if (puntosDelPrimero > puntosDelSegundo) {
    console.log("Gana " + primerPokemon.name);
  } else if (puntosDelSegundo > puntosDelPrimero) {
    console.log("Gana " + segundoPokemon.name);
  } else {
    console.log("Empate");
  }
}

async function encontrarElMasFuerteDelEquipo(nombresDelEquipo) {
  let nombreDelGanador = "";
  let mayorSumaDeStats = 0;

  for (let i = 0; i < nombresDelEquipo.length; i++) {
    let nombreEnLaLista = nombresDelEquipo[i];
    let pokemon = await buscarPokemon(nombreEnLaLista);

    if (pokemon !== null) {
      let sumaDeStats = sumarTodasLasStats(pokemon);
      console.log(pokemon.name + " suma " + sumaDeStats + " puntos en total");

      if (sumaDeStats > mayorSumaDeStats) {
        mayorSumaDeStats = sumaDeStats;
        nombreDelGanador = pokemon.name;
      }
    }
  }

  console.log("El mas fuerte del equipo es " + nombreDelGanador + " con " + mayorSumaDeStats + " puntos");
}

async function iniciarPrograma() {
  console.log("=== MI POKEDEX ===");

  let nombreParaConsultar = pedirTextoAlUsuario("Escribe el nombre de un pokemon: ");
  await mostrarFichaDelPokemon(nombreParaConsultar);

  console.log("");
  console.log("--- Comparar dos pokemon ---");
  let nombreDelPrimero = pedirTextoAlUsuario("Nombre del primer pokemon: ");
  let nombreDelSegundo = pedirTextoAlUsuario("Nombre del segundo pokemon: ");
  let statParaComparar = pedirTextoAlUsuario("Que stat quieres comparar (por ejemplo speed): ");
  await compararDosPokemonPorStat(nombreDelPrimero, nombreDelSegundo, statParaComparar);

  console.log("");
  console.log("--- Armar un equipo ---");
  let cantidadDePokemon = Number(pedirTextoAlUsuario("Cuantos pokemon tiene tu equipo?: "));
  let nombresDelEquipo = [];

  for (let i = 0; i < cantidadDePokemon; i++) {
    let numeroDePokemon = i + 1;
    let nombre = pedirTextoAlUsuario("Nombre del pokemon " + numeroDePokemon + ": ");
    nombresDelEquipo.push(nombre);
  }

  await encontrarElMasFuerteDelEquipo(nombresDelEquipo);

  console.log("");
  console.log("Gracias por tu tiempo");
}

iniciarPrograma();
