// Quiz questions
let questions = {
    gk: [
        { q: "Largest ocean?", o: ["Indian", "Pacific", "Atlantic", "Arctic"], a: 1 },
        { q: "Capital of India?", o: ["Mumbai", "Delhi", "Chennai", "Kolkata"], a: 1 },
        { q: "National animal of India?", o: ["Lion", "Tiger", "Elephant", "Leopard"], a: 1 },
        { q: "Red Planet?", o: ["Earth", "Mars", "Jupiter", "Venus"], a: 1 },
        { q: "Currency of Japan?", o: ["Yen", "Won", "Dollar", "Euro"], a: 0 },
        { q: "Largest desert?", o: ["Sahara", "Gobi", "Kalahari", "Thar"], a: 0 },
        { q: "Fastest animal?", o: ["Lion", "Tiger", "Cheetah", "Horse"], a: 2 },
        { q: "Longest river?", o: ["Amazon", "Nile", "Ganga", "Yangtze"], a: 1 },
        { q: "Smallest country?", o: ["Monaco", "Vatican", "Malta", "Cyprus"], a: 1 },
        { q: "Highest mountain?", o: ["K2", "Everest", "Kangchenjunga", "Lhotse"], a: 1 }
    ],
    programming: [
        { q: "HTML stands for?", o: ["Hyper Text Markup Language", "High Tool ML", "Hyperlinks", "None"], a: 0 },
        { q: "CSS is used for?", o: ["Logic", "Styling", "Database", "Server"], a: 1 },
        { q: "JavaScript runs in?", o: ["Server", "Browser", "Database", "Compiler"], a: 1 },
        { q: "Which is not a programming language?", o: ["Python", "HTML", "Java", "C++"], a: 1 },
        { q: "PHP is mainly used for?", o: ["Frontend", "Backend", "OS", "Browser"], a: 1 },
        { q: "SQL is used for?", o: ["Styling", "Logic", "Database", "UI"], a: 2 },
        { q: "Bootstrap is a?", o: ["Framework", "Language", "DB", "OS"], a: 0 },
        { q: "Which is backend language?", o: ["HTML", "CSS", "JS", "PHP"], a: 3 },
        { q: "API stands for?", o: ["Application Programming Interface", "Applied Program", "Advanced API", "None"], a: 0 },
        { q: "JS variable keyword?", o: ["var", "int", "float", "define"], a: 0 }
    ],
    maths: [
        { q: "5 + 3 = ?", o: ["5", "7", "8", "9"], a: 2 },
        { q: "10 × 2 = ?", o: ["20", "10", "15", "30"], a: 0 },
        { q: "Square of 4?", o: ["8", "12", "16", "20"], a: 2 },
        { q: "15 ÷ 3 = ?", o: ["3", "4", "5", "6"], a: 2 },
        { q: "7 × 6 = ?", o: ["42", "36", "48", "40"], a: 0 },
        { q: "100 − 45 = ?", o: ["65", "55", "45", "75"], a: 0 },
        { q: "Cube of 3?", o: ["6", "9", "27", "81"], a: 2 },
        { q: "20% of 50?", o: ["5", "10", "15", "20"], a: 1 },
        { q: "12 + 18 = ?", o: ["28", "30", "32", "34"], a: 1 },
        { q: "9 × 9 = ?", o: ["72", "81", "90", "99"], a: 1 }
    ]
};

// Variables
let currentQuiz = [], index = 0, score = 0, timer, timeLeft = 10, selectedCategory = "";

// Elements
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const questionEl = document.getElementById("question");
const questionCountEl = document.getElementById("questionCount");
const optionBtns = document.querySelectorAll(".option");
const feedbackEl = document.getElementById("feedback");
const timerEl = document.getElementById("timer");
const quizTitle = document.getElementById("quizTitle");
const finalScoreEl = document.getElementById("finalScore");
const bestScoreEl = document.getElementById("bestScore");
const nextBtn = document.getElementById("nextBtn");
const scoreDisplay = document.getElementById("scoreDisplay");
const scoreToggle = document.getElementById("scoreToggle");
const themeBtn = document.getElementById("themeBtn");
const restartBtn = document.getElementById("restartBtn");
const backBtn = document.getElementById("backBtn");

// CATEGORY BUTTONS
document.querySelector(".gk-btn").addEventListener("click",()=>startQuiz("gk"));
document.querySelector(".programming-btn").addEventListener("click",()=>startQuiz("programming"));
document.querySelector(".maths-btn").addEventListener("click",()=>startQuiz("maths"));

// OPTION BUTTONS
optionBtns.forEach((btn,i)=>{
    btn.addEventListener("click",()=>checkAnswer(i));
});

// NEXT, RESTART, BACK
nextBtn.addEventListener("click",nextQuestion);
restartBtn.addEventListener("click",restartQuiz);
backBtn.addEventListener("click",goBack);

// THEME TOGGLE
themeBtn.addEventListener("click",toggleTheme);

// SCORE TOGGLE
scoreToggle.addEventListener("change",updateScore);

// Start Quiz
function startQuiz(type){
    selectedCategory = type;
    currentQuiz = [...questions[type]];
    index = 0;
    score = 0;

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    resultScreen.classList.add("hidden");

    quizTitle.innerText = type.toUpperCase() + " QUIZ";
    loadQuestion();
}

// Load question
function loadQuestion(){
    clearInterval(timer);
    timeLeft = 10;
    timerEl.innerText = `⏱️ Time: ${timeLeft}s`;
    feedbackEl.innerText = "";

    let q = currentQuiz[index];
    questionEl.innerText = q.q;
    questionCountEl.innerText = `Question ${index+1} of ${currentQuiz.length}`;

    optionBtns.forEach((btn,i)=>{
        btn.innerText = q.o[i];
        btn.disabled = false;
    });

    nextBtn.style.display = "none";
    updateScore();
    startTimer();
}

// Timer
function startTimer(){
    timer = setInterval(()=>{
        timeLeft--;
        timerEl.innerText = `⏱️ Time: ${timeLeft}s`;
        if(timeLeft<=0){
            clearInterval(timer);
            showCorrectAnswer(-2); // TIME'S UP
        }
    },1000);
}

// Check answer
function checkAnswer(choice){
    clearInterval(timer);
    showCorrectAnswer(choice);
}

// Show correct
function showCorrectAnswer(selected){
    const correctIndex = currentQuiz[index].a;
    const correctText = currentQuiz[index].o[correctIndex];

    if(selected === correctIndex){
        score++;
        feedbackEl.innerText = "✅ Correct!";
        feedbackEl.style.color = "green";
    } else if(selected === -2){
        feedbackEl.innerText = `⏰ Time's up! Correct answer: ${correctText}`;
        feedbackEl.style.color = "orange";
    } else {
        feedbackEl.innerText = `❌ Wrong! Correct answer: ${correctText}`;
        feedbackEl.style.color = "red";
    }

    optionBtns.forEach(btn=>btn.disabled = true);
    nextBtn.style.display = "block";
    updateScore();
}

// Next question
function nextQuestion(){
    index++;
    if(index < currentQuiz.length){
        loadQuestion();
    } else {
        endQuiz();
    }
}

// End quiz
function endQuiz(){
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScoreEl.innerText = `Score: ${score} / ${currentQuiz.length}`;

    let best = localStorage.getItem(selectedCategory) || 0;
    if(score>best){
        localStorage.setItem(selectedCategory,score);
        best = score;
    }
    bestScoreEl.innerText = `Best Score: ${best}`;
}

// Restart
function restartQuiz(){
    index = 0;
    score = 0;
    quizScreen.classList.remove("hidden");
    resultScreen.classList.add("hidden");
    loadQuestion();
}

// Back
function goBack(){
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}

// Theme
function toggleTheme(){
    document.body.classList.toggle("dark");
    let isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeBtn.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// Update score display
function updateScore(){
    if(scoreToggle.checked){
        scoreDisplay.innerText = `Score: ${score}`;
    } else {
        scoreDisplay.innerText = '';
    }
}

// Load saved theme
window.onload = ()=>{
    let savedTheme = localStorage.getItem("theme");
    if(savedTheme === "dark"){
        document.body.classList.add("dark");
        themeBtn.innerText = "☀️ Light Mode";
    }
};
