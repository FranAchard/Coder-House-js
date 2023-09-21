// Definimos un array con las cartas del juego
const cartas = [
    "A", "A", "B", "B", "C", "C", "D", "D",
    "E", "E", "F", "F", "G", "G", "H", "H"
];

const maxMovimientos = 15; // Máximo número de movimientos permitidos

let cartasDestapadas = [];
let aciertos = 0;
let movimientos = 0;
let intentos = 0;
let tiempoRestante = 45; // Tiempo en segundos
let timerInterval;
let juegoIniciado = false; // Variable para controlar si el juego ha comenzado

// Función para barajar el array de cartas
function barajarCartas() {
    cartas.sort(() => Math.random() - 0.5);
}

// Función para destapar una carta
function destapar(id) {
    if (!juegoIniciado || cartasDestapadas.length >= 2 || intentos >= maxMovimientos) {
        return; // No hacer nada si el juego no ha comenzado o se alcanzó el máximo de movimientos
    }

    const boton = document.getElementById(id.toString());

    // Verificar si la carta ya está destapada
    if (boton.textContent !== "?") {
        return;
    }

    const carta = cartas[id];
    boton.textContent = carta;
    cartasDestapadas.push({ id, carta });

    if (cartasDestapadas.length === 2) {
        movimientos++;
        document.getElementById("movimientos").textContent = `Movimientos: ${movimientos}`;

        if (cartasDestapadas[0].carta === cartasDestapadas[1].carta) {
            // Si las cartas son iguales, incrementa la variable aciertos
            aciertos++;
            document.getElementById("aciertos").textContent = `Aciertos: ${aciertos}`;
            cartasDestapadas = [];

            if (aciertos === cartas.length / 2) {
                clearInterval(timerInterval);
                alert("¡Has ganado!");
            }
        } else {
            setTimeout(() => {
                ocultarCartas();
            }, 1000);
        }

        intentos++;

        if (intentos >= maxMovimientos) {
            // Verificar si el usuario ha agotado los movimientos disponibles
            alert("Te quedaste sin movimientos");
        }
    }
}

// Función para ocultar las cartas destapadas
function ocultarCartas() {
    for (const carta of cartasDestapadas) {
        const boton = document.getElementById(carta.id.toString());
        boton.textContent = "?";
    }
    cartasDestapadas = [];
}

// Función para iniciar el temporizador
function iniciarTemporizador() {
    timerInterval = setInterval(() => {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            document.getElementById("t-restante").textContent = `Tiempo restante: ${tiempoRestante} Segundos`;
        } else {
            clearInterval(timerInterval);
            alert("¡Se acabó el tiempo!");
        }
    }, 1000);
}

// Función para inicializar el juego
function iniciarJuego() {
    if (!juegoIniciado) {
        barajarCartas();
        aciertos = 0;
        movimientos = 0;
        intentos = 0;
        juegoIniciado = true; // Marcamos que el juego ha comenzado

        // Ocultar el botón "Start" después de iniciado el juego
        document.getElementById("startButton").style.display = "none";

        // Establecer el contenido de los elementos HTML aquí
        document.getElementById("movimientos").textContent = "Movimientos: 0";
        document.getElementById("aciertos").textContent = "Aciertos: 0";
        document.getElementById("t-restante").textContent = `Tiempo restante: ${tiempoRestante} Segundos`;

        iniciarTemporizador();

        const botones = document.querySelectorAll("button");
        for (let i = 0; i < botones.length; i++) {
            botones[i].addEventListener("click", () => destapar(i));
        }
    }
}

// Inicializa el juego al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    iniciarJuego();
});
