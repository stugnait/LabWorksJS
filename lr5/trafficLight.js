// Початкові значення часу для кожного стану світлофора (у секундах)
let redTime = 5;
let yellowTime = 3;
let greenTime = 7;

// Функція, яка оновлює час для кожного стану світлофора
function changeBlinkSpeed() {
    redTime = parseInt(document.getElementById("redSpeed").value);
    yellowTime = parseInt(document.getElementById("yellowSpeed").value);
    greenTime = parseInt(document.getElementById("greenSpeed").value);
}

// Функція, яка змінює колір світлофора та виводить словесний опис поточного стану
function changeColor(color, time, description) {
    document.getElementById("redLight").style.backgroundColor = "black";
    document.getElementById("yellowLight").style.backgroundColor = "black";
    document.getElementById("greenLight").style.backgroundColor = "black";

    document.getElementById(color + "Light").style.backgroundColor = color;
    console.log(description);
    setTimeout(nextColor, time * 1000, color);
}

// Функція, яка переходить до наступного кольору світлофора
function nextColor(prevColor) {
    switch (prevColor) {
        case "red":
            changeColor("green", greenTime, "Зелений");
            break;
        case "green":
            changeColor("yellow", yellowTime, "Жовтий");
            break;
        case "yellow":
            // Миготливий жовтий (мигає 3 рази)
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    document.getElementById("yellowLight").style.backgroundColor = "black";
                }, 500 * i);
                setTimeout(() => {
                    document.getElementById("yellowLight").style.backgroundColor = "yellow";
                }, 500 * i + 250);
            }
            setTimeout(() => {
                changeColor("red", redTime, "Червоний");
            }, 1500);
            break;
        default:
            break;
    }
}

// Запускаємо програму, починаючи з червоного світла
changeColor("red", redTime, "Червоний");
