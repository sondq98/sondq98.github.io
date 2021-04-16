const quizData = [
    {
        question: 'Which is correct answer?',
        a: 'This answer',
        b: 'Not this',
        c: 'Not this',
        d: 'Not this',
        correct: 'a'
    },
    {
        question: 'Which is correct answer?',
        a: 'Not this',
        b: 'This answer',
        c: 'Not this',
        d: 'Not this',
        correct: 'b'
    },
    {
        question: 'Which is correct answer?',
        a: 'Not this',
        b: 'Not this',
        c: 'This answer',
        d: 'Not this',
        correct: 'c'
    },
    {
        question: 'Which is correct answer?',
        a: 'Not this',
        b: 'Not this',
        c: 'Not this',
        d: 'This answer',
        correct: 'd'
    },
]

var score = 0;

const questionQuiz = document.querySelector('.ques>h2');
const ansDiv = document.querySelector('.ans');
const a_ans = document.querySelector('#a_text');
const b_ans = document.querySelector('#b_text');
const c_ans = document.querySelector('#c_text');
const d_ans = document.querySelector('#d_text');
const answers = document.querySelectorAll('.answer');
let currentQuiz = 0;

function loadQuiz() {
    deSelectAns();
    const currentQuizData = quizData[currentQuiz];
    questionQuiz.innerText = currentQuizData.question;
    a_ans.innerText = currentQuizData.a;
    b_ans.innerText = currentQuizData.b;
    c_ans.innerText = currentQuizData.c;
    d_ans.innerText = currentQuizData.d;
}

function getSelected() {
    let result = undefined;
    answers.forEach(ans => {
        if (ans.checked) {
            result = ans.value;
        }
    })
    return result;
}

function deSelectAns() {
    answers.forEach(ans => {
        if (ans.checked) {
            ans.checked = false;
        }
    })
}

const submitBtn = document.querySelector('.submit');
submitBtn.addEventListener("click", () => {
    if (getSelected() == quizData[currentQuiz].correct) {
        score++;
    }

    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        questionQuiz.innerText = 'You has finishes';
        const scoreDirect = document.querySelector('.ans');
        scoreDirect.innerHTML = `<h1>Your score is ${score}/${quizData.length}</h1>`;
        scoreDirect.style.textAlign = 'center';
    }
});

loadQuiz();
