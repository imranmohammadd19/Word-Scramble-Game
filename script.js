import words from "../word.js";
const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const inputField = document.querySelector("input");
const TimerText = document.querySelector(".time span b");

let selectedword, timer, maxtime;

const initTime = () => {


    clearInterval(timer);
    
  timer = setInterval(() => {
    if (maxtime > 0) {
      maxtime--;
      TimerText.innerHTML = maxtime;
      return;
    }

    alert(`Sorry! Time is up. "${selectedword}" was the correct word.`);
    clearInterval(timer);
    initGame();
  }, 1000);
};

const initGame = () => {
  clearInterval(timer);       // stop previous timer
  maxtime = 30;               // set/reset time
  TimerText.innerHTML = maxtime;
  initTime();                 // start new timer

  const randObj = words[Math.floor(Math.random() * words.length)];
  selectedword = randObj.word;
  const hint = randObj.hint;

  const wordArray = selectedword.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = wordArray[i];
    wordArray[i] = wordArray[j];
    wordArray[j] = temp;
  }

  wordText.innerHTML = wordArray.join("");
 hintText.innerHTML = `<strong>Hint:</strong> ${hint}`;

  inputField.value = "";

  console.log(randObj);
  console.log(selectedword);
  console.log(hint);
  console.log(wordArray);
};

const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) return alert("Please enter a word");
  if (userWord !== selectedword) {
    return alert(`Oops! "${userWord}" is incorrect.`);
  }
  alert(`Crazy! "${userWord}" is correct.`);
  clearInterval(timer); // stop timer on correct answer
};

checkBtn.addEventListener("click", checkWord);
initGame();

