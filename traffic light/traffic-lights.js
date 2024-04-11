let redLightDuration = 5000;
let yellowLightDuration = 3000;
let greenLightDuration = 7000;
let state = 'red';
const red = document.getElementsByClassName('red')[0];
const green = document.getElementsByClassName('green')[0];
const yellow = document.getElementsByClassName('yellow')[0];
let manualCount = 0;
let yellowTimeout;
let redTimeout;
let greenTimeout;
let warnTimeout;
const video = document.getElementsByTagName('video')[0];
const heading = document.getElementsByClassName('traffic-lights__heading')[0]
const changeLight = () => {
    if (state === 'red') {
        heading.innerText = 'Жовтий';
        heading.style.color = 'yellow'
        state = 'yellow';
        yellow.style.backgroundColor = 'yellow';
        red.style.backgroundColor = 'grey';
        yellowTimeout = setTimeout(changeLight, yellowLightDuration);
    } else if (state === 'yellow') {
        heading.innerText = 'Зелений';
        heading.style.color = 'green'
        yellow.style.backgroundColor = 'grey';
        green.style.backgroundColor = 'green';
        state = 'green';
        greenTimeout = setTimeout(changeLight, greenLightDuration);
    } else if (state === 'green') {
        heading.innerText = 'Блимаючий жовтий';
        heading.style.color = 'yellow'
        green.style.backgroundColor = 'grey';
        state = 'flashYellow';
        flashYellow();
    } else if (state === 'flashYellow') {
        heading.style.color = 'red'
        heading.innerText = 'Червоний';
        state = 'red';
        yellow.style.backgroundColor = 'grey';
        red.style.backgroundColor = 'red';
        redTimeout = setTimeout(changeLight, redLightDuration);
    }
}

const flashYellow = () => {
    let count = 0;
    let interval = setInterval(() => {
        count++;
        count % 2 === 0 ? yellow.style.backgroundColor = 'yellow' : yellow.style.backgroundColor = 'grey';
        if (count === 6) {
            clearInterval(interval);
            changeLight();
        }
    }, 500);
    warnTimeout = interval;
}

changeLight();

const changeDurations = () => {
    redLightDuration = Number(prompt('Введіть нову тривалість червоного світла (в мілісекундах):')) || redLightDuration;
    yellowLightDuration = Number(prompt('Введіть нову тривалість жовтого світла (в мілісекундах):')) || yellowLightDuration;
    greenLightDuration = Number(prompt('Введіть нову тривалість зеленого світла (в мілісекундах):')) || greenLightDuration;
}

const changeColorButton = document.getElementById('changeColorButton');
changeColorButton.addEventListener('click', () => {
    manualChangeColor();
});

const manualChangeColor = () => {
    clearTimeout(yellowTimeout);
    clearTimeout(redTimeout);
    clearTimeout(greenTimeout);
    clearInterval(warnTimeout);

    manualCount++;

    if (manualCount === 1) {
        heading.style.color = 'red'
        heading.innerText = 'Червоний';
        red.style.backgroundColor = 'red';
        yellow.style.backgroundColor = 'grey';
        green.style.backgroundColor = 'grey';

        state = 'red';

    } else if (manualCount === 2) {
        heading.innerText = 'Жовтий';
        heading.style.color = 'yellow'

        yellow.style.backgroundColor = 'yellow';
        green.style.backgroundColor = 'grey';
        red.style.backgroundColor = 'grey';

        state = 'yellow';

    } else if (manualCount === 3) {
        heading.innerText = 'Зелений';
        heading.style.color = 'green'
        red.style.backgroundColor = 'grey';
        yellow.style.backgroundColor = 'grey';
        green.style.backgroundColor = 'green';

        state = 'green';
    } else if (manualCount === 4) {
        manualCount = 0;
        changeLight();
    }
}
