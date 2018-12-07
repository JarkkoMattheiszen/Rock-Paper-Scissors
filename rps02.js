var scores, playerChoice, enemyChoice, previousChoices, choiceMemory;

newGame();

document.querySelector('.btn-rock').addEventListener('click', function() {
    if (gamePlaying) {
        playerChoice = 'rock';

        enemyPlays();
        updateMemory(playerChoice);
        drawChoices();
        processRound();
    }
});

document.querySelector('.btn-paper').addEventListener('click', function() {
    if (gamePlaying) {
        playerChoice = 'paper';

        enemyPlays();
        updateMemory(playerChoice);
        drawChoices();
        processRound();
    }
});

document.querySelector('.btn-scissors').addEventListener('click', function() {
    if (gamePlaying) {
        playerChoice = 'scissors';

        enemyPlays();
        updateMemory(playerChoice);
        drawChoices();
        processRound();
    }
});

document.querySelector('.btn-reset').addEventListener('click', newGame);

// Initialize a new game
function newGame() {
    scores = [0, 0];
    gamePlaying = true;
    playerChoice = 0;
    enemyChoice = 0;
    previousChoices = [];
    choiceMemory = new Map();

    document.querySelector('#player-0-score-box').style.display = 'none';
    document.querySelector('#player-1-score-box').style.display = 'none';
    document.querySelector('.title').style.display = 'block';
    document.querySelector('.intro').style.display = 'block';
    document.querySelector('#name-0').style.display = 'none';
    document.querySelector('#name-1').style.display = 'none';
    document.getElementById('player-0-weapon').style.display = 'none';
    document.getElementById('player-1-weapon').style.display = 'none';
    document.querySelector('#name-0').textContent = 'Player';
    document.querySelector('#name-1').textContent = 'Computer';
    document.getElementById('score-0').textContent = scores[0];
    document.getElementById('score-1').textContent = scores[1];
}

// Enemy makes a choice based on player patterns
function enemyPlays() {
    var guessRock = choiceMemory.get(previousChoices + 'r') || 0;
    var guessPaper = choiceMemory.get(previousChoices + 'p') || 0;
    var guessScissors = choiceMemory.get(previousChoices + 's') || 0;

    if (guessRock > guessPaper && guessRock > guessScissors) {
        enemyChoice = 'paper';
    } else if (guessPaper > guessRock && guessPaper > guessScissors) {
        enemyChoice = 'scissors';
    } else if (guessScissors > guessRock && guessScissors > guessPaper) {
        enemyChoice = 'rock';
    } else {
        enemyChoice = Math.floor(Math.random() * 3) + 1;

        if (enemyChoice === 1) {
            enemyChoice = 'rock';
        } else if (enemyChoice === 2) {
            enemyChoice = 'paper';
        } else {
            enemyChoice = 'scissors';
        }
    }
}

// Update the memory variables
function updateMemory(choice) {
    if (choice === 'rock') {
        previousChoices += 'r';
    } else if (choice === 'paper') {
        previousChoices += 'p';
    } else {
        previousChoices += 's';
    }

    if (previousChoices.length > 2 && choiceMemory.get(previousChoices) !== undefined) {
        choiceMemory.set(previousChoices, choiceMemory.get(previousChoices) + 1);
    } else if (previousChoices.length > 2) {
        choiceMemory.set(previousChoices, 1);
    }
    
    if (previousChoices.length > 2) previousChoices = previousChoices.substring(1);
}

// Draw the choices
function drawChoices() {
    document.querySelector('.title').style.display = 'none';
    document.querySelector('.intro').style.display = 'none';
    document.querySelector('#player-0-score-box').style.display = 'block';
    document.querySelector('#player-1-score-box').style.display = 'block';
    document.querySelector('#name-0').style.display = 'block';
    document.querySelector('#name-1').style.display = 'block';
    document.querySelector('.weapon0').src = playerChoice + '.png';
    document.querySelector('.weapon0').style.display = 'block';    
    document.querySelector('.weapon1').src = enemyChoice + '.png';
    document.querySelector('.weapon1').style.display = 'block';
}

// Process the played round
function processRound() {
    if (playerChoice === 'rock' && enemyChoice === 'rock') {
        // Tie, nothing changes
    } else if (playerChoice === 'rock' && enemyChoice === 'paper') {
        scores[1]++;
    } else if (playerChoice === 'rock' && enemyChoice === 'scissors') {
        scores[0]++;
    } else if (playerChoice === 'paper' && enemyChoice === 'paper') {
        // Tie
    } else if (playerChoice === 'paper' && enemyChoice === 'scissors') {
        scores[1]++;
    } else if (playerChoice === 'paper' && enemyChoice === 'rock') {
        scores[0]++;
    } else if (playerChoice === 'scissors' && enemyChoice === 'scissors') {
        // Tie
    } else if (playerChoice === 'scissors' && enemyChoice === 'rock') {
        scores[1]++;
    } else if (playerChoice === 'scissors' && enemyChoice === 'paper') {
        scores[0]++;
    }
    document.getElementById('score-0').textContent = scores[0];
    document.getElementById('score-1').textContent = scores[1];
}