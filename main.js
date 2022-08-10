//tag variables
const $createNumBtn = document.querySelector('#createNumBtn');
const $answerForm = document.querySelector('#answerForm');
const $answerInput = document.querySelector('#answerInput');
const $logs = document.querySelector('#logs');



const numbers = [1,2,3,4,5,6,7,8,9] ;
let answer = [];
let trial = 0;



//랜덤 4개 숫자 뽑아주는 함수
function onClickCreateNumBtn () {
  if(answer.length === 0) {
    for(let i = 0; i < 4; i++) {
      const index = Math.floor(Math.random()* numbers.length);
      answer.push(numbers[index]);
      numbers.splice(index,1);
    }
    alert('Created Sucessfully.')
  }
  else {
    alert("You've already been created the Number.")
  }
}

function onSubmitAnswer(event) {
  event.preventDefault();
  if(answer.length !== 0) {
    const inputVal = $answerInput.value; // 문자열

    if(!isValid(inputVal)) { //유효하지 않은 값이 들어오면 경고창 출력.
      alert('non-valid number!');
    }
    else {
      //정답과 비교 절차
      trial++; // 유효성 검사를 마친 정상적인 input값을 submit할 때 마다 횟수 증가
      isAnswer(inputVal);
    }
    $answerInput.value = '';
  }
  else {
    alert('Please create a Random Number First !')
    $answerInput.value = '';
  }
}


//입력값 유효성 검사해주는 함수
function isValid (num) {
  if(!Number(num) || num.length !== 4) { // 온전한 네자리 숫자인지 확인
    return false;
  }
  for(let i = 0; i < num.length; i++) { // 각 네자리에 중복되는 숫자가 있는지 확인
    for(let j = i + 1; j < num.length; j++) {
      if(num[i] === num[j]) return false;
    }
  }
  for(let i = 0; i < num.length; i++){ // 각 자리에 숫자 0이 있는지 확인
    if(Number(num[i]) === 0) return false;
  }
  return true;
}

//정답인지 확인
function isAnswer (inputVal) {
  if(answer.join('') === inputVal) {
    const div = document.createElement('div');
    div.innerText = `Homerun !! the answer is : ${answer.join('')}`
    div.classList.add('winner-message');
    $logs.appendChild(div);
  } else {
    logHandler(inputVal);
  }
}

function logHandler(inputVal) {
  let strike = 0;
  let ball = 0;
  let out = 0;
  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++) {
      if(i === j && answer[i] === Number(inputVal[j])) {
        strike++;
      }
      else if(i !== j && answer[i] === Number(inputVal[j])) {
        ball++;
      }
      else {
        out++;
      }
    }
  }
  const div = document.createElement('div');
  div.innerText = `${trial} : ${inputVal} ➡ ${strike}S ${ball}B ${4-(16-out)}O`
  div.classList.add('log-message');
  $logs.appendChild(div);
}

//EventListeners
$createNumBtn.addEventListener('click', onClickCreateNumBtn)
$answerForm.addEventListener('submit', onSubmitAnswer)