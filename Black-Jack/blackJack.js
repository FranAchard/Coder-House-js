const suits = ["Corazones", "Diamantes", "Tréboles", "Espadas"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jota", "Reina", "Rey", "As"];
const deck = [];

const playerHand = [];
const dealerHand = [];
let playerScore = 0;
let dealerScore = 0;

function createDeck() {
    for (const suit of suits) {
        for (const value of values) {
            const card = { suit, value };
            deck.push(card);
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealInitialCards() {
    for (let i = 0; i < 2; i++) {
        playerHand.push(deck.pop());
        dealerHand.push(deck.pop());
    }

    updateUI();
}

function calculateHandScore(hand) {
    let score = 0;
    let hasAce = false;

    for (const card of hand) {
        if (card.value === "As") {
            hasAce = true;
        }
        const cardValue = isNaN(card.value) ? 10 : parseInt(card.value);
        score += cardValue;
    }

    if (hasAce && score + 10 <= 21) {
        score += 10;
    }

    return score;
}

function hit() {
    playerHand.push(deck.pop());
    const playerHandScore = calculateHandScore(playerHand);
    if (playerHandScore > 21) {
        endGame();
    }
    updateUI();
}

function stand() {
    while (calculateHandScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }

    endGame();
}
function endGame() {
    const playerHandScore = calculateHandScore(playerHand);
    const dealerHandScore = calculateHandScore(dealerHand);

    const resetButton = document.getElementById("reset-button");
    const dealButton = document.getElementById("deal-button");
    const hitButton = document.getElementById("hit-button");
    const standButton = document.getElementById("stand-button");

    if (playerHandScore > 21 || (dealerHandScore <= 21 && dealerHandScore > playerHandScore)) {
        alert("Perdiste. ¡Inténtalo de nuevo!");
        resetButton.style.display = "block";

        dealButton.style.display = "none";
        hitButton.style.display = "none";
        standButton.style.display = "none";
    } else if (dealerHandScore > 21 || playerHandScore > dealerHandScore) {
        alert("¡Ganaste! ¡Felicidades!");
    } else {
        alert("Es un empate. ¡Nadie gana!");
    }

    updateUI();
}

function updateUI() {
    const playerScoreElement = document.getElementById("player-score");
    const dealerScoreElement = document.getElementById("dealer-score");

    playerScoreElement.textContent = `Puntuación: ${calculateHandScore(playerHand)}`;
    dealerScoreElement.textContent = `Puntuación: ${calculateHandScore(dealerHand)}`;
}

function resetGame() {
    deck.length = 0;
    playerHand.length = 0;
    dealerHand.length = 0;
    playerScore = 0;
    dealerScore = 0;

    createDeck();
    shuffleDeck();
    updateUI();

    const dealButton = document.getElementById("deal-button");
    const hitButton = document.getElementById("hit-button");
    const standButton = document.getElementById("stand-button");
    dealButton.style.display = "block";
    hitButton.style.display = "block";
    standButton.style.display = "block";

    const resetButton = document.getElementById("reset-button");
    resetButton.style.display = "none";
}


const resetButton = document.getElementById("reset-button");
const dealButton = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");

dealButton.addEventListener("click", dealInitialCards);
hitButton.addEventListener("click", hit);
standButton.addEventListener("click", stand);
resetButton.addEventListener("click", resetGame);

createDeck();
shuffleDeck();
