let array = [1, 2, 3, 4, 5]

function maxAndMin() {
    let array = [1, 2, 3, 4, 5];
    let max = array[0];
    let min = array[0];

    for (let i = 0; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
        if (array[i] < min) {
            min = array[i];
        }
    }
    Math.max(...array)

    console.log("max -> " + max + "; min ->" + min);
}

if (document.getElementById("element1").width > document.getElementById("element2").width) {
    console.log("WoW");
}

function isBetween(number, min, max) {

    if (-!(min < number < max)) {
        console.log("WOOOOOOOOOOOOW")
    }
    else {
        console.log("NOT WOW")
    }
}

function check(mark) {

    let result = (mark === 4) ? "wow" : mark === 5 ? 'ewe4' :  "idk";

    if (mark === 1) {
        result = "bad";
    }
    if (mark === 2) {
        result = "not bad";
    }
    if (mark === 3) {
        result = "GJ";
    }

    console.log(result);

    let month = 7;

    let season;

    if (month >= 1 && month <= 3 || month === 12) {
        season = "Двіж зима";
    } else if (month >= 4 && month <= 6) {
        season = "Та то почті літо";
    } else if (month >= 7 && month <= 9) {
        season = "літо";
    } else if (month >= 10 && month < 12) {
        season = "в шортах не походиш";
    } else {
        season = "Пріколіст чи шо?";
    }

    console.log("шо я скажу: ", season);
}

function doAll(){
    maxAndMin();
    isBetween(1,2 ,3);
    check(2);
}