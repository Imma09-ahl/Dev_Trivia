// ===================================
// QUESTIONS DEV TRIVIA
// ===================================
// Format: { question: "...", options: ["A", "B", "C", "D"], answer: index }

const questions = [
    {
        question: "Quel langage est principalement utilisé pour styliser les pages web ?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: 1
    },
    {
        question: "Que signifie HTML ?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        answer: 0
    },
    {
        question: "Quelle balise HTML est utilisée pour créer un lien hypertexte ?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
    },
    {
        question: "En JavaScript, quelle méthode permet d'afficher un message dans la console ?",
        options: ["print()", "console.log()", "alert()", "display()"],
        answer: 1
    },
    {
        question: "Quel symbole est utilisé pour les commentaires sur une seule ligne en JavaScript ?",
        options: ["//", "/* */", "#", "<!--"],
        answer: 0
    },
    {
        question: "Quelle propriété CSS permet de changer la couleur du texte ?",
        options: ["text-color", "font-color", "color", "text-style"],
        answer: 2
    },
    {
        question: "Que signifie l'acronyme API ?",
        options: [
            "Application Programming Interface",
            "Advanced Programming Integration",
            "Automated Program Interaction",
            "Application Process Integration"
        ],
        answer: 0
    },
    {
        question: "Quel est le résultat de '2' + 2 en JavaScript ?",
        options: ["4", "22", "NaN", "Error"],
        answer: 1
    },
    {
        question: "Quelle commande Git permet de créer une copie locale d'un dépôt distant ?",
        options: ["git copy", "git clone", "git download", "git pull"],
        answer: 1
    },
    {
        question: "En CSS, quelle unité est relative à la taille de la police de l'élément parent ?",
        options: ["px", "em", "pt", "cm"],
        answer: 1
    },
    {
        question: "Quel mot-clé JavaScript déclare une variable qui ne peut pas être réassignée ?",
        options: ["var", "let", "const", "static"],
        answer: 2
    },
    {
        question: "Quelle balise HTML5 est utilisée pour définir une section de navigation ?",
        options: ["<navigation>", "<nav>", "<menu>", "<navbar>"],
        answer: 1
    },
    {
        question: "Quel framework JavaScript est développé par Facebook ?",
        options: ["Angular", "Vue.js", "React", "Svelte"],
        answer: 2
    },
    {
        question: "En programmation, que signifie DRY ?",
        options: [
            "Don't Repeat Yourself",
            "Do Remember Yesterday",
            "Data Requires Yield",
            "Debug Run Yearly"
        ],
        answer: 0
    },
    {
        question: "Quelle méthode JavaScript permet d'ajouter un élément à la fin d'un tableau ?",
        options: ["add()", "append()", "push()", "insert()"],
        answer: 2
    },
    {
        question: "Quel protocole est utilisé pour sécuriser les communications sur le web ?",
        options: ["HTTP", "HTTPS", "FTP", "SSH"],
        answer: 1
    },
    {
        question: "En CSS, quelle propriété permet de créer un espace à l'intérieur d'un élément ?",
        options: ["margin", "padding", "border", "spacing"],
        answer: 1
    },
    {
        question: "Quel type de base de données est MongoDB ?",
        options: ["SQL", "NoSQL", "GraphQL", "NewSQL"],
        answer: 1
    },
    {
        question: "Quelle commande Git permet de voir l'historique des commits ?",
        options: ["git history", "git log", "git commits", "git show"],
        answer: 1
    },
    {
        question: "En JavaScript, quelle fonction permet d'exécuter du code après un délai ?",
        options: ["delay()", "wait()", "setTimeout()", "pause()"],
        answer: 2
    },
    {
        question: "Quel sélecteur CSS cible un élément avec l'id 'header' ?",
        options: [".header", "#header", "*header", "header"],
        answer: 1
    },
    {
        question: "Que signifie JSON ?",
        options: [
            "JavaScript Object Notation",
            "Java Standard Object Notation",
            "JavaScript Online Network",
            "Java Syntax Object Name"
        ],
        answer: 0
    },
    {
        question: "Quelle balise HTML est utilisée pour insérer une image ?",
        options: ["<image>", "<img>", "<picture>", "<src>"],
        answer: 1
    },
    {
        question: "En JavaScript, quel opérateur vérifie l'égalité stricte (valeur et type) ?",
        options: ["==", "===", "=", "!="],
        answer: 1
    },
    {
        question: "Quel est le port par défaut pour HTTP ?",
        options: ["443", "8080", "80", "3000"],
        answer: 2
    },
    {
        question: "Quelle méthode JavaScript permet de supprimer le dernier élément d'un tableau ?",
        options: ["delete()", "remove()", "pop()", "shift()"],
        answer: 2
    },
    {
        question: "En CSS, quelle propriété permet de changer l'ordre d'affichage des éléments flex ?",
        options: ["flex-order", "order", "z-index", "position"],
        answer: 1
    },
    {
        question: "Quel mot-clé permet de créer une classe en JavaScript ES6 ?",
        options: ["function", "class", "object", "constructor"],
        answer: 1
    },
    {
        question: "Quelle propriété CSS permet de rendre un élément invisible mais garde son espace ?",
        options: ["display: none", "visibility: hidden", "opacity: 0", "hidden: true"],
        answer: 1
    },
    {
        question: "En JavaScript, quelle méthode transforme un tableau en chaîne de caractères ?",
        options: ["toString()", "join()", "concat()", "stringify()"],
        answer: 1
    }
];
