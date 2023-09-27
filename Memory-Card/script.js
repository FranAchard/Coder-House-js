const cartas = [
    "../Img/Trunks.png", "../Img/gohan.png", "../Img/goku.png", "../Img/vegeta.png",
    "../Img/vegeta.png", "../Img/vegito.png", "../Img/gohan.png", "../Img/vegito.png",
    "../Img/goku.png", "../Img/picoro.png", "../Img/gogeta.png", "../Img/broly.png",
    "../Img/gogeta.png", "../Img/broly.png", "../Img/picoro.png", "../Img/Trunks.png"
];

const maxMovimientos = 15; // Máximo número de movimientos permitidos

let cartasDestapadas = [];
let aciertos = 0;
let movimientos = 0;
let intentos = 0;
let tiempoRestante = 30; // Tiempo en segundos
let timerInterval;
let juegoIniciado = false; // Variable para controlar si el juego ha comenzado

// Función para barajar el array de cartas
function barajarCartas() {
    cartas.sort(() => Math.random() - 0.5);
}

// Función para destapar una carta
function destapar(id) {
    if (!juegoIniciado || cartasDestapadas.length >= 2 || intentos >= maxMovimientos) {
        return; 
    }

    const imagen = document.getElementById(id.toString());

    // Verificar si la carta ya está destapada
    if (cartasDestapadas.length < 2 && imagen.getAttribute("data-destapada") !== "true") {
        imagen.src = cartas[id];
        imagen.setAttribute("data-destapada", "true");
        cartasDestapadas.push({ id, imagen });

        if (cartasDestapadas.length === 2) {
            movimientos++;
            document.getElementById("movimientos").textContent = `Movimientos: ${movimientos}`;

            if (cartasDestapadas[0].imagen.src === cartasDestapadas[1].imagen.src) {
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
}

// Función para ocultar las cartas destapadas
function ocultarCartas() {
    for (const carta of cartasDestapadas) {
        carta.imagen.src = "../Img/blank.png";
        carta.imagen.removeAttribute("data-destapada");
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
        juegoIniciado = true;

        // Ocultar el botón "Start" después de iniciado el juego
        document.getElementById("startButton").style.display = "none";

        document.getElementById("movimientos").textContent = "Movimientos: 0";
        document.getElementById("aciertos").textContent = "Aciertos: 0";
        document.getElementById("t-restante").textContent = `Tiempo restante: ${tiempoRestante} Segundos`;

        iniciarTemporizador();

        const imagenes = document.querySelectorAll(".cartas");
        for (let i = 0; i < imagenes.length; i++) {
            imagenes[i].addEventListener("click", () => destapar(i));
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    iniciarJuego();
});
