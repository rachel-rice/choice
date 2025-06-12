// Controller function to handle GET request to the rock-paper-scissors game
exports.getIndex = (req, res) => {
      // Render the rock.ejs view with initial null values
    res.render('rock.ejs', {
        playerChoice: null,
        computerChoice: null,
        result: null,
        error: null
    });
};

// Controller function to handle POST request when the player submits a choice
exports.playGame = (req, res) => {
    const playerChoice = req.body.choice; // Get player's choice from the form
    const computerChoice = getComputerChoice(); // Generate computer's random choice
    const result = getResult(playerChoice, computerChoice); // Determine the result

    // Render the same view with game results populated
    res.render('rock', {
        playerChoice,
        computerChoice,
        result,
        error: null
    });
};

// Helper function to randomly select rock, paper, or scissors for the computer
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Helper function to determine the game result based on player and computer choices
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