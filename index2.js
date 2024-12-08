// Liste des questions du quiz
const questions = [
    {
        question: "Quel est la date ou on c'est mis ensemble ?",
        answers: ["06/06/2006", "29/04/2022", "18/05/2022", "23/05/2022"],
        correctAnswer: 3
    },
    {
        question: "Qu'est ce que j'aime le plus chez toi ?",
        answers: ["Tout !", "Ton humour", "Ton corp", "Ton comportement"],
        correctAnswer: 0
    },
    {
        question: "Qu'elle est ma couleur préférée ?",
        answers: ["Bleu", "Rouge", "Jaune", "Vert"],
        correctAnswer: 1
    },
    {
        question: "A quelle endroit sommes nous allez manger pour la première fois ensemble ?",
        answers: ["Makdo", "KFC", "Chez moi", "McDonald's"],
        correctAnswer: 3
    },
    {
        question: "Quel est le surnom que nous utilisons souvent l'un pour l'autre ?",
        answers: ["BB", "Mon coeur", "Ma vie", "Madame/Monsieur"],
        correctAnswer: 0
    },
    {
        question: "Combien de mois d'écart avons-nous ?",
        answers: ["4 mois", "3 mois", "6 mois", "On a le même âge"],
        correctAnswer: 2
    },
    {
        question: "Quel a été le premier film que nous avons vu ensemble au cinéma ?",
        answers: ["Je sais pas on a pas regardé le film", "Les Tuches 3", "Ratatouille", "Jumanji"],
        correctAnswer: 0
    },
    {
        question: "Qui a lacher le pet le plus bruyant de nous 2 ?",
        answers: ["Madame", "Monsieur", "Nous 2", "Personne"],
        correctAnswer: 2
    },
    {
        question: "Quel a été l'instrument que j'ai pratiqué étant plus jeune",
        answers: ["Piano", "Violon", "Guitare", "Batterie"],
        correctAnswer: 3
    },
    {
        question: "Quelle est ma passion ?",
        answers: ["Toi", "Les voitures", "Les sports de combat", "Tout !!"],
        correctAnswer: 3
    }
];

// Variables globales
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30; // Temps de compte à rebours pour chaque question

// Fonction pour afficher une question
function displayQuestion() {
    // Masquer le message final et le quiz container s'il est déjà affiché
    document.getElementById('finalMessage').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.question;
        for (let i = 0; i < 4; i++) {
            const answerButton = document.getElementById('answer' + (i + 1));
            answerButton.textContent = currentQuestion.answers[i];
            answerButton.style.backgroundColor = '#dcdcdc'; // Gris par défaut
            answerButton.disabled = false; // Réactiver les boutons
            answerButton.onclick = () => checkAnswer(i, answerButton);
        }

        // Réinitialisation du compte à rebours
        timeLeft = 30;
        document.getElementById('timer').textContent = timeLeft;
        clearInterval(timer); // S'assurer qu'il n'y a pas de multiples intervalles
        timer = setInterval(countdown, 1000);
    } else {
        // Fin du quiz, afficher le message final
        endQuiz();
    }
}

// Fonction de compte à rebours
function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
    } else {
        clearInterval(timer);
        alert('Temps écoulé ! Passons à la question suivante.');
        nextQuestion();
    }
}

// Vérification de la réponse
function checkAnswer(answerIndex, selectedButton) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const answerButtons = document.querySelectorAll('.answerButton');
    const resultContainer = document.getElementById('resultContainer');

    // Désactiver les réponses une fois qu'une réponse est sélectionnée
    answerButtons.forEach(button => button.disabled = true);

    // Arrêter le chrono
    clearInterval(timer);

    // Si la réponse est correcte
    if (answerIndex === correctAnswer) {
        selectedButton.style.backgroundColor = '#28a745'; // Vert
        resultContainer.style.backgroundColor = "#28a745"; // Vert pour le fond du message
        resultContainer.innerHTML = "<h2><i class='fas fa-check-circle'></i> Correct!</h2>"; // Icône validée
        score++;
    } else {
        selectedButton.style.backgroundColor = '#dc3545'; // Rouge
        resultContainer.style.backgroundColor = "#dc3545"; // Rouge pour le fond du message
        resultContainer.innerHTML = "<h2><i class='fas fa-times-circle'></i> Incorrect!</h2>"; // Icône de croix
        // Appliquer la couleur verte à la bonne réponse
        answerButtons[correctAnswer].style.backgroundColor = '#28a745'; // Vert
    }

    // Afficher le résultat
    resultContainer.style.display = 'block';

    // Attendre 3 secondes avant de passer à la question suivante
    setTimeout(nextQuestion, 3000); // Passer à la question suivante après 3 secondes
}

// Passer à la question suivante
function nextQuestion() {
    currentQuestionIndex++;
    clearInterval(timer); // Assurez-vous d'arrêter le précédent chrono
    document.getElementById('resultContainer').style.display = 'none'; // Cacher le résultat
    displayQuestion(); // Afficher la question suivante
}

// Fonction pour afficher la fin du quiz et évaluer le score
function endQuiz() {
    const finalMessageElement = document.getElementById('finalMessage');
    const restartButton = document.getElementById('restartButton');
    const accessButton = document.getElementById('accessButton'); // Bouton Accéder à la suite
    const countdownContainer = document.getElementById('countdownContainer'); // Un div pour le décompte

    // Masquer le container de quiz
    document.getElementById('quizContainer').style.display = 'none';

    // Si le score est supérieur ou égal à 8, afficher le bouton "Accéder à la suite"
    if (score >= 8) {
        finalMessageElement.textContent = `Bien joué ! Ta eu un score de ${score} sur ${questions.length}.`;
        finalMessageElement.style.backgroundColor = '#28a745'; // Fond vert
        finalMessageElement.style.color = 'white';  // Texte blanc
        restartButton.style.display = 'none';  // Cacher le bouton "Recommencer"
        accessButton.style.display = 'block';  // Afficher le bouton "Accéder à la suite"
        countdownContainer.style.display = 'none'; // Cacher le décompte
    } else {
        finalMessageElement.textContent = `Fuck, Ta eu ${score} sur ${questions.length}. Le quiz va recommencer dans...`;
        finalMessageElement.style.backgroundColor = '#dc3545'; // Fond rouge
        finalMessageElement.style.color = 'white';  // Texte blanc
        restartButton.style.display = 'none';  // Cacher le bouton "Recommencer"
        accessButton.style.display = 'none';  // Cacher le bouton "Accéder à la suite"
        countdownContainer.style.display = 'block'; // Afficher le décompte

        // Démarrer le décompte de 15 secondes avant de recommencer le quiz
        let timeLeft = 15;
        document.getElementById('countdown').textContent = timeLeft;
        const countdownTimer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                document.getElementById('countdown').textContent = timeLeft;
            } else {
                clearInterval(countdownTimer);
                restartQuiz(); // Recommencer le quiz après 15 secondes
            }
        }, 1000);
    }

    finalMessageElement.style.display = 'block';  // Afficher le message de fin
}

// Fonction pour recommencer le quiz
function restartQuiz() {
    // Réinitialiser les variables
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;

    // Masquer le message de fin et afficher à nouveau le quiz
    document.getElementById('finalMessage').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('restartButton').style.display = 'none';  // Cacher le bouton "Recommencer"
    document.getElementById('accessButton').style.display = 'none';  // Cacher le bouton "Accéder à la suite"
    document.getElementById('countdownContainer').style.display = 'none'; // Cacher le décompte

    // Réinitialiser le contenu du quiz et recommencer
    displayQuestion();
}

// Initialisation du quiz
window.onload = () => {
    displayQuestion();
};
