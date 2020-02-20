let countdown;
const timerDisplay = document.querySelector('#display__time-left')
const endTimer = document.querySelector('#display__end-time')
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown)
            endTimer.textContent = ``;
            timerDisplay.textContent = `Done!`;
            return;
        }
        displayTimeLeft(secondsLeft)
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = `(${display}) PomodoroTimer.nl | Verbeter uw prestaties in 25 minuten`;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();

    endTimer.textContent = `Je bent klaar om ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer))