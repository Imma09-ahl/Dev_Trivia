// ===================================
// VARIABLES GLOBALES
// ===================================
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval = null;
let quizStartTime = null;
let quizEndTime = null;
let selectedQuestions = [];
let userAnswers = [];
let isSoundEnabled = true;
let currentTheme = 'dark';

// ===================================
// ÉLÉMENTS DOM
// ===================================
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const questionCounter = document.getElementById('question-counter');
const timerElement = document.getElementById('timer');
const timerProgress = document.getElementById('timer-progress');
const progressFill = document.getElementById('progress-fill');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');
const feedbackText = document.getElementById('feedback-text');
const currentScoreElement = document.getElementById('current-score');
const totalQuestionsElement = document.getElementById('total-questions');

const finalScoreElement = document.getElementById('final-score');
const scorePercentageElement = document.getElementById('score-percentage');
const performanceMessageElement = document.getElementById('performance-message');
const correctAnswersElement = document.getElementById('correct-answers');
const wrongAnswersElement = document.getElementById('wrong-answers');
const totalTimeElement = document.getElementById('total-time');
const resultsIconElement = document.getElementById('results-icon');
const shareTextElement = document.getElementById('share-text');

// ===================================
// FONCTIONS DE NAVIGATION
// ===================================
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function startQuiz() {
    // Réinitialiser les variables
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    quizStartTime = Date.now();
    
    // Sélectionner 15 questions aléatoires
    selectedQuestions = getRandomQuestions(15);
    
    // Mettre à jour l'affichage
    totalQuestionsElement.textContent = selectedQuestions.length;
    currentScoreElement.textContent = score;
    
    // Afficher l'écran du quiz
    showScreen(quizScreen);
    
    // Charger la première question
    loadQuestion();
}

function quitQuiz() {
    if (confirm('Êtes-vous sûr de vouloir quitter le quiz ? Votre progression sera perdue.')) {
        stopTimer();
        showScreen(startScreen);
    }
}

function restartQuiz() {
    showScreen(startScreen);
    setTimeout(() => startQuiz(), 300);
}

function backToHome() {
    showScreen(startScreen);
}

// ===================================
// GESTION DES QUESTIONS
// ===================================
function getRandomQuestions(count) {
    // Mélanger les questions et en prendre 'count'
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function loadQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        endQuiz();
        return;
    }
    
    const question = selectedQuestions[currentQuestionIndex];
    
    // Réinitialiser le feedback
    feedbackElement.classList.add('hidden');
    feedbackElement.classList.remove('correct', 'incorrect');
    
    // Mettre à jour le compteur de questions
    questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${selectedQuestions.length}`;
    
    // Mettre à jour la barre de progression
    const progress = ((currentQuestionIndex) / selectedQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Afficher la question
    questionText.textContent = question.question;
    
    // Afficher les options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    // Démarrer le timer
    startTimer();
}

function selectAnswer(selectedIndex) {
    // Arrêter le timer
    stopTimer();
    
    const question = selectedQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.answer;
    
    // Enregistrer la réponse
    userAnswers.push({
        question: question.question,
        selectedAnswer: question.options[selectedIndex],
        correctAnswer: question.options[question.answer],
        isCorrect: isCorrect
    });
    
    // Mettre à jour le score
    if (isCorrect) {
        score++;
        currentScoreElement.textContent = score;
    } else {
        // Jouer le son "Focus" pour mauvaise réponse
        playFocusSound();
    }
    
    // Désactiver tous les boutons
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach((btn, index) => {
        btn.classList.add('disabled');
        btn.onclick = null;
        
        // Marquer la bonne réponse
        if (index === question.answer) {
            btn.classList.add('correct');
        }
        
        // Marquer la mauvaise réponse si sélectionnée
        if (index === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Afficher le feedback
    showFeedback(isCorrect);
    
    // Passer à la question suivante après 2 secondes
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
}

function showFeedback(isCorrect) {
    feedbackElement.classList.remove('hidden');
    
    if (isCorrect) {
        feedbackElement.classList.add('correct');
        feedbackElement.classList.remove('incorrect');
        feedbackText.textContent = '✅ Bonne réponse !';
    } else {
        feedbackElement.classList.add('incorrect');
        feedbackElement.classList.remove('correct');
        feedbackText.textContent = '❌ Mauvaise réponse !';
    }
}

// ===================================
// GESTION DU TIMER
// ===================================
function startTimer() {
    timeLeft = 15;
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            handleTimeout();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    timerElement.textContent = timeLeft;
    
    // Mettre à jour le cercle de progression
    const circumference = 2 * Math.PI * 45; // rayon = 45
    const progress = (timeLeft / 15) * circumference;
    const offset = circumference - progress;
    
    if (timerProgress) {
        timerProgress.style.strokeDashoffset = offset;
        
        // Changer la couleur selon le temps restant
        timerProgress.classList.remove('warning', 'danger');
        if (timeLeft <= 5) {
            timerProgress.classList.add('danger');
        } else if (timeLeft <= 7) {
            timerProgress.classList.add('warning');
        }
    }
}

function handleTimeout() {
    stopTimer();
    
    const question = selectedQuestions[currentQuestionIndex];
    
    // Jouer le son "Focus" pour temps écoulé
    playFocusSound();
    
    // Enregistrer comme mauvaise réponse
    userAnswers.push({
        question: question.question,
        selectedAnswer: 'Temps écoulé',
        correctAnswer: question.options[question.answer],
        isCorrect: false
    });
    
    // Désactiver tous les boutons et montrer la bonne réponse
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach((btn, index) => {
        btn.classList.add('disabled');
        btn.onclick = null;
        
        if (index === question.answer) {
            btn.classList.add('correct');
        }
    });
    
    // Afficher le feedback
    feedbackElement.classList.remove('hidden');
    feedbackElement.classList.add('incorrect');
    feedbackElement.classList.remove('correct');
    feedbackText.textContent = '⏰ Temps écoulé !';
    
    // Passer à la question suivante
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
}

// ===================================
// FIN DU QUIZ
// ===================================
function endQuiz() {
    stopTimer();
    quizEndTime = Date.now();
    
    // Calculer le temps total
    const totalTimeSeconds = Math.floor((quizEndTime - quizStartTime) / 1000);
    const minutes = Math.floor(totalTimeSeconds / 60);
    const seconds = totalTimeSeconds % 60;
    
    // Calculer les statistiques
    const totalQuestions = selectedQuestions.length;
    const correctAnswers = score;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Afficher les résultats
    finalScoreElement.textContent = `${correctAnswers}/${totalQuestions}`;
    scorePercentageElement.textContent = `${percentage}%`;
    correctAnswersElement.textContent = correctAnswers;
    wrongAnswersElement.textContent = wrongAnswers;
    totalTimeElement.textContent = `${minutes}m ${seconds}s`;
    
    // Message de performance
    let message = '';
    let messageClass = '';
    let icon = '';
    
    if (percentage >= 90) {
        message = '🏆 Excellent ! Vous maîtrisez parfaitement le sujet !';
        messageClass = 'excellent';
        icon = '🏆';
    } else if (percentage >= 70) {
        message = '👍 Très bien ! Vous avez de bonnes connaissances !';
        messageClass = 'good';
        icon = '👍';
    } else if (percentage >= 50) {
        message = '📚 Pas mal ! Continuez à vous entraîner !';
        messageClass = 'average';
        icon = '📚';
    } else {
        message = '💪 Courage ! Révisez et réessayez !';
        messageClass = 'poor';
        icon = '💪';
    }
    
    performanceMessageElement.textContent = message;
    performanceMessageElement.className = `performance-message ${messageClass}`;
    resultsIconElement.textContent = icon;
    
    // Texte de partage
    shareTextElement.textContent = `J'ai obtenu ${correctAnswers}/${totalQuestions} (${percentage}%) au Dev Trivia Quiz ! 💻`;
    
    // Afficher l'écran des résultats
    showScreen(resultsScreen);
}

// ===================================
// FONCTIONS DE PARTAGE
// ===================================
function shareScore(platform) {
    const totalQuestions = selectedQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const text = `J'ai obtenu ${score}/${totalQuestions} (${percentage}%) au Dev Trivia Quiz ! 💻`;
    const url = window.location.href;
    
    let shareUrl = '';
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// ===================================
// INITIALISATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dev Trivia Quiz chargé avec succès !');
    console.log(`Nombre de questions disponibles : ${questions.length}`);
});

// Made with Bob

// ===================================
// FONCTIONS THÈME & SON & EFFETS
// ===================================

// Toggle Thème Clair/Sombre
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-mode');
    
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    
    localStorage.setItem('theme', currentTheme);
}

// Toggle Son
function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    const soundToggle = document.querySelector('.sound-toggle');
    
    if (isSoundEnabled) {
        soundToggle.classList.remove('muted');
        soundToggle.querySelector('.sound-icon').textContent = '🔊';
    } else {
        soundToggle.classList.add('muted');
        soundToggle.querySelector('.sound-icon').textContent = '🔇';
    }
    
    localStorage.setItem('soundEnabled', isSoundEnabled);
}

// Jouer le son "Focus"
function playFocusSound() {
    if (!isSoundEnabled) return;
    
    try {
        // Créer un son de notification avec Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Son de notification (beep)
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        
        // Utiliser Web Speech API pour dire "Focus" après le beep
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance('Focus');
            utterance.lang = 'en-US';
            utterance.rate = 1.2;
            utterance.pitch = 1.1;
            utterance.volume = 1;
            
            window.speechSynthesis.cancel(); // Annuler toute parole en cours
            window.speechSynthesis.speak(utterance);
        }, 200);
        
    } catch (error) {
        console.log('Erreur audio:', error);
        // Fallback: juste la voix
        const utterance = new SpeechSynthesisUtterance('Focus');
        utterance.lang = 'en-US';
        utterance.rate = 1.2;
        utterance.pitch = 1.1;
        utterance.volume = 1;
        
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }
}

// Créer les étincelles
function createSparkles() {
    const container = document.getElementById('sparkles');
    const sparkleCount = 50;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(sparkle);
    }
}

// Charger les préférences
function loadPreferences() {
    const savedTheme = localStorage.getItem('theme');
    const savedSound = localStorage.getItem('soundEnabled');
    
    if (savedTheme === 'light') {
        currentTheme = 'light';
        document.body.classList.add('light-mode');
        document.querySelector('.theme-icon').textContent = '☀️';
    }
    
    if (savedSound === 'false') {
        isSoundEnabled = false;
        const soundToggle = document.querySelector('.sound-toggle');
        soundToggle.classList.add('muted');
        soundToggle.querySelector('.sound-icon').textContent = '🔇';
    }
}

// ===================================
// INITIALISATION AU CHARGEMENT
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dev Trivia Quiz chargé avec succès !');
    console.log(`Nombre de questions disponibles : ${questions.length}`);
    
    // Charger les préférences
    loadPreferences();
    
    // Créer les étincelles
    createSparkles();
});
