function startCarousel() {
    let activeImage = 0;
    const images = document.querySelectorAll("#carousel img");
  
    function cycleImages() {
      if (!images[activeImage]) {
        // If the active image is undefined, stop the interval and return
        clearInterval(intervalId);
        return;
      }
      //Loops the carousel
      images[activeImage].classList.remove("active");
      activeImage = (activeImage + 1) % images.length;
      images[activeImage].classList.add("active");
    }
    
    let intervalId = setInterval(cycleImages, 3000);
  }
  
  // Function to check for error in query parameters and show an alert
  function checkForError() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('error')) {
      alert("Validation failed. Name and description are required.");
    }
  }
  
  // Start the carousel and check for errors when the page loads
  window.onload = function() {
    startCarousel();
    checkForError();
  };
  
  //Handle Edit Requests
  function editItem(id, name, description) {
    // Populate the hidden field with the id
    document.getElementById("updateId").value = id;
  
    // Populate the form fields with the existing item's data
    document.getElementById("updateName").value = name;
    document.getElementById("updateDescription").value = description;
  
    // Update the form's action attribute
    document.getElementById("updateForm").action = `/item/update/${id}`;
  }
  
  async function deleteItem(id) {
    try {
      const response = await fetch(`http://localhost:3000/item/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Item deleted successfully');
        location.reload();
      } else {
        console.log('Failed to delete item');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }


// coin flip animation

document.addEventListener("DOMContentLoaded", function() {
  const coin = document.getElementById("coin");
  const resultText = document.getElementById("result");

  coin.addEventListener("click", function() {
      // Add the spinning animation
      coin.classList.add("spin");

      // Wait for the animation to finish before changing the image
      setTimeout(() => {
          const isHeads = Math.random() < 0.5; // 50% chance

          if (isHeads) {
              coin.src = "img/heads.png"; // Replace with actual image paths
              resultText.textContent = "Heads!";
          } else {
              coin.src = "img/tails.png";
              resultText.textContent = "Tails!";
          }

          // Remove animation class after the flip
          coin.classList.remove("spin");
      }, 300); // Halfway through the animation (to make the flip look natural)
  });
});


// Rock Paper Scissors

document.addEventListener('DOMContentLoaded', () => {
  const choices = document.querySelectorAll('.choice');
  const resultDisplay = document.getElementById('result');
  const scoreDisplay = document.getElementById('score');
  let playerScore = 0;
  let computerScore = 0;

  choices.forEach(choice => {
      choice.addEventListener('click', () => {
          const playerChoice = choice.id;
          const computerChoice = getComputerChoice();
          const result = getResult(userChoice, computerChoice);

          resultDisplay.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
          updateScore(result);
          scoreDisplay.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
      });
  });

  function getComputerChoice() {
      const choices = ['rock', 'paper', 'scissors'];
      const randomIndex = Math.floor(Math.random() * choices.length);
      return choices[randomIndex];
  }

  function getResult(userChoice, computerChoice) {
      if (playerChoice === computerChoice) {
          return 'It\'s a draw!';
      } else if (
          (playerChoice === 'rock' && computerChoice === 'scissors') ||
          (playerChoice === 'paper' && computerChoice === 'rock') ||
          (playerChoice === 'scissors' && computerChoice === 'paper')
      ) {
          playerScore++;
          return 'You win!';
      } else {
          computerScore++;
          return 'You lose!';
      }
  }

  function updateScore(result) {
      if (result === 'You win!') {
          playerScore++;
      } else if (result === 'You lose!') {
          computerScore++;
      }
  }
});