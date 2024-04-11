
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const clockDisplay = `${hours}:${minutes}:${seconds}`;
    const clockElement = document.getElementById('clock');
    clockElement.textContent = clockDisplay;
}
setInterval(updateClock, 1000);

function startCountdown() {
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const countdownInput = document.getElementById('countdown').valueAsNumber;
    const now = new Date().getTime();
    const distance = countdownInput - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById('countdownDisplay').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Calendar
function displayCalendar() {
    const dateInput = document.getElementById('dateInput').value;
    const date = new Date(dateInput);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    document.getElementById('calendarDisplay').innerHTML = `Selected date: ${month} ${year}`;
}

// Time to Birthday
function calculateTimeToBirthday() {
    setInterval(updateTimeToBirthday, 1000);
}

function updateTimeToBirthday() {
    const birthdayInput = document.getElementById('birthdayInput').value;
    const birthday = new Date(birthdayInput);
    const now = new Date();
    birthday.setFullYear(now.getFullYear());
    if (now > birthday) {
        birthday.setFullYear(now.getFullYear() + 1);
    }
    const difference = birthday - now;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    document.getElementById('birthdayDisplay').innerHTML = `Time to birthday: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}
