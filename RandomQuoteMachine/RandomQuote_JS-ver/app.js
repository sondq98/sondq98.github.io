const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';



const quoteData = getQuote();
console.log(quoteData)

function getQuote() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        })

}


function getRandomQuote(quotesData) {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ];
}

$(document).ready(function () {
    $('#author').textContent = 'abc'
})