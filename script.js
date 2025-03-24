document.addEventListener('mousemove', (e) => {
    const quizBox = document.querySelector('.app');
    const quizRect = quizBox.getBoundingClientRect();

    if(
        e.clientX < quizRect.left ||
        e.clientX > quizRect.right ||
        e.clientY < quizRect.top ||
        e.clientY > quizRect.bottom
    ) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${e.pageX - 5}px`;
        sparkle.style.top = `${e.pageY - 5}px`;
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});
const questions = [
    {
        question: "Which is Tani's favourite animal?",
        answers: [
            { text: "Shark",correct: false},
            { text: "Cat",correct: true},
            { text: "Elephant",correct: false},
            { text: "Giraffe",correct: false},
        ]
    },
    {
        question: "What is Tani's favourite food?",
        answers: [
            { text: "pasta",correct: true},
            { text: "pizza",correct: false},
            { text: "pancakes",correct: false},
            { text: "paneer butter masala",correct: false},
        ]
    },
    {
        question: "When is Tani's Birthday?",
        answers: [
            { text: "22 feb",correct: false},
            { text: "23 feb",correct: false},
            { text: "25 feb",correct: true},
            { text: "24 feb",correct: false},
        ]
    },
    {
        question: "Which is Tani's favorite color?",
        answers: [
            { text: "purple",correct: false},
            { text: "blue",correct: true},
            { text: "pink",correct: false},
            { text: "black",correct: false},
        ]
    },
    {
        question: "Which of these is not Tani's hobby?",
        answers: [
            { text: "painting",correct: false},
            { text: "crocheting",correct: false},
            { text: "bedrotting",correct: false},
            { text: "basketball",correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score = 0;

function startQuiz(){
    currentQuestionIndex =0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion()
{
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    currentQuestion.answers.forEach((answer,index) => {
        const button = document.getElementById(`btn-${index}`);
        button.style.display = "block";
        button.textContent = answer.text;
        button.dataset.correct = answer.correct;
        button.disabled = false;
        button.classList.remove("correct","incorrect");
        button.addEventListener("click", selectAnswer);
    });
    for(let i = currentQuestion.answers.length;i<4;i++){
        document.getElementById(`btn-${i}`).style.display = "none";
    }
}

function resetState(){
    nextButton.style.display = "none";
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.style.display !== "none"){
         button.disabled = true;
         if(button.dataset.correct === "true"){
            button.classList.add("correct");
         }
        }
});
nextButton.style.display = "block";
}

function showScore(){
    resetState();
    for(let i =0;i<4;i++){
        document.getElementById(`btn-${i}`).style.display = "none";
    }
    questionElement.textContent = `you scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz()