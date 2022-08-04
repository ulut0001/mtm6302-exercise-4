//global variables
const $chooseDate = document.getElementById('chooseDate');
const $counterName = document.getElementById('counterName');
const $dateSelector = document.getElementById('dateSelector');
const $setButton = document.getElementById('setButton');
const $countdown = document.getElementById('countdown');
const $countdownTitle = document.getElementById('countdownTitle');
const $dayLeft = document.getElementById('dayLeft');
const $hourLeft = document.getElementById('hourLeft');
const $minLeft = document.getElementById('minLeft');
const $secLeft = document.getElementById('secLeft');
const $clearButton = document.getElementById('clearButton');
let counterName = 'Custom Countdown';
let $dateChosen;
let jsDateChosen;
let upInterval;
let downInterval;

let d = new Date();

//functions

function counterContent () {
    $dayLeft.textContent = ('00' + $dayDif).slice(-3);
    $hourLeft.textContent = ('0' + $hourDif).slice(-2);
    $minLeft.textContent = ('0' + $minDif).slice(-2);
    $secLeft.textContent = ('0' + $secs).slice(-2);
};

function dynamicCounterDown () {
    if ($secs > 0) {
        $secs--
        counterContent();
    } else { 
        $secs = 59;
        if ($minDif > 0) {
            $minDif--
            counterContent();
        } else {
            $minDif = 59;
            if ($hourDif > 0) {
                $hourDif--
                counterContent();
            } else {
                $hourDif = 23;
                if ($dayDif > 0) {
                    $dayDif--
                    counterContent();
                } else {
                    $timeLeft.textContent = "Time Over";
                    };
            };
        };
    };
};

function dynamicCounterUp () {
    if ($secs < 60) {
        $secs++
        counterContent();
    } else { 
        $secs = 0;
        if ($minDif < 60) {
            $minDif++
            counterContent();
        } else {
            $minDif = 0;
            if ($hourDif < 24) {
                $hourDif++
                counterContent();
            } else {
                $hourDif = 0;
                $dayDif++
                counterContent();
            };
        };
    };
};

function openCountdown () {
    if (jsDateChosen.getTime() > d.getTime()) {
        downInterval = setInterval(dynamicCounterDown, 1000);
    } else if (jsDateChosen.getTime() < d.getTime()) {
        upInterval = setinterval(dynamicCounterUp, 1000);
    } else {
        $timeLeft.textContent = "Time Over"
    };
    $chooseDate.style.display = 'none';
    $countdown.style.display = 'grid';
    $countdownTitle.textContent = counterName;
};

function parseDate () {
    const $year = $dateChosen.slice(0,4);
    const $month = $dateChosen.slice(5, 7);
    const $day = $dateChosen.slice(8, 10);
    const $hour = $dateChosen.slice(11, 13);
    const $min = $dateChosen.slice(14, 16);
    jsDateChosen = new Date($year, ($month - 1), $day, $hour, $min);
    difference = jsDateChosen.getTime() - d.getTime();
    if (difference < 0) {
        difference = Math.abs(difference);
    };
    $dayDif = Math.floor(difference / 1000 / 60 / 60 /24);
    $hourDif = Math.floor((difference - ($dayDif * 1000 * 60 * 60 * 24)) / 1000 / 60 / 60);
    $minDif = Math.floor((difference - ($dayDif * 1000 * 60 * 60 * 24) - ($hourDif * 1000 * 60 * 60)) / 1000 / 60);
    $secs = Math.floor((difference - ($dayDif * 1000 * 60 * 60 * 24) - ($hourDif * 1000 * 60 * 60) - ($minDif * 1000 * 60)) / 1000)
};

if (localStorage.getItem('dateSelect')) {
    $dateChosen = localStorage.getItem('dateSelect');
    if (localStorage.getItem('counterTitle')) {
    counterName = localStorage.getItem('counterTitle');
    };
    parseDate();
    openCountdown();
};

$setButton.addEventListener ('click', function(e) {
    e.preventDefault();
    if ($counterName.value) {
    counterName = $counterName.value;
    localStorage.setItem('counterTitle', counterName);
    };
    $dateChosen = $dateSelector.value;
    localStorage.setItem('dateSelect', $dateChosen);
    parseDate();
    openCountdown();
});

$clearButton.addEventListener ('click', function(e) {
    window.localStorage.clear();
    $chooseDate.style.display = 'grid';
    $countdown.style.display = 'none';
    $dateSelector.value = "";
    jsDateChosen = 0;
    $dateChosen = 0;
    clearInterval(downInterval);
    clearInterval(upInterval);
    $dayDif = 0;
    $hourDif = 0;
    $minDif = 0;
    $secs = 0;
});

