let dom = document;

const apiPokemon = "https://pokeapi.co/api/v2/pokemon/";
const apiSpecies = "https://pokeapi.co/api/v2/pokemon-species/";
const apiType = "https://pokeapi.co/api/v2/type/";

async function consumirApi(url){

    try{

        const respuesta = await fetch(url,{
            method:"GET"
        });

        if(!respuesta.ok){
            throw new Error("No se encontró información");
        }

        const datos = await respuesta.json();
        return datos;

    }catch(error){

        alert(error.message);
        return null;

    }

}

async function listarPokemon(){

    let nombrePokemon = dom.getElementById("nombrePokemon").value.trim().toLowerCase();

    if(!nombrePokemon){

        alert("Ingrese un Pokémon");
        return;

    }

    const pokemon = await consumirApi(
        `${apiPokemon}${nombrePokemon}`
    );

    const species = await consumirApi(
        `${apiSpecies}${nombrePokemon}`
    );

    if(!pokemon || !species){
        return;
    }

    let descripcion = species.flavor_text_entries.find(
        texto => texto.language.name === "es"
    );

    let resultado = dom.getElementById(
        "resultadoPokemon"
    );

    resultado.innerHTML = `

        <div class="pokemon">

            <h2>${pokemon.name.toUpperCase()}</h2>

            <img
                src="${pokemon.sprites.front_default}"
                alt="${pokemon.name}">

            <p>
                <strong>ID:</strong>
                ${pokemon.id}
            </p>

            <p>
                <strong>Altura:</strong>
                ${pokemon.height}
            </p>

            <p>
                <strong>Peso:</strong>
                ${pokemon.weight}
            </p>

            <p>
                <strong>Tipos:</strong>
                ${pokemon.types
                    .map(tipo => tipo.type.name)
                    .join(", ")}
            </p>

            <hr>

            <p>
                <strong>Color:</strong>
                ${species.color.name}
            </p>

            <p>
                <strong>Tasa de captura:</strong>
                ${species.capture_rate}
            </p>

            <p>
                <strong>Legendario:</strong>
                ${species.is_legendary ? "Sí" : "No"}
            </p>

            <p>
                <strong>Mítico:</strong>
                ${species.is_mythical ? "Sí" : "No"}
            </p>

            <p>
                <strong>Descripción:</strong><br>
                ${
                    descripcion
                    ? descripcion.flavor_text
                    : "No disponible"
                }
            </p>

        </div>`;
}

async function listarTipos(){

    const datos = await consumirApi(apiType);

    if(!datos){
        return;
    }

    let resultado = dom.getElementById(
        "listaTipos"
    );

    resultado.innerHTML = "";

    datos.results.forEach((tipo,index)=>{

        resultado.innerHTML += `

            <div class="lista-tipo">
                <strong>${index + 1}</strong>
                - ${tipo.name}
            </div>`;

    });

}

async function listarTipo(){

    let nombreTipo = dom
        .getElementById("nombreTipo")
        .value
        .trim()
        .toLowerCase();

    if(!nombreTipo){

        alert("Ingrese un tipo");
        return;

    }

    const tipo = await consumirApi(
        `${apiType}${nombreTipo}`
    );

    if(!tipo){
        return;
    }

    let resultado = dom.getElementById(
        "resultadoTipo"
    );

    resultado.innerHTML = `

        <div class="tipo">

            <h2>
                ${tipo.name.toUpperCase()}
            </h2>

            <p>
                <strong>Hace doble daño a:</strong><br>
                ${
                    tipo.damage_relations.double_damage_to
                    .map(t => t.name)
                    .join(", ") || "Ninguno"
                }
            </p>

            <p>
                <strong>Recibe doble daño de:</strong><br>
                ${
                    tipo.damage_relations.double_damage_from
                    .map(t => t.name)
                    .join(", ") || "Ninguno"
                }
            </p>

            <p>
                <strong>No hace daño a:</strong><br>
                ${
                    tipo.damage_relations.no_damage_to
                    .map(t => t.name)
                    .join(",") || "Ninguno"
                }
            </p>

            <p>
                <strong>No recibe daño de:</strong><br>
                ${
                    tipo.damage_relations.no_damage_from
                    .map(t => t.name)
                    .join(", ") || "Ninguno"
                }
            </p>

            <p>
                <strong>Pokémon de este tipo:</strong>
                ${tipo.pokemon.length}
            </p>

        </div>`;
}