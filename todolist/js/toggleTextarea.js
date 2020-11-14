// + 버튼, 폼, column 가져오기
const plusBtn = document.getElementsByClassName('add-btn');
const cardAddForms = document.getElementsByClassName('card-add-form');

// 인자로 선택된 calumn을 받아서 ul값을 조절하는 함수
// % 보다 더 좋은 방안을 모색중...
function ulHeightControl(currentColumn) {
  let currentUl = currentColumn.childNodes[7];

  if (currentUl.style.height == `75.5%`) {
    currentUl.style.height = `95%`;
  } else {
    currentUl.style.height = `75.5%`;
  }
}

function plusBtnClickHandler(e) {
  let currentUl = e.target;

  // targetColumn변수가 column을 잡을 때까지 타겟을 위임
  while (!currentUl.classList.contains('column')) {
    currentUl = currentUl.parentNode;
  }
  // 타겟된 column에 active 클래스 토글
  currentUl.classList.toggle('add-active');

  ulHeightControl(currentUl);
}

// textarea에 keypress될 때마다 실행될 함수
function textareaKeypressHandler(e) {
  let addBtn = e.target.parentNode[1];
  // 쉬프트키와 엔터키 동시 입력시, 엔터키 입력
  if (e.key == 'Enter' && e.shiftKey) {
    return;
    // textarea의 value가 비어 있는데 엔터키 입력시, 엔터키 무시
  } else if (!e.target.value && e.key == 'Enter') {
    e.preventDefault();
    // 버튼이 active 되었을 때 엔터키 입력시, cardAdd 함수 실행
  } else if (e.key == 'Enter' && addBtn.classList.contains('active')) {
    const currentUl = e.target.parentNode.parentNode;
    e.preventDefault();
    paintCard(e.target.value, currentUl);
    // 버튼 비활성화
    addBtn.classList.remove('active');
  }
}

// textarea에 값이 input될 때마다 실행될 함수
function textareaKeyInputHandler(e) {
  // 타겟한 column 내의 add submit 버튼을 찾아내 정의
  let targetAddSubmitBtn = e.target.parentNode[1];

  // textarea에 입력된 값이 있는지 검사하여
  // 타겟한 submit 버튼에 class를 add / remove
  if (e.target.value) {
    targetAddSubmitBtn.classList.add('active');
  } else {
    targetAddSubmitBtn.classList.remove('active');
  }
}

function formBtnClickHandler(e) {
  let currentUl = e.target.parentNode.parentNode.parentNode;
  //active된, add버튼을 눌렀을 시 카드 추가
  if (
    e.target.classList.contains('add-submit-btn') &&
    e.target.classList.contains('active')
  ) {
    const textareaValue = e.target.parentNode.parentNode[0].value;
    console.log();
    paintCard(textareaValue, currentUl);
    e.target.classList.remove('active');
    // cancel 버튼 눌렀을 시 form 숨기기
  } else if (e.target.classList.contains('cancel-btn')) {
    currentUl.classList.remove('add-active');

    ulHeightControl(currentUl);

    // textarea를 클릭했을 시 입력받은 값에 따라
    // add submit 버튼 색상을 변경하는 이벤트 실행
  } else if (e.target.classList.contains('note-textarea')) {
    e.target.addEventListener('input', textareaKeyInputHandler);
    e.target.addEventListener('keydown', textareaKeypressHandler);
  }
}

// +버튼에 이벤트 추가하기
for (let i = 0; i < plusBtn.length; i++) {
  plusBtn[i].addEventListener('click', plusBtnClickHandler);
}

// cardForm에 이벤트 추가하기
for (let i = 0; i < cardAddForms.length; i++) {
  cardAddForms[i].addEventListener('click', formBtnClickHandler);
}
