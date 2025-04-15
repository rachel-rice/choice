exports.getIndex = (req, res) => {
    res.render('rock.ejs', {
        playerChoice: null,
        computerChoice: null,
        result: null,
        error: null
    });
};

exports.playGame = (req, res) => {
    const playerChoice = req.body.choice;
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    res.render('rock', {
        playerChoice,
        computerChoice,
        result,
        error: null
    });
};

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}