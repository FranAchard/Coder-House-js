// Definimos un array con las cartas del juego
const cartas = [
    "A", "A", "B", "B", "C", "C", "D", "D",
    "E", "E", "F", "F", "G", "G", "H", "H"
];

let cartasDestapadas = [];
let aciertos = 0;
let movimientos = 0;

// Función para barajar el array de cartas
function barajarCartas() {
    cartas.sort(() => Math.random() - 0.5);
}

// Función para destapar una carta
function destapar(id) {
    if (cartasDestapadas.length < 2) {
        const carta = cartas[id];
        document.getElementById(id.toString()).textContent = carta;
        cartasDestapadas.push({ id, carta });

        if (cartasDestapadas.length === 2) {
            movimientos++;
            document.getElementById("movimientos").textContent = `Movimientos: ${movimientos}`;

            if (cartasDestapadas[0].carta === cartasDestapadas[1].carta) {
                aciertos++;
                document.getElementById("aciertos").textContent = `Aciertos: ${aciertos}`;
                cartasDestapadas = [];

                if (aciertos === cartas.length / 2) {
                    alert("¡Has ganado!");
                }
            } else {
                setTimeout(() => {
                    ocultarCartas();
                }, 1000);
            }
        }
    }
}

// Función para ocultar las cartas destapadas
function ocultarCartas() {
    for (const carta of cartasDestapadas) {
        document.getElementById(carta.id.toString()).textContent = "";
    }
    cartasDestapadas = [];
}

// Función para inicializar el juego
function iniciarJuego() {
    barajarCartas();
    document.getElementById("movimientos").textContent = "Movimientos: 0";
    document.getElementById("aciertos").textContent = "Aciertos: 0";
    aciertos = 0;
    movimientos = 0;

    const botones = document.querySelectorAll("button");
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", () => destapar(i));
    }
}

iniciarJuego();
