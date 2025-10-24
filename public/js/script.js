// ============List Management==============
// Show the Edit List modal and populate it with data
function editList(id, name, description) {
  document.getElementById("updateId").value = id;
  document.getElementById("updateName").value = name;
  // document.getElementById("updateDescription").value = description;
  document.getElementById("updateForm").action = `/lists/update/${id}`;
  const modal = new bootstrap.Modal(document.getElementById('editListModal'));
  modal.show();
}

// Delete a list by ID
async function deleteList(id) {
  if (confirm("Are you sure you want to delete this list?")) {
    try {
      const response = await fetch(`/lists/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to delete list.');
      }
    } catch (error) {
      alert('Error deleting list.');
    }
  }
}

// ============Item management============== 
 
// Function to populate the Edit Item modal with existing data
  function editItem(id, name, description) {
    // Set hidden input to item's ID
    document.getElementById("updateId").value = id;
  
    // Fill in the name and description fields with current data
    document.getElementById("updateName").value = name;
    document.getElementById("updateDescription").value = description;
  
    // Update the form's action so it submits to the correct update route
    document.getElementById("updateForm").action = `/items/update/${id}`;

    // Display the modal using Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('editItemModal'));
    modal.show();
  }
  
// Function to delete an item from the list
  async function deleteItem(id) {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        console.log('Deleting item with ID:', id); // Debugging log

        // Send DELETE request to server with item ID
        // Include listId for guest/session users. Read from the page if available.
        const listIdInput = document.querySelector('input[name="listId"]');
        const listId = listIdInput ? listIdInput.value : undefined;

        const response = await fetch(`/items/delete/${id}`, { // Ensure id is passed here
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify({ listId })
      });

        // Refresh the page if deletion was successful
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

// Function to randomly pick an item from the array/list
function pickRandomItem(items) {
  if (items.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

// Event listener for the "Pick Random Item" button click
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('pickButton');
  const result = document.getElementById('result');
  const listIdInput = document.querySelector('#randomForm input[name="listId"]');

  button.addEventListener('click', async () => {
    const listId = listIdInput.value;
    result.textContent = 'Picking...'; 

    try {
      const response = await fetch(`/items/api/random/${listId}`); 
      const data = await response.json();

      if (data.message) {
        result.textContent = data.message; 
      } else {
        result.textContent = data.description
          ? `${data.name}: ${data.description}`
          : data.name;
      }
    } catch (error) {
      result.textContent = 'Error fetching random item';
      console.error('Error fetching random item:', error);
    }
  });
});


// ================== Coin Flip ==================

// Add event listener to the coin image to handle coin flip logic
document.addEventListener("DOMContentLoaded", function () {
  const coin = document.getElementById("coin");
  const resultText = document.getElementById("result");

  if (coin && resultText) {
    coin.addEventListener("click", function () {
      // Start the coin flip animation
      coin.classList.add("spin");

      // Wait 300ms to simulate the flip duration and then show result
      setTimeout(() => {
        const isHeads = Math.random() < 0.5;

        if (isHeads) {
          coin.src = "img/maybe-coin.svg"; // Change to heads image
          resultText.textContent = "Heads!";
        } else {
          coin.src = "img/so-coin.svg"; // Change to tails image
          resultText.textContent = "Tails!";
        }

        // Remove the spin class to stop the animation after the result is shown
        coin.classList.remove("spin");
      }, 300);
    });
  }
});


// ================== Rock Paper Scissors ==================

// Handles click events for rock, paper, scissors choices and updates the game state
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

        // Show the result and update scores
        resultDisplay.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
        scoreDisplay.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
      });
    });
  }

  // Randomly select computer's choice
  function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * options.length)];
  }

  // Determine the result and update scores
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

// Handles picking a random number between 1 and user-defined maximum
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('maxNumber');
  const numberResult = document.getElementById('result');
  const button = document.getElementById('pickNumber');

  button.addEventListener('click', () => {
    const max = parseInt(input.value, 10);

    // Validate input
    if (isNaN(max) || max < 1) {
      result.textContent = 'Please enter a valid number (1 or greater).';
      return;
    }

    // Pick and display random number
    const randomNumber = Math.floor(Math.random() * max) + 1;
    result.textContent = `Number Selected: ${randomNumber}`;
  });
});
