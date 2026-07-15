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
let currentTheme = 'dark';   // 'dark' | 'light' | 'terminal'
let currentLang  = 'fr';     // 'fr' | 'en'

// ===================================
// INTERNATIONALISATION (i18n)
// ===================================
const i18n = {
    fr: {
        subtitle:      'Quiz sur le Code - Révision Technique',
        welcome:       'Bienvenue !',
        welcomeDesc:   'Testez vos connaissances en développement avec ce quiz de 15 questions.',
        infoQuestions: '15 questions',
        infoTimer:     '15 secondes par question',
        infoScore:     'Score en temps réel',
        startBtn:      'Commencer le Quiz',
        quitBtn:       'Quitter',
        scoreLabel:    'Score',
        quizDone:      'Quiz Terminé !',
        yourScore:     'Votre Score',
        correct:       'Bonnes réponses',
        wrong:         'Mauvaises réponses',
        totalTime:     'Temps total',
        restart:       'Recommencer',
        backHome:      "Retour à l'accueil",
        shareLabel:    'Partagez votre score !',
        quitConfirm:   'Êtes-vous sûr de vouloir quitter le quiz ? Votre progression sera perdue.',
        questionOf:    'Question',
        feedbackCorrect:   'Bonne réponse !',
        feedbackWrong:     'Mauvaise réponse !',
        feedbackTimeout:   'Temps écoulé !',
        msgExcellent:  'Excellent ! Vous maîtrisez parfaitement le sujet !',
        msgGood:       'Très bien ! Vous avez de bonnes connaissances !',
        msgAverage:    'Pas mal ! Continuez à vous entraîner !',
        msgPoor:       'Courage ! Révisez et réessayez !',
        shareText:     "J'ai obtenu",
        shareText2:    'au Dev Trivia Quiz !',
        themeLabels:   { dark: 'Dark', light: 'Light', terminal: 'Terminal' },
    },
    en: {
        subtitle:      'Code Quiz - Technical Review',
        welcome:       'Welcome!',
        welcomeDesc:   'Test your development knowledge with this 15-question quiz.',
        infoQuestions: '15 questions',
        infoTimer:     '15 seconds per question',
        infoScore:     'Real-time score',
        startBtn:      'Start Quiz',
        quitBtn:       'Quit',
        scoreLabel:    'Score',
        quizDone:      'Quiz Finished!',
        yourScore:     'Your Score',
        correct:       'Correct answers',
        wrong:         'Wrong answers',
        totalTime:     'Total time',
        restart:       'Restart',
        backHome:      'Back to home',
        shareLabel:    'Share your score!',
        quitConfirm:   'Are you sure you want to quit? Your progress will be lost.',
        questionOf:    'Question',
        feedbackCorrect:   'Correct answer!',
        feedbackWrong:     'Wrong answer!',
        feedbackTimeout:   'Time\'s up!',
        msgExcellent:  'Excellent! You have mastered this topic!',
        msgGood:       'Well done! You have good knowledge!',
        msgAverage:    'Not bad! Keep practising!',
        msgPoor:       'Keep it up! Study and try again!',
        shareText:     'I scored',
        shareText2:    'on Dev Trivia Quiz!',
        themeLabels:   { dark: 'Dark', light: 'Light', terminal: 'Terminal' },
    }
};

// Questions en anglais
const questionsEN = [
    { question: "Which language is mainly used to style web pages?", options: ["HTML", "CSS", "JavaScript", "Python"], answer: 1 },
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: 0 },
    { question: "Which HTML tag is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1 },
    { question: "In JavaScript, which method displays a message in the console?", options: ["print()", "console.log()", "alert()", "display()"], answer: 1 },
    { question: "Which symbol is used for single-line comments in JavaScript?", options: ["//", "/* */", "#", "<!--"], answer: 0 },
    { question: "Which CSS property changes the text color?", options: ["text-color", "font-color", "color", "text-style"], answer: 2 },
    { question: "What does the acronym API stand for?", options: ["Application Programming Interface", "Advanced Programming Integration", "Automated Program Interaction", "Application Process Integration"], answer: 0 },
    { question: "What is the result of '2' + 2 in JavaScript?", options: ["4", "22", "NaN", "Error"], answer: 1 },
    { question: "Which Git command creates a local copy of a remote repository?", options: ["git copy", "git clone", "git download", "git pull"], answer: 1 },
    { question: "In CSS, which unit is relative to the parent element's font size?", options: ["px", "em", "pt", "cm"], answer: 1 },
    { question: "Which JavaScript keyword declares a variable that cannot be reassigned?", options: ["var", "let", "const", "static"], answer: 2 },
    { question: "Which HTML5 tag defines a navigation section?", options: ["<navigation>", "<nav>", "<menu>", "<navbar>"], answer: 1 },
    { question: "Which JavaScript framework was developed by Facebook?", options: ["Angular", "Vue.js", "React", "Svelte"], answer: 2 },
    { question: "In programming, what does DRY stand for?", options: ["Don't Repeat Yourself", "Do Remember Yesterday", "Data Requires Yield", "Debug Run Yearly"], answer: 0 },
    { question: "Which JavaScript method adds an element to the end of an array?", options: ["add()", "append()", "push()", "insert()"], answer: 2 },
    { question: "Which protocol secures web communications?", options: ["HTTP", "HTTPS", "FTP", "SSH"], answer: 1 },
    { question: "In CSS, which property creates space inside an element?", options: ["margin", "padding", "border", "spacing"], answer: 1 },
    { question: "What type of database is MongoDB?", options: ["SQL", "NoSQL", "GraphQL", "NewSQL"], answer: 1 },
    { question: "Which Git command shows the commit history?", options: ["git history", "git log", "git commits", "git show"], answer: 1 },
    { question: "In JavaScript, which function executes code after a delay?", options: ["delay()", "wait()", "setTimeout()", "pause()"], answer: 2 },
    { question: "Which CSS selector targets an element with id 'header'?", options: [".header", "#header", "*header", "header"], answer: 1 },
    { question: "What does JSON stand for?", options: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Online Network", "Java Syntax Object Name"], answer: 0 },
    { question: "Which HTML tag inserts an image?", options: ["<image>", "<img>", "<picture>", "<src>"], answer: 1 },
    { question: "In JavaScript, which operator checks strict equality (value and type)?", options: ["==", "===", "=", "!="], answer: 1 },
    { question: "What is the default port for HTTP?", options: ["443", "8080", "80", "3000"], answer: 2 },
    { question: "Which JavaScript method removes the last element of an array?", options: ["delete()", "remove()", "pop()", "shift()"], answer: 2 },
    { question: "In CSS, which property changes the display order of flex items?", options: ["flex-order", "order", "z-index", "position"], answer: 1 },
    { question: "Which keyword creates a class in JavaScript ES6?", options: ["function", "class", "object", "constructor"], answer: 1 },
    { question: "Which CSS property makes an element invisible but keeps its space?", options: ["display: none", "visibility: hidden", "opacity: 0", "hidden: true"], answer: 1 },
    { question: "In JavaScript, which method converts an array to a string?", options: ["toString()", "join()", "concat()", "stringify()"], answer: 1 }
];

function t(key) {
    return i18n[currentLang][key] || key;
}

function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    document.documentElement.lang = currentLang;
}

function getActiveQuestions() {
    return currentLang === 'en' ? questionsEN : questions;
}

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
    
    // Sélectionner 15 questions aléatoires dans la langue active
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
    if (confirm(t('quitConfirm'))) {
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
    const pool = getActiveQuestions();
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
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
    questionCounter.textContent = `${t('questionOf')} ${currentQuestionIndex + 1}/${selectedQuestions.length}`;
    
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
        feedbackText.innerHTML = `<span class="feedback-icon feedback-icon--correct">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><polyline points="20 6 9 17 4 12"/></svg>
        </span> ${t('feedbackCorrect')}`;
    } else {
        feedbackElement.classList.add('incorrect');
        feedbackElement.classList.remove('correct');
        feedbackText.innerHTML = `<span class="feedback-icon feedback-icon--wrong">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </span> ${t('feedbackWrong')}`;
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
    feedbackText.innerHTML = `<span class="feedback-icon feedback-icon--timeout">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    </span> ${t('feedbackTimeout')}`;
    
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
    
    const svgTrophy = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4a2 2 0 0 1-2-2V5h4"/><path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/><path d="M12 17v4"/><path d="M8 21h8"/><path d="M6 5h12v7a6 6 0 0 1-12 0V5z"/></svg>`;
    const svgThumb  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`;
    const svgBook   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
    const svgFist   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11.5V9a2 2 0 0 0-2-2 2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v10c0 2.21 1.79 4 4 4h4a6 6 0 0 0 6-6v-2a2 2 0 0 0-2-2z"/><path d="M14 7V5"/><path d="M10 7V5"/><path d="M6 13v-1a2 2 0 0 1 2-2"/></svg>`;

    if (percentage >= 90) {
        message = t('msgExcellent');
        messageClass = 'excellent';
        icon = svgTrophy;
    } else if (percentage >= 70) {
        message = t('msgGood');
        messageClass = 'good';
        icon = svgThumb;
    } else if (percentage >= 50) {
        message = t('msgAverage');
        messageClass = 'average';
        icon = svgBook;
    } else {
        message = t('msgPoor');
        messageClass = 'poor';
        icon = svgFist;
    }
    
    performanceMessageElement.textContent = message;
    performanceMessageElement.className = `performance-message ${messageClass}`;
    resultsIconElement.innerHTML = icon;
    
    // Texte de partage
    shareTextElement.textContent = `${t('shareText')} ${correctAnswers}/${totalQuestions} (${percentage}%) ${t('shareText2')}`;
    
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

// Applique les icônes et classes du thème courant
function applyThemeUI() {
    const moon     = document.querySelector('.icon-moon');
    const sun      = document.querySelector('.icon-sun');
    const terminal = document.querySelector('.icon-terminal');
    const label    = document.getElementById('theme-label');

    // Reset classes body
    document.body.classList.remove('light-mode', 'terminal-mode');

    moon.style.display     = 'none';
    sun.style.display      = 'none';
    terminal.style.display = 'none';

    if (currentTheme === 'dark') {
        moon.style.display = 'block';
        if (label) label.textContent = t('themeLabels').dark;
    } else if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        sun.style.display = 'block';
        if (label) label.textContent = t('themeLabels').light;
    } else {
        document.body.classList.add('terminal-mode');
        terminal.style.display = 'block';
        if (label) label.textContent = t('themeLabels').terminal;
    }

    localStorage.setItem('theme', currentTheme);
}

// Cycle Dark → Light → Terminal → Dark
function cycleTheme() {
    const order = ['dark', 'light', 'terminal'];
    const idx = order.indexOf(currentTheme);
    currentTheme = order[(idx + 1) % order.length];
    applyThemeUI();
}

// Toggle Son
function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    const soundToggle = document.querySelector('.sound-toggle');
    const on  = soundToggle.querySelector('.icon-sound-on');
    const off = soundToggle.querySelector('.icon-sound-off');
    
    if (isSoundEnabled) {
        soundToggle.classList.remove('muted');
        on.style.display  = 'block';
        off.style.display = 'none';
    } else {
        soundToggle.classList.add('muted');
        on.style.display  = 'none';
        off.style.display = 'block';
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

// Toggle langue FR ↔ EN
function toggleLang() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';

    // Mettre à jour le bouton langue (affiche la langue vers laquelle on peut basculer)
    const label = document.getElementById('lang-label');
    if (label) label.textContent = currentLang === 'fr' ? 'EN' : 'FR';

    // Traduire tous les textes statiques de l'UI
    applyI18n();

    // Mettre à jour le label du thème
    const themeLabel = document.getElementById('theme-label');
    if (themeLabel) themeLabel.textContent = t('themeLabels')[currentTheme];

    // Si le quiz est en cours d'écran actif, recharger les questions dans la nouvelle langue
    const quizActive = quizScreen.classList.contains('active');
    const startActive = startScreen.classList.contains('active');

    if (quizActive) {
        // Recharger les questions dans la nouvelle langue depuis le début
        stopTimer();
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        quizStartTime = Date.now();
        selectedQuestions = getRandomQuestions(15);
        currentScoreElement.textContent = score;
        totalQuestionsElement.textContent = selectedQuestions.length;
        loadQuestion();
    }

    // Sur l'écran résultats, juste mettre à jour les textes dynamiques déjà affichés
    const resultsActive = resultsScreen.classList.contains('active');
    if (resultsActive) {
        // Retraduit le message de performance en relisant le pourcentage affiché
        const pct = parseInt(scorePercentageElement.textContent);
        let msgKey = pct >= 90 ? 'msgExcellent' : pct >= 70 ? 'msgGood' : pct >= 50 ? 'msgAverage' : 'msgPoor';
        performanceMessageElement.textContent = t(msgKey);
        // Retraduit les labels de stats déjà générés dynamiquement
        const share = shareTextElement.textContent;
        // Reconstruit le texte de partage
        const correct = parseInt(correctAnswersElement.textContent);
        const total   = parseInt(totalQuestionsElement.textContent);
        shareTextElement.textContent = `${t('shareText')} ${correct}/${total} (${pct}%) ${t('shareText2')}`;
    }

    localStorage.setItem('lang', currentLang);
}

// Charger les préférences
function loadPreferences() {
    const savedTheme = localStorage.getItem('theme');
    const savedSound = localStorage.getItem('soundEnabled');
    const savedLang  = localStorage.getItem('lang');

    if (savedTheme && ['dark','light','terminal'].includes(savedTheme)) {
        currentTheme = savedTheme;
    }
    applyThemeUI();

    if (savedSound === 'false') {
        isSoundEnabled = false;
        const soundToggle = document.querySelector('.sound-toggle');
        soundToggle.classList.add('muted');
        const on  = soundToggle.querySelector('.icon-sound-on');
        const off = soundToggle.querySelector('.icon-sound-off');
        if (on)  on.style.display  = 'none';
        if (off) off.style.display = 'block';
    }

    if (savedLang && ['fr','en'].includes(savedLang)) {
        currentLang = savedLang;
        const label = document.getElementById('lang-label');
        if (label) label.textContent = currentLang === 'fr' ? 'EN' : 'FR';
        applyI18n();
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
