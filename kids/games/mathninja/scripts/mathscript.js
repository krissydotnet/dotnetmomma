class User {
    constructor(username) {
        this.username = username;
        this.currentLevel = 0;
        this.currentBelt = 0;
        this.currentScore = 0;
        this.currentWrong = 0;
    }
 }
//import User from "./user";
const BELTS = [
    "white",
    "gold",
    "green",
    "purple",
    "blue",
    "red",
    "brown",
    "black"
];
const LEVEL = [
    "Beginner",
    "Novice",
    "Intermediate",
    "Expert"
];
const dojo = [
    {level: LEVEL[0],
     belt: BELTS,
     min: 1,
    max: 10,
    operators: ["+"]
    },
    {
        level: LEVEL[1],
        belt: BELTS,
       min: 1,
       max: 10,
       operators: ["-"] 
    },
    {
        level: LEVEL[2],
        belt: BELTS,
       min: 10,
       max: 20,
       operators: ["+"] 
    },
    {
        level: LEVEL[3],
        belt: BELTS,
       min: 10,
       max: 20,
       operators: ["-"] 
    }
];
const blankuser = new User("guest");



//Load user data
//resetUserData();
var currentUser = LoadUserData();
console.log(currentUser);
//initialize variables           
var number1;
var number2;
var operand; 


var score = currentUser.currentScore;
var wrong = currentUser.currentWrong;
changeScore();
var level = currentUser.currentLevel;
var belt = currentUser.currentBelt;



document.getElementById("level").innerHTML = dojo[level].level;
document.getElementById("belt").style.backgroundColor = dojo[level].belt[belt];
newProblem();


function LoadUserData() {
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
            console.log("Retrieving user data");
        // Retrieve your data from locaStorage
            return JSON.parse(localStorage.saveData || null) || blankuser;
        } else {
            // Sorry! No Web Storage support..
            console.log("No web storage support");
            return blankuser;
        }
}
function saveUserData() {
    currentUser.currentBelt = belt;
    currentUser.currentLevel = level;
    currentUser.currentScore = score;
    currentUser.currentWrong = wrong;
    console.log("Saving user data");
  localStorage.saveData = JSON.stringify(currentUser);
}
function resetUserData() {
    localStorage.clear();
}

function pickRandom(max) {
         let randomNum = Math.floor(Math.random() * max);
         return randomNum;
     } 
function pickRandomRange(min, max) {
         let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
         return randomNum;
 }

function correctAnswer() {
    switch (operand) {
        case "+":  
            return number1 + number2;
            break;
        case "-":
            return number1 - number2;

    }
}

function newProblem() {
    operand = dojo[level].operators[pickRandom(dojo[level].operators.length)];
    let minNumber = dojo[level].min;
    let maxNumber = dojo[level].max;

    number1 = pickRandomRange(minNumber, maxNumber);
    if (operand == "-")  {
        do {
            number2 = pickRandomRange(minNumber, maxNumber);
        } while (number2 > number1);
    } else {
        number2 = pickRandomRange(minNumber, maxNumber);
    }

    
    document.getElementById("number1").innerHTML = number1;
    document.getElementById("number2").innerHTML = number2;
    document.getElementById("operator").innerHTML = operand;
    document.getElementById("answer").value = '';
    document.getElementById("answer").focus();
}


function changeScore(scoreType, value) {
    let id = scoreType
    var el = document.getElementById(id);
    el.style.height = (value * 10) + "px";
    
  }

  function changeScore() {
        document.getElementById("right").style.height = (score * 10) + "px";
        document.getElementById("wrong").style.height = (wrong * 10) + "px";
  }

  function changeBelt() {
    belt++;
    score = 0;
    wrong = 0;
    var el = document.getElementById("belt");
    el.style.backgroundColor = dojo[level].belt[belt];
    var banner = document.getElementById("new-belt");
    banner.style.backgroundColor = dojo[level].belt[belt];
    showBanner(banner);
  }

  function changeLevel() {
    level++;
    score = 0;
    wrong = 0;
    belt = 0;
    document.getElementById("level").innerHTML = dojo[level].level;
    var el = document.getElementById("belt");
    el.style.backgroundColor = dojo[level].belt[belt];
    var banner = document.getElementById("new-level");
    showBanner(banner);
  }

  function animate(element) {
        element.classList.remove("animate");
        void element.offsetWidth;
        element.classList.add("animate");
  }

  function showBanner(element) {
    element.classList.remove("move-left");
    void element.offsetWidth;
    element.classList.add("move-left");
}

document.body.onkeyup = function(e){
    if((e.keyCode == 32) || (e.keyCode == 13)){
        let answer = document.getElementById("answer").value;
        console.log(answer);
        if ((answer!="") && (answer == correctAnswer())) {
            score++;
           // if (score === 10) {
               if (score === 15) {
                if (dojo[level].belt.length === belt + 1) {
                    changeLevel();
                } else {
                    changeBelt();
                }

            }
            changeScore();  
            animate(document.getElementById("elephant"));    
        } else {
            wrong++;
            (score > 0) ? score--: score = 0;
            changeScore();
            animate(document.getElementById("agent"));    
   
        }
        saveUserData();
        newProblem();

    }
}


