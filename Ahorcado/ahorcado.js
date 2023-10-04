const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');

const words = [
    "javascript",
    "programacion",
    "algoritmo",
    "computadora",
    "desarrollo",
    "tecnologia",
    "informatica",
    "internet",
    "software",
    "hardware",
    "aplicacion",
    "baseDatos",
    "seguridad",
    "ciberseguridad",
    "analisis",
    "matematicas",
    "fisica",
    "algebra",
    "teorema",
    "graficos",
    "teclado",
    "mouse",
    "pantalla",
    "memoria",
    "rendimiento",
    "redes",
    "tecnico",
    "ingenieria",
    "programador",
    "web",
    "codigo",
    "debugging",
    "compilador",
    "estructura",
    "renderizado",
    "interfaz",
    "interaccion",
    "componente",
    "protocolo",
    "algoritmo",
    "backend",
    "frontend",
    "optimizacion",
    "depuracion",
    "responsive",
    "framework",
    "version",
    "desarrollador"
];

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4, 2, 1, 1],
    [4, 3, 1, 2],
    [3, 5, 1, 1],
    [5, 5, 1, 1],
    [3, 3, 1, 1],
    [5, 3, 1, 1]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;
const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length) endGame();
}

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
}

const correctLetter = letter => {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if(hits === selectedWord.length) endGame();
}

const letterInput = letter => {
    if(selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    };
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
};

const drawHangMan = () => {
    ctx.canvas.width = 200;
    ctx.canvas.height = 250;
    ctx.scale(30, 30);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#C0B85B';
    ctx.fillRect(0, 7, 5, 2);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 5, 1);
    ctx.fillRect(6, 1, 1, 1);
}

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
};

startButton.addEventListener('click', startGame);