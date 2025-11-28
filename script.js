// ▬▬▬ إعداد الجولات ▬▬▬
const rounds = [
    { item:"🍎", few:2, many:6, correct:"few",  instruction:"اختر: قليل" },
    { item:"✏️", few:3, many:7, correct:"many", instruction:"اختر: كثير" },
    { item:"🍬", few:1, many:5, correct:"many", instruction:"اختر: كثير" },
    { item:"🚗", few:2, many:8, correct:"few",  instruction:"اختر: قليل" },
    { item:"⭐", few:3, many:9, correct:"many", instruction:"اختر: كثير" }
];

let score = 0;
let currentRound = 0;

// ▬▬▬ عناصر HTML ▬▬▬
const mainScreen = document.getElementById("mainScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const roundText = document.getElementById("roundText");
const groupFew = document.getElementById("groupFew");
const groupMany = document.getElementById("groupMany");
const resultMessage = document.getElementById("resultMessage");

const correctSound = document.getElementById("correctSound");

// ▬▬▬ بدء اللعبة ▬▬▬
document.getElementById("startBtn").onclick = () => {
    mainScreen.classList.remove("active");
    gameScreen.classList.add("active");
    startRound();
};

function startRound() {
    let r = rounds[currentRound];

    roundText.innerHTML = r.instruction;

    groupFew.innerHTML = "";
    groupMany.innerHTML = "";

    for (let i=0; i<r.few; i++) {
        groupFew.innerHTML += `<span class="item-img">${r.item}</span>`;
    }
    for (let i=0; i<r.many; i++) {
        groupMany.innerHTML += `<span class="item-img">${r.item}</span>`;
    }

    groupFew.onclick = () => checkAnswer("few", groupFew);
    groupMany.onclick = () => checkAnswer("many", groupMany);
}

// ▬▬▬ التحقق من الإجابة ▬▬▬
function checkAnswer(choice, element) {
    let r = rounds[currentRound];

    if(choice === r.correct){
        score++;
        correctSound.play();
        element.classList.add("flash-green");
        setTimeout(()=> element.classList.remove("flash-green"), 500);
    } else {
        element.classList.add("flash-red");
        setTimeout(()=> element.classList.remove("flash-red"), 500);
    }

    currentRound++;

    if(currentRound === rounds.length){
        setTimeout(endGame, 600);
    } else {
        setTimeout(startRound, 600);
    }
}

// ▬▬▬ نهاية اللعبة ▬▬▬
function endGame() {
    gameScreen.classList.remove("active");
    resultScreen.classList.add("active");

    if(score >= 4){
        resultMessage.innerHTML = "رائع! تم إنجاز الهدف 🎉";
    } else {
        resultMessage.innerHTML = "اقتربنا من إنجاز الهدف!";
    }
}

// ▬▬▬ زر إعادة المحاولة ▬▬▬
document.getElementById("retryBtn").onclick = () => {
    score = 0;
    currentRound = 0;
    resultScreen.classList.remove("active");
    gameScreen.classList.add("active");
    startRound();
};

// ▬▬▬ زر إنهاء → العودة للواجهة الرئيسية ▬▬▬
document.getElementById("endBtn").onclick = () => {
    resultScreen.classList.remove("active");
    mainScreen.classList.add("active");
};
