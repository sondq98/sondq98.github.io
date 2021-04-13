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

const questionQuiz = document.querySelector('.ques>h2');

const a_ans = document.querySelector('#a_text');
console.log(a_ans);
const b_ans = document.querySelector('#b_text');
const c_ans = document.querySelector('#c_text');
const d_ans = document.querySelector('#d_text');

let currentQuiz = 0;

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];

    questionQuiz.innerText = currentQuizData.question;
    a_ans.innerText = currentQuizData.a;
    b_ans.innerText = currentQuizData.b;
    c_ans.innerText = currentQuizData.c;
    d_ans.innerText = currentQuizData.d;

    currentQuiz++;
}

loadQuiz();
const submitBtn = document.querySelector('.submit');
submitBtn.addEventListener("click", loadQuiz);
