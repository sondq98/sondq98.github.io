const dayText = document.querySelector('#days');
const hourText = document.querySelector('#hours');
const minText = document.querySelector('#mins');
const secText = document.querySelector('#secs');


const now = new Date();
let nextYear = now.getFullYear() + 1;
let nextNewYearEve = `1 Jan ${nextYear}`;
let newYearDate = new Date(nextNewYearEve);

function countDown() {
    const currentDate = new Date();

    let diffSeconds = Math.round((newYearDate - currentDate) / 1000);

    let days = Math.floor(diffSeconds / 3600 / 24);
    if (days < 10) {
        dayText.innerText = `0${days}`;
    } else {
        dayText.innerText = days;
    }

    let hours = Math.floor((diffSeconds - days * 86400) / 3600);
    if (hours < 10) {
        hourText.innerText = `0${hours}`;
    } else {
        hourText.innerText = hours;
    }
    

    let mins = Math.floor((diffSeconds - days * 86400 - hours * 3600) / 60);
    if (mins < 10) {
        minText.innerText = `0${mins}`;
    } else {
        minText.innerText = mins;
    }

    let secs = (diffSeconds - days * 86400 - hours * 3600 - mins * 60);
    if (secs < 10) {
        secText.innerText = `0${secs}`;
    } else {
        secText.innerText = secs;
    }

    console.log(days, hours, mins, secs);
}

setInterval(countDown, 1000);
