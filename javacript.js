const MAX_ROUNDS = 5;
let roundNumber = 0;

let createText = (str, section, cssClass) => {
    const container = document.querySelector(section);

    const content = document.createElement('p');
    content.classList.add(cssClass);
    content.textContent = str;

    container.appendChild(content);
};

let hideButtons = () => {
    const btn = document.querySelectorAll('button');

    btn.forEach((button) => {
        button.setAttribute("hidden", true);
    });
};

let addResetButton = () => {
    const section = document.querySelector('#game-buttons');
    const playerWins = document.querySelector('#player-wins');
    const computerWins = document.querySelector('#computer-wins');

    const btn = document.createElement('button');
    btn.textContent = "Play again?";
    section.insertBefore(btn, section.firstChild);

    btn.addEventListener('click', () => {
        const num = document.querySelector('#game-number');
        num.textContent = `0`;
        playerWins.textContent = `0`;
        computerWins.textContent = `0`;

        const buttons = document.querySelectorAll('button');
        buttons.forEach((button) => {
            button.removeAttribute("hidden"); 
        });
        resetLayout();
        section.removeChild(btn);
    });
};


let incrementRound = () => {
    const num = document.querySelector('#game-number');

    roundNumber++;
    num.textContent = `${roundNumber.toString()}`;
};

let resetLayout = () => {
        const text = document.querySelectorAll('p');
        text.forEach((p) => {
            p.remove();
        });
};

/*HANDLE PLAYER SELECTION*/
const btn = document.querySelectorAll('button');

btn.forEach((button) => {
    button.addEventListener('click', () => {
        playRound(button.id, computerSelection());
        if (roundNumber === MAX_ROUNDS) {
            hideButtons();
            addResetButton();
            resetLayout();
            displayWinner();
            roundNumber = 0;
        }
    });
});

/*HANDLE COMPUTER RNG SELECTION*/
let getComputerChoice = () => Math.floor(Math.random() * 3);

let computerSelection = () => {
    switch (getComputerChoice()) {
        case 0: 
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
};

/*MAIN RPS FUNCTIONS*/
let playRound = (playerSelection, computerSelection) => {

    resetLayout();
    createText(`You chose: ${playerSelection}`, '#player-display', 'display-results');
    createText(`VS`, '#versus', 'versus-text');
    createText(`Computer chose: ${computerSelection}`, '#computer-display', 'display-results');
    
    selectWinner(playerSelection, computerSelection);

    incrementRound();
};

let selectWinner = (playerSelection, computerSelection) => {
    const playerWins = document.querySelector('#player-wins');
    const computerWins = document.querySelector('#computer-wins');

    if (playerSelection === computerSelection)
        return createText(`It's a tie! You both chose ${playerSelection}`, '#results', 'display-results');

    switch (playerSelection + "-" + computerSelection) {
        case ("rock-paper"):
            createText("You lose! Paper beats rock", '#results', 'display-results');
            computerWins.textContent = `${Number(computerWins.textContent) + 1}`;
            break;
        case ("rock-scissors"):
            createText("You win! Rock beats scissors", '#results', 'display-results');
            playerWins.textContent = `${Number(playerWins.textContent) + 1}`;
            break;
        case ("paper-scissors"):
            createText("You lose! Scissors beats paper", '#results', 'display-results');
            computerWins.textContent = `${Number(computerWins.textContent) + 1}`; 
            break;
        case ("paper-rock"):
            createText("You win! Paper beats rock", '#results', 'display-results');
            playerWins.textContent = `${Number(playerWins.textContent) + 1}`;
            break;
        case ("scissors-rock"):
            createText("You lose! Rock beats scissors", '#results', 'display-results')
            computerWins.textContent = `${Number(computerWins.textContent) + 1}`;
            break;
        case ("scissors-paper"):
            createText("You win! Scissors beats paper", '#results', 'display-results');
            playerWins.textContent = `${Number(playerWins.textContent) + 1}`;
            break;
    }
}

let displayWinner = () => {
    let playerWins = document.querySelector('#player-wins');
    let computerWins = document.querySelector('#computer-wins')

    if (Number(playerWins.textContent) === Number(computerWins.textContent)) {
        createText("You have the same amount of wins!", '#results', 'final-results');
        createText("It's a tie!", '#results', 'final-results');
        return 0;
    }

    if (Number(playerWins.textContent) > Number(computerWins.textContent)){ 
        createText("You have more wins than the computer!", '#results', 'final-results');
        createText("You win!", '#results', 'final-results');
    } else {
        createText("The computer has more wins!", '#results', 'final-results');
        createText("You lose!", '#results', 'final-results');
    }
}