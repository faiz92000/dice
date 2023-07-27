// Déclaration des variables du jeu
var scores, roundScore, currentPlayer, isGamePlaying;

// Fonction pour initialiser le jeu
function initGame() {
  currentPlayer = 1;
  scores = [0, 0];
  roundScore = 0;
  isGamePlaying = true;

  // Mettre à jour l'affichage des scores
  updateScoresUI();
  updateRoundScoreUI(0);

  // Activer les boutons "Lancer le dé" et "Hold"
  document.getElementById('roll-dice').disabled = false;
  document.getElementById('hold').disabled = false;

  // Cacher le dé
  hideDice();
}

// Fonction pour changer de joueur
function changePlayer() {
  // Réinitialiser le score actuel
  roundScore = 0;
  updateRoundScoreUI(0);

  // Changer de joueur
  currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1);

  // Mettre à jour l'affichage des scores
  updateScoresUI();

  // Cacher le dé
  hideDice();
}

// Fonction pour mettre à jour l'affichage des scores
function updateScoresUI() {
  document.getElementById('player1-global').textContent = scores[0];
  document.getElementById('player2-global').textContent = scores[1];
}

// Fonction pour mettre à jour l'affichage du score actuel
function updateRoundScoreUI(score) {
  document.getElementById(`player${currentPlayer}-round`).textContent = score;
}

// Fonction pour cacher le dé
function hideDice() {
  document.querySelector('.dice').style.display = 'none';
}

// Fonction pour afficher le dé
function showDice() {
  document.querySelector('.dice').style.display = 'block';
}

// Fonction pour gérer le lancer du dé
function rollDice() {
  if (isGamePlaying) {
    // Générer un nombre aléatoire entre 1 et 6
    var diceValue = Math.floor(Math.random() * 6) + 1;

    // Afficher le résultat du dé
    var diceDOM = document.querySelector('.dice');
    diceDOM.textContent = diceValue;
    showDice();

    // Mettre à jour le score actuel
    roundScore += diceValue;
    updateRoundScoreUI(roundScore);

    // Vérifier si le joueur a gagné
    if (scores[currentPlayer - 1] + roundScore >= 100) {
      // Afficher une alerte pour annoncer la victoire du joueur
      alert('Joueur ' + currentPlayer + ' a gagné!');
      isGamePlaying = false;
      document.getElementById('roll-dice').disabled = true;
      document.getElementById('hold').disabled = true;
    }
  }
}

// Fonction pour gérer le bouton "Hold"
function hold() {
  if (isGamePlaying) {
    // Ajouter le score actuel au score global du joueur
    scores[currentPlayer - 1] += roundScore;

    // Mettre à jour l'affichage des scores
    updateScoresUI();

    // Changer de joueur
    changePlayer();
  }
}

// Fonction pour démarrer une nouvelle partie
document.getElementById('new-game').addEventListener('click', initGame);

// Fonction pour gérer le clic sur le bouton "Lancer le dé"
document.getElementById('roll-dice').addEventListener('click', rollDice);

// Fonction pour gérer le clic sur le bouton "Hold"
document.getElementById('hold').addEventListener('click', hold);

// Démarrer une nouvelle partie au chargement de la page
initGame();
