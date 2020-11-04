const cards = document.querySelectorAll('.memory-card');
const score = document.querySelector('.score-counter');
const attempts = document.querySelector('.attempts-counter');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let scoreCount = 0;
let failedCount = 0;

function flipCard() {
    if (lockBoard) return;
    if(this === firstCard) return;

    this.firstElementChild.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();

    if (isMatch === true) {
        scoreCount++;
        score.innerHTML = scoreCount;
        // alert("Well done Padawan. You have found the sacred grub! ༼ つ ◕_◕ ༽つ");
    } else {
        failedCount++;
        attempts.innerHTML = failedCount;
    }

}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.firstElementChild.classList.remove('flip');
        secondCard.firstElementChild.classList.remove('flip');

        resetBoard();
    }, 800);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(function(card) {
    card.addEventListener('click', flipCard)
});