// ============Random choice============== 
 
// Making changes to the items in the list
//Handle Edit Requests
  function editItem(id, name, description) {
    // Populate the hidden field with the id
    document.getElementById("updateId").value = id;
  
    // Populate the form fields with the existing item's data
    document.getElementById("updateName").value = name;
    document.getElementById("updateDescription").value = description;
  
    // Update the form's action attribute
    document.getElementById("updateForm").action = `/items/update/${id}`;

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('editItemModal'));
    modal.show();
  }
  
// Delete Item
  async function deleteItem(id) {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        console.log('Deleting item with ID:', id); // Debugging log
        const response = await fetch(`/items/delete/${id}`, { // Ensure id is passed here
          method: 'DELETE',
      });

        if (response.ok) {
          console.log('Item deleted successfully');
          location.reload();
        } else {
          console.error('Failed to delete item, status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
}

// Randomly pick an item from the list
function pickRandomItem(items) {
  if (items.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('pickButton');
  const result = document.getElementById('result');

  button.addEventListener('click', async () => {
    result.textContent = 'Picking...'; // show a quick message while loading

    try {
      const response = await fetch('/items/api/random'); // Fetch random item from server
      const data = await response.json();

      if (data.message) {
        result.textContent = data.message; // No items to pick
      } else {
        result.textContent = `${data.name}: ${data.description || 'No description'}`;
      }
    } catch (error) {
      result.textContent = 'Error fetching random item';
      console.error('Error fetching random item:', error);
    }
  });
});


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

// ================== Pick a Number ==================

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('maxNumber');
  const numberResult = document.getElementById('result');
  const button = document.getElementById('pickNumber');

  button.addEventListener('click', () => {
    const max = parseInt(input.value, 10);

    if (isNaN(max) || max < 1) {
      result.textContent = 'Please enter a valid number (1 or greater).';
      return;
    }

    const randomNumber = Math.floor(Math.random() * max) + 1;
    result.textContent = `Number Selected: ${randomNumber}`;
  });
});
