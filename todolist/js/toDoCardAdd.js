// 카드 플러스 버튼 가져오기
const plusBtn = document.getElementsByClassName('add-btn');
const textareas = document.getElementsByClassName('note-textarea');

// 플러스 버튼을 눌렀을 때 이벤트 발생
function plusBtnClickHandler(e) {
  let targetColumn = e.target;

  // e.target이 column(section)을 잡을 때까지 타겟을 위임
  while (!targetColumn.classList.contains('column')) {
    targetColumn = targetColumn.parentNode;
  }

  // column(section)에 class를 add해준다
  targetColumn.classList.toggle('add-active');
}

// textarea에 값이 input될 때마다 실행될 함수
function textareaKeydownHandler(e) {
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

for (let i = 0; i < plusBtn.length; i++) {
  plusBtn[i].addEventListener('click', plusBtnClickHandler);
}

for (let i = 0; i < textareas.length; i++) {
  textareas[i].addEventListener('input', textareaKeydownHandler);
}
