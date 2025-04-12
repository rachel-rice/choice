// ================== List Editor ==================
function editList(id, name, description) {
  const idInput = document.getElementById("listUpdateId");
  const nameInput = document.getElementById("listUpdateName");
  const descInput = document.getElementById("listUpdateDescription");
  const form = document.getElementById("listUpdateForm");

  if (container && idInput && nameInput && descInput && form) {
    container.style.display = "block";
    idInput.value = id;
    nameInput.value = name;
    descInput.value = description;
    form.action = `/lists/update/${id}`;
  }
}

// Delete List
async function deleteList(id) {
  if (!confirm("Are you sure you want to delete this list?")) return;

  try {
    console.log('Deleting list at URL:', `/lists/delete/${id}`);
    const response = await fetch(`/lists/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Remove the list item from the DOM without full reload
      const button = document.querySelector(`button[onclick*="deleteList('${id}'"]`);
      const listItem = button ? button.closest('li') : null;
      if (listItem) listItem.remove();
      console.log('List deleted and removed from DOM');
    } else {
      console.error('Failed to delete list, status:', response.status);
    }
  } catch (error) {
    console.error('Error deleting list:', error);
  }
}


// Handle Delete List Requests
// async function deleteList(id) {
//   if (confirm("Are you sure you want to delete this list?")) {
//     try {
//       const response = await fetch(`/lists/delete/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         console.log('List deleted successfully');
//         location.reload();
//       } else {
//         console.log('Failed to delete list');
//       }
//     } catch (error) {
//       console.log('An error occurred:', error);
//     }
//   }
// }


// ================== Coin Flip ==================
document.addEventListener("DOMContentLoaded", function () {
  const coin = document.getElementById("coin");
  const resultText = document.getElementById("result");

  if (coin && resultText) {
    coin.addEventListener("click", function () {
      coin.classList.add("spin");

      setTimeout(() => {
        const isHeads = Math.random() < 0.5;

        if (isHeads) {
          coin.src = "img/heads.png";
          resultText.textContent = "Heads!";
        } else {
          coin.src = "img/tails.png";
          resultText.textContent = "Tails!";
        }

        coin.classList.remove("spin");
      }, 300);
    });
  }
});


// coin flip animation

// document.addEventListener("DOMContentLoaded", function() {
//   const coin = document.getElementById("coin");
//   const resultText = document.getElementById("result");

//   coin.addEventListener("click", function() {
      // Add the spinning animation
      // coin.classList.add("spin");

      // Wait for the animation to finish before changing the image
      // setTimeout(() => {
      //     const isHeads = Math.random() < 0.5; // 50% chance

//           if (isHeads) {
//               coin.src = "img/heads.png"; // Replace with actual image paths
//               resultText.textContent = "Heads!";
//           } else {
//               coin.src = "img/tails.png";
//               resultText.textContent = "Tails!";
//           }

//           // Remove animation class after the flip
//           coin.classList.remove("spin");
//       }, 300); // Halfway through the animation (to make the flip look natural)
//   });
// });


// Rock Paper Scissors OLD

// document.addEventListener('DOMContentLoaded', () => {
//   const choices = document.querySelectorAll('.choice');
//   const resultDisplay = document.getElementById('result');
//   const scoreDisplay = document.getElementById('score');
//   let playerScore = 0;
//   let computerScore = 0;

//   choices.forEach(choice => {
//       choice.addEventListener('click', () => {
//           const playerChoice = choice.id;
//           const computerChoice = getComputerChoice();
//           const result = getResult(userChoice, computerChoice);

//           resultDisplay.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
//           updateScore(result);
//           scoreDisplay.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
//       });
//   });

//   function getComputerChoice() {
//       const choices = ['rock', 'paper', 'scissors'];
//       const randomIndex = Math.floor(Math.random() * choices.length);
//       return choices[randomIndex];
//   }

//   function getResult(userChoice, computerChoice) {
//       if (playerChoice === computerChoice) {
//           return 'It\'s a draw!';
//       } else if (
//           (playerChoice === 'rock' && computerChoice === 'scissors') ||
//           (playerChoice === 'paper' && computerChoice === 'rock') ||
//           (playerChoice === 'scissors' && computerChoice === 'paper')
//       ) {
//           playerScore++;
//           return 'You win!';
//       } else {
//           computerScore++;
//           return 'You lose!';
//       }
//   }

//   function updateScore(result) {
//       if (result === 'You win!') {
//           playerScore++;
//       } else if (result === 'You lose!') {
//           computerScore++;
//       }
//   }
// });


// ================== Rock Paper Scissors ==================
document.addEventListener("DOMContentLoaded", () => {
  const choices = document.querySelectorAll(".choice");
  const resultDisplay = document.getElementById("result");
  const scoreDisplay = document.getElementById("score");
  let playerScore = 0;
  let computerScore = 0;

  if (choices.length > 0 && resultDisplay && scoreDisplay) {
    choices.forEach((choice) => {
      choice.addEventListener("click", () => {
        const playerChoice = choice.id;
        const computerChoice = getComputerChoice();
        const result = getResult(playerChoice, computerChoice);

        resultDisplay.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
        scoreDisplay.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
      });
    });
  }

  function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * options.length)];
  }

  function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return "It's a draw!";
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      playerScore++;
      return "You win!";
    } else {
      computerScore++;
      return "You lose!";
    }
  }
});