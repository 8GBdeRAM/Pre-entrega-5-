class Personaje {
  constructor(id, nombre, victorias, derrotas) {
    this.id = id;
    this.nombre = nombre;
    this.victorias = victorias;
    this.derrotas = derrotas;
    this.winrate = 0;

    this.recalcularWinrate();
  }
  totalPartidas() {
    return this.victorias + this.derrotas;
  }
  recalcularWinrate() {
    // Aqui se recalcula el winrate del personaje
    const total = this.totalPartidas();

    if (total === 0) {
      // 0/0 "NO" tiene sentido, se considera 0% winrate
      this.winrate = 0;
    } else {
      this.winrate = Math.round((this.victorias / total) * 1000) / 10;
    }
  }
  registrarResultado(gano) {
    if (gano) {
      this.victorias++;
    } else {
      this.derrotas++;
    }
    this.recalcularWinrate();
  }
  clasificar(limiteFuerte, limiteMedio) {
    if (this.winrate >= limiteFuerte) {
      return "Fuerte";
    } else if (this.winrate >= limiteMedio) {
      return "Medio";
    } else {
      return "Debil";
    }
  }
  resumen(limiteFuerte, limiteMedio) {
    return (
      this.nombre +
      " | Winrate: " +
      this.winrate +
      "% | V:" +
      this.victorias +
      " | D:" +
      this.derrotas +
      " | Nivel: " +
      this.clasificar(limiteFuerte, limiteMedio)
    );
  }
}
class Matchup {
  constructor(personaje, rival, victorias, derrotas) {
    this.personaje = personaje;
    this.rival = rival;
    this.victorias = victorias;
    this.derrotas = derrotas;
    this.winrate = 0;

    this.recalcularWinrate();
  }
  totalPartidas() {
    return this.victorias + this.derrotas;
  }
  recalcularWinrate() {
    // Aqui se recalcula el winrate del matchup
    const total = this.totalPartidas();

    if (total === 0) {
      // 0/0 "NO" tiene sentido, se considera 0% winrate
      this.winrate = 0;
    } else {
      this.winrate = Math.round((this.victorias / total) * 1000) / 10;
    }
  }
  registrarResultado(gano) {
    if (gano) {
      this.victorias++;
    } else {
      this.derrotas++;
    }
    this.recalcularWinrate();
  }
  clasificar() {
    // Clasifica el matchup según el winrate y el total de partidas
    switch (true) {
      case this.totalPartidas() === 0:
        return "Sin partidas";
      case this.winrate >= 60:
        return "Fuerte";
      case this.winrate >= 40:
        return "Medio";
      default:
        return "Debil";
    }
  }
  resumen() {
    return (
      this.personaje +
      " vs " +
      this.rival +
      " | Winrate: " +
      this.winrate +
      "% | V:" +
      this.victorias +
      " | D:" +
      this.derrotas +
      " | Matchup: " +
      this.clasificar()
    );
  }
}

//aqui se definen los personajes y matchups iniciales usando objetos de las clases Personaje y Matchup
const listaPersonajes = [
  new Personaje(1, "Ramlethal Valentine", 30, 10),
  new Personaje(2, "I-No", 14, 26),
  new Personaje(3, "Sol Badguy", 29, 21),
  new Personaje(4, "Ky Kiske", 21, 29),
  new Personaje(5, "Potemkin", 33, 17),
];

const listaMatchups = [
  new Matchup("Ramlethal Valentine", "Ky Kiske", 18, 12),
  new Matchup("Ramlethal Valentine", "Potemkin", 10, 20),
  new Matchup("Ramlethal Valentine", "I-No", 15, 15),
  new Matchup("Sol Badguy", "Ky Kiske", 12, 8),
  new Matchup("Sol Badguy", "Potemkin", 9, 11),
];

const limiteFuerte = 70;
const limiteMedio = 40;

let salir = false;
let siguienteId = 6;

function solicitarEntrada(mensaje) {
  const respuesta = prompt(mensaje);

  if (!respuesta || respuesta.trim() === "") {
    salir = true;
    return "";
  }
  return respuesta.trim();
}

function solicitarOpcion(mensaje) {
  const respuesta = solicitarEntrada(mensaje);

  if (salir) {
    return 0;
  }

  return Number(respuesta);
}

function mostrarMensaje(mensaje) {
  alert(mensaje);
  console.log(mensaje);
}

function buscarIndicePersonaje(nombre) {
  let indiceEncontrado = -1;
  let indice = 0;
  while (indice < listaPersonajes.length && indiceEncontrado === -1) {
    if (listaPersonajes[indice].nombre.toLowerCase() === nombre.toLowerCase()) {
      indiceEncontrado = indice;
    }
    indice++;
  }
  return indiceEncontrado;
}

function mostrarListaDePersonajes() {
  let texto = "----- Personajes disponibles -----\n";
  let indice = 0;

  for (const personaje of listaPersonajes) {
    texto +=
      indice + 1 + ". " + personaje.resumen(limiteFuerte, limiteMedio) + "\n";

    indice++;
  }
  mostrarMensaje(texto);
}

function consultarPersonaje() {
  let texto = "Elige un personaje:\n:";
  let indice = 0;
  for (const personaje of listaPersonajes) {
    texto += indice + 1 + ". " + personaje.nombre + "\n";
    indice++;
  }
  const opcion = solicitarEntrada(texto);

  if (salir) {
    return;
  }
  const posicion = opcion - 1;
  if (posicion < 0 || posicion >= listaPersonajes.length) {
    mostrarMensaje("Opción inválida.");
    return;
  }
  mostrarMensaje(listaPersonajes[posicion].resumen(limiteFuerte, limiteMedio));
}

//esto es una version mejorada de la funciones de arrays que ya tenia en un principio
function agregarPersonaje(alPrincipio) {
  const nombre = solicitarEntrada("Nombre del nuevo personaje:");

  if (salir) {
    return;
  }

  if (buscarIndicePersonaje(nombre) !== -1) {
    mostrarMensaje("Ese personaje ya existe.");
    return;
  }

  const respuestaVictorias = solicitarEntrada("Victorias iniciales:");

  if (salir) {
    return;
  }

  const respuestaDerrotas = solicitarEntrada("Derrotas iniciales:");

  if (salir) {
    return;
  }

  const victorias = Number(respuestaVictorias);
  const derrotas = Number(respuestaDerrotas);

  if (
    respuestaVictorias === "" ||
    respuestaDerrotas === "" ||
    isNaN(victorias) ||
    isNaN(derrotas) ||
    victorias < 0 ||
    derrotas < 0 ||
    Math.floor(victorias) !== victorias ||
    Math.floor(derrotas) !== derrotas
  ) {
    mostrarMensaje("Datos inválidos. Introduce números enteros no negativos.");
    return;
  }
  const nuevoPersonaje = new Personaje(
    siguienteId,
    nombre,
    victorias,
    derrotas,
  );
  siguienteId++;

  if (alPrincipio) {
    listaPersonajes.unshift(nuevoPersonaje);
  } else {
    listaPersonajes.push(nuevoPersonaje);
  }

  mostrarMensaje(
    "Personaje añadido:\n" + nuevoPersonaje.resumen(limiteFuerte, limiteMedio),
  );
}

function quitarPersonaje(alPrincipio) {
  if (listaPersonajes.length === 0) {
    mostrarMensaje("No hay personajes que eliminar.");
    return;
  }

  let eliminado;

  if (alPrincipio) {
    eliminado = listaPersonajes.shift();
  } else {
    eliminado = listaPersonajes.pop();
  }

  let indice = listaMatchups.length - 1;

  while (indice >= 0) {
    if (
      listaMatchups[indice].personaje === eliminado.nombre ||
      listaMatchups[indice].rival === eliminado.nombre
    ) {
      listaMatchups.splice(indice, 1);
    }

    indice--;
  }

  mostrarMensaje("Se ha eliminado a " + eliminado.nombre + ".");
}

function buscarPersonaje() {
  const nombre = solicitarEntrada("Escribe el nombre EXACTO del personaje:");

  if (salir) {
    return;
  }

  const indice = buscarIndicePersonaje(nombre);

  if (indice === -1) {
    mostrarMensaje("No se encontró ningún personaje con ese nombre.");
    return;
  }

  mostrarMensaje(
    "Posición en la lista: " +
      (indice + 1) +
      "\n" +
      listaPersonajes[indice].resumen(limiteFuerte, limiteMedio),
  );
}

function registrarPartidaGeneral() {
  let texto = "¿De qué personaje quieres registrar una partida?\n";
  let indice = 0;
  for (const personaje of listaPersonajes) {
    texto += indice + 1 + ". " + personaje.nombre + "\n";
    indice++;
  }

  const opcion = solicitarOpcion(texto);

  if (salir) {
    return;
  }

  const posicion = opcion - 1;

  if (posicion < 0 || posicion >= listaPersonajes.length) {
    mostrarMensaje("Opción inválida.");
    return;
  }

  const respuesta = solicitarEntrada("¿El personaje ganó o perdió? (g/p):");

  if (salir) {
    return;
  }

  const normalizado = respuesta.toLowerCase();
  let gano;

  if (normalizado === "g" || normalizado === "gano") {
    gano = true;
  } else if (normalizado === "p" || normalizado === "perdio") {
    gano = false;
  } else {
    mostrarMensaje("Opción inválida.");
    return;
  }

  listaPersonajes[posicion].registrarResultado(gano);
  mostrarMensaje(
    "Partida general registrada:\n" +
      listaPersonajes[posicion].resumen(limiteFuerte, limiteMedio),
  );
}

function menuGestionPersonajes() {
  const opcion = solicitarOpcion(
    "----- Gestionar personajes -----\n" +
      "1. Añadir personaje al final\n" +
      "2. Quitar último personaje\n" +
      "3. Añadir personaje al inicio\n" +
      "4. Quitar primer personaje\n" +
      "5. Buscar personaje\n" +
      "6. Registrar partida general\n" +
      "7. Volver",
  );
  if (salir) {
    return;
  }

  switch (opcion) {
    case 1:
      agregarPersonaje(false);
      break;

    case 2:
      quitarPersonaje(false);
      break;

    case 3:
      agregarPersonaje(true);
      break;

    case 4:
      quitarPersonaje(true);
      break;

    case 5:
      buscarPersonaje();
      break;

    case 6:
      registrarPartidaGeneral();
      break;

    case 7:
      break;

    default:
      mostrarMensaje("Opción inválida.");
  }
}

function mostrarListaMatchups() {
  if (listaMatchups.length === 0) {
    mostrarMensaje("No hay matchups registrados.");
    return;
  }
  let texto = "";
  let indice = 0;
  for (const matchup of listaMatchups) {
    texto += indice + 1 + ". " + matchup.resumen() + "\n";
    indice++;
  }
  mostrarMensaje(texto);
}
function consultarMatchupPersonaje() {
  const nombre = solicitarEntrada("Ingrese el nombre del personaje:");
  if (salir) {
    return;
  }

  if (buscarIndicePersonaje(nombre) === -1) {
    mostrarMensaje("El personaje no existe.");
    return;
  }

  let texto = "------- Matchups de " + nombre + " -------\n";
  let encontrados = 0;
  for (const matchup of listaMatchups) {
    if (matchup.personaje.toLowerCase() === nombre.toLowerCase()) {
      texto += matchup.resumen() + "\n";
      encontrados++;
    }
  }
  if (encontrados === 0) {
    texto += "No se encontraron matchups para este personaje.\n";
  }
  mostrarMensaje(texto);
}

function registrarResultadoMatchup() {
  if (listaMatchups.length === 0) {
    mostrarMensaje("No hay matchups registrados.");
    return;
  }

  let texto = "¿En que matchup quieres registrar una partida?\n";
  let indice = 0;
  for (const matchup of listaMatchups) {
    texto +=
      indice + 1 + ". " + matchup.personaje + " vs " + matchup.rival + "\n";
    indice++;
  }
  const opcion = solicitarOpcion(texto);
  if (salir) {
    return;
  }
  const posicion = opcion - 1;
  if (posicion < 0 || posicion >= listaMatchups.length) {
    mostrarMensaje("Opción inválida.");
    return;
  }
  const respuesta = solicitarEntrada(
    "¿Ganó " + listaMatchups[posicion].personaje + "? (s/n):",
  );
  if (salir) {
    return;
  }
  const normalizado = respuesta.toLowerCase();
  let gano;

  if (normalizado === "si" || normalizado === "s") {
    gano = true;
  } else if (normalizado === "no" || normalizado === "n") {
    gano = false;
  } else {
    mostrarMensaje("Opción inválida.");
    return;
  }
  listaMatchups[posicion].registrarResultado(gano);

  mostrarMensaje("Resultado registrado:\n" + listaMatchups[posicion].resumen());
}

function crearMatchup() {
  if (listaPersonajes.length < 2) {
    mostrarMensaje("Necesitas registrar al menos 2 personajes.");
    return;
  }
  let texto = "Elige el personaje que quieres analizar:\n";
  let indice = 0;
  for (const personaje of listaPersonajes) {
    texto += indice + 1 + ". " + personaje.nombre + "\n";
    indice++;
  }

  const opcionPersonaje = solicitarOpcion(texto);
  if (salir) {
    return;
  }
  const posicionPersonaje = opcionPersonaje - 1;
  if (posicionPersonaje < 0 || posicionPersonaje >= listaPersonajes.length) {
    mostrarMensaje("Opción inválida.");
    return;
  }
  texto =
    "Elige al rival de " + listaPersonajes[posicionPersonaje].nombre + ":\n";
  indice = 0;
  for (const personaje of listaPersonajes) {
    texto += indice + 1 + ". " + personaje.nombre + "\n";
    indice++;
  }

  const opcionRival = solicitarOpcion(texto);
  if (salir) {
    return;
  }
  const posicionRival = opcionRival - 1;
  if (posicionRival < 0 || posicionRival >= listaPersonajes.length) {
    mostrarMensaje("Opción inválida.");
    return;
  }

  if (posicionPersonaje === posicionRival) {
    mostrarMensaje(
      "El personaje y el rival no pueden ser el mismo.\n" +
        "selecciona otro rival.",
    );
    return;
  }
  const nombrePersonaje = listaPersonajes[posicionPersonaje].nombre;
  const nombreRival = listaPersonajes[posicionRival].nombre;

  let existe = false;
  for (const matchup of listaMatchups) {
    if (
      matchup.personaje.toLowerCase() === nombrePersonaje.toLowerCase() &&
      matchup.rival.toLowerCase() === nombreRival.toLowerCase()
    ) {
      existe = true;
    }
  }
  if (existe) {
    mostrarMensaje("Este matchup ya existe.");
    return;
  }
  const nuevoMatchup = new Matchup(nombrePersonaje, nombreRival, 0, 0);
  listaMatchups.push(nuevoMatchup);
  mostrarMensaje("Matchup creado:\n" + nuevoMatchup.resumen());
}

function gestionarMatchups() {
  const opcion = solicitarOpcion(
    "----- Gestionar matchups -----\n" +
      "1. Mostrar todos los matchups\n" +
      "2. Consultar matchups de un personaje\n" +
      "3. Registrar resultado de un matchup\n" +
      "4. Crear un matchup nuevo\n" +
      "5. Volver",
  );
  if (salir) {
    return;
  }
  switch (opcion) {
    case 1:
      mostrarListaMatchups();
      break;
    case 2:
      consultarMatchupPersonaje();
      break;
    case 3:
      registrarResultadoMatchup();
      break;
    case 4:
      crearMatchup();
      break;
    case 5:
      return;
    default:
      mostrarMensaje("Opción inválida.");
  }
}

while (!salir) {
  const opcionMenu = solicitarOpcion(
    "----- Winrate de personajes de Guilty Gear -----\n" +
      "1. Gestionar personajes\n" +
      "2. Mostrar lista de personajes\n" +
      "3. Consultar personaje\n" +
      "4. Gestionar matchups\n" +
      "5. Salir",
  );

  if (salir) {
    break;
  }

  switch (opcionMenu) {
    case 1:
      menuGestionPersonajes();
      break;

    case 2:
      mostrarListaDePersonajes();
      break;

    case 3:
      consultarPersonaje();
      break;

    case 4:
      gestionarMatchups();
      break;

    case 5: //intente usar el consejo de usar el while(confirm) pero por alguna razon no me iba o funcionaba mal
      if (confirm("¿Estás seguro que quieres salir?")) {
        mostrarMensaje("Gracias por usar el programa.");
        salir = true;
      }
      break;

    default:
      mostrarMensaje("Opción inválida.");
  }
}

console.log("----- Instancias de Personaje -----");

for (const personaje of listaPersonajes) {
  console.log(personaje.resumen(limiteFuerte, limiteMedio));
}

console.log("----- Instancias de Matchup -----");

for (const matchup of listaMatchups) {
  console.log(matchup.resumen());
}
console.log("----- Verificación de métodos -----");

if (listaPersonajes.length > 0) {
  const personajePrueba = listaPersonajes[0];

  console.log("Antes:", personajePrueba.resumen(limiteFuerte, limiteMedio));
  personajePrueba.registrarResultado(true);
  console.log("Después:", personajePrueba.resumen(limiteFuerte, limiteMedio));
}
