// Fonction pour vérifier le mot de passe et déverrouiller la page
document.getElementById('unlockButton').addEventListener('click', function() {
    const password = document.getElementById('passwordInput').value;
    const correctPassword = "230522";

    if (password === correctPassword) {
        // Si le mot de passe est correct, afficher la section du jeu
        alert('Mot de passe validé ! Maintenant, c\'est parti pour le jeu !');
        document.getElementById('gameSection').style.display = 'block';
    } else {
        alert('Mot de passe refusé. Essaie encore !');
    }
});

// Fonction pour rediriger vers le jeu
document.getElementById('gameButton').addEventListener('click', function() {
    // Redirection vers index2.html
    window.location.href = "intro.html";
});
