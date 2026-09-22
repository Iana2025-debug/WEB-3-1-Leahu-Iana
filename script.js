const MAX_WINS = 3;

const gameScore = {
  user: 0,
  computer: 0,
  ties: 0,
  rounds: 0,
  gameOver: false,

  reset() {
    this.user = 0;
    this.computer = 0;
    this.ties = 0;
    this.rounds = 0;
    this.gameOver = false;
  }
};

function getComputerChoice() {
  const choices = ['Piatra', 'Foarfeca', 'Hârtie'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function playRound(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    gameScore.ties++;
    return 'Egalitate';
  }

  if (
    (userChoice === 'Piatra' && computerChoice === 'Foarfeca') ||
    (userChoice === 'Foarfeca' && computerChoice === 'Hârtie') ||
    (userChoice === 'Hârtie' && computerChoice === 'Piatra')
  ) {
    gameScore.user++;
    return 'Am câștigat!';
  }

  gameScore.computer++;
  return 'Calculatorul a câștigat!';
}

function updateUI(userChoice, computerChoice, result) {
  document.getElementById('user-choice').textContent = userChoice;
  document.getElementById('computer-choice').textContent = computerChoice;
  document.getElementById('round-result').textContent = result;
  document.getElementById('score-display').textContent = `${gameScore.user} - ${gameScore.computer} (Egalități: ${gameScore.ties})`;
  document.getElementById('rounds-count').textContent = gameScore.rounds;
}

function checkGameLeader() {
  const statusElement = document.getElementById('leader-status');
  if (gameScore.user > gameScore.computer) {
    statusElement.textContent = 'Eu am avantaj!';
  } else if (gameScore.computer > gameScore.user) {
    statusElement.textContent = 'Calculatorul conduce acum.';
  } else {
    statusElement.textContent = 'Scorul este egal.';
  }
}

function checkFinalWinner() {
  const winnerElement = document.getElementById('final-winner');
  if (gameScore.user >= MAX_WINS) {
    winnerElement.textContent = ' Am câștigat!';
    gameScore.gameOver = true;
  } else if (gameScore.computer >= MAX_WINS) {
    winnerElement.textContent = ' Calculatorul a câștigat.';
    gameScore.gameOver = true;
  }
}

function handleGame(userChoice) {
  if (gameScore.gameOver) {
    alert('Jocul s-a terminat! Apasă "Începe din nou" pentru a relua.');
    return;
  }

  const computerChoice = getComputerChoice();
  const result = playRound(userChoice, computerChoice);
  gameScore.rounds++;

  const message = `Am ales ${userChoice}. Calculatorul a ales ${computerChoice}. ${result}\nScor curent: Eu ${gameScore.user} - ${gameScore.computer} Calculator.`;
  console.log(message);

  updateUI(userChoice, computerChoice, result);
  checkGameLeader();
  checkFinalWinner();

  if (gameScore.gameOver) {
    const finalMessage = `Scor final: Eu ${gameScore.user} - ${gameScore.computer} Calculator.`;
    console.log(finalMessage);
    alert(finalMessage);
  }
}

function resetGame() {
  gameScore.reset();
  document.getElementById('user-choice').textContent = '-';
  document.getElementById('computer-choice').textContent = '-';
  document.getElementById('round-result').textContent = '-';
  document.getElementById('score-display').textContent = '0 - 0 (Egalități: 0)';
  document.getElementById('rounds-count').textContent = '0';
  document.getElementById('leader-status').textContent = 'Jocul încă nu a început.';
  document.getElementById('final-winner').textContent = '';
}

document.getElementById('btn-piatra').addEventListener('click', () => handleGame('Piatra'));
document.getElementById('btn-foarfeca').addEventListener('click', () => handleGame('Foarfeca'));
document.getElementById('btn-hartie').addEventListener('click', () => handleGame('Hârtie'));
document.getElementById('reset-btn').addEventListener('click', resetGame);
