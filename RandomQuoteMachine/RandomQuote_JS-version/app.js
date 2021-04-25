// API
const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
// Color of text and backgroung will random
var colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

// Get quotes from API
// Struct :  { quotes: Array[] }
async function getQuotes() {
    const quotes = await (await fetch(url)).json();
    return quotes;
}

// Get random quote from quotes Array
// Struct :  { quote : String,
//             author : String
//           }
function getRandomQuote(quotesData) {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ];
}

// Get random color for text and background
function getRandomColor() {
    const length = colors.length;
    let randomIndex = Math.floor(Math.random() * length);
    return colors[randomIndex];
}

function changeTextColor(color) {
    const textElements = document.querySelectorAll('.change-text-color')
    textElements.forEach(element => {
        element.style.color = color;
    })
}

function changeBackgroundColor(color) {
    const backgroundElements = document.querySelectorAll('.change-background-color')
    backgroundElements.forEach(element => {
        element.style.backgroundColor = color;
    })
}

// render new quote text and new author When click to New Quote button
function render(quoteObj) {
    const quoteText = document.querySelector('#text')
    const quoteAuthor = document.querySelector('#author')
    quoteText.innerHTML = quoteObj.quote;
    quoteAuthor.innerHTML = quoteObj.author;
}

//  onclick function for New Quote button
async function nextQuote(quotesData) {
    let newQuote = getRandomQuote(quotesData)
    let newColor = getRandomColor();
    changeBackgroundColor(newColor);
    changeTextColor('#fff');
    setTimeout(() => {
        render(newQuote);
        changeTextColor(newColor);
    }, 500)

}

// start function: load quotes from API, render random quote and apply newQuote func to New Quote Btn
async function start() {
    const quotesData = await getQuotes();
    nextQuote(quotesData);
    const newQuote = getRandomQuote(quotesData);
    document.querySelector('#new-quote').onclick = function () {
        nextQuote(quotesData);
    }
}

start();
