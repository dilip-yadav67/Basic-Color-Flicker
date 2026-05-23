let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "grey", "purple", "red"];

let started = false;
let level = 0;
let highscore = localStorage.getItem("highscore") || 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

// Start game on keypress or click
document.addEventListener("keypress", startGame);
document.addEventListener("click", startGame);

function startGame() {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        userSeq = [];
        h3.innerText = `Highest Score = ${highscore}`;
        levelUp();
    }
}

function btnFlash(btn) {
    btn.classList.add("flashBtn");
    setTimeout(() => btn.classList.remove("flashBtn"), 500);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 500);
}

function levelUp() {
    userSeq = [];
    level++;

    if (level > highscore) {
        highscore = level;
        localStorage.setItem("highscore", highscore);
    }

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log("Game Sequence: ", gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        h3.innerHTML = `Highest Score = ${highscore}`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 1000);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
