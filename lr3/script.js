function first() {
    let a = 1;
    let i = 0;
    while (i < 10) {
        a += a;
        i++;
    }
    console.log(a)
}


function second() {
    let sum = 1;

    for (let num = 2; num <= 1000; num++) {
        let isPrime = true;
        for (let i = 2; i <= num / 2; i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            sum += num;
        }
    }

    console.log(sum);
}

function third() {

    var num = 0;

    switch (num) {
        case 1:
            day = "Понеділок";
            break;
        case 2:
            day = "Вівторок";
            break;
        case 3:
            day = "Середа";
            break;
        case 4:
            day = "Четвер";
            break;
        case 5:
            day = "П'ятниця";
            break;
        case 6:
            day = "Субота";
            break;
        case 7:
            day = "Неділя";
            break;
        default:
            day = "Некоректне число";
    }
    console.log("День тижня:", day);
}

function fourth() {
    let array = ["dsgh", "yui"];
    let newArray = [];
    const newArray2 = array.filter(item => item.length % 2 === 0)
    for (let i = 0; i < array.length; i++) {
        if (array[i].length % 2 === 0) {
            newArray.push(array[i]);
        }
    }
    console.log(newArray);
}

let fifth = (numbers) => {

    let newArray = [];
    for (let i = 0; i < numbers.length; i++) {
        newArray.push(++numbers[i]);
    }

    console.log(numbers.map(item => item+1));

}

function sixth(a, b) {
    console.log(a + b === 10 || a - b === 10);
}

function doAll(){
    first();
    second();
    third();
    fourth();
    fifth([1,2,3,4,5,6]);
    sixth(5,5);
}
doAll()