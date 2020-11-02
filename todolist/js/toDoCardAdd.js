// 카드 플러스 버튼 가져오기
const plusBtn = document.getElementsByClassName('add-btn');
const cardAddForms = document.getElementsByClassName('card-add-form');

// 인자로 선택된 calumn을 받아서 ul값을 조절하는 함수
// % 보다 더 좋은 방안을 모색중...
function ulHeightControl(currentColumn) {
  let currentUl = currentColumn.childNodes[7];

  if (currentUl.style.height == `77.5%`) {
    currentUl.style.height = `95%`;
  } else {
    currentUl.style.height = `77.5%`;
  }
}

// 플러스 버튼을 눌렀을 때 form 토글
function plusBtnClickHandler(e) {
  let targetColumn = e.target;

  // e.target이 column(section)을 잡을 때까지 타겟을 위임
  while (!targetColumn.classList.contains('column')) {
    targetColumn = targetColumn.parentNode;
  }

  targetColumn.classList.toggle('add-active');

  ulHeightControl(targetColumn);
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

function addCard(currentTarget) {
  let currentTextarea = currentTarget.parentNode.parentNode[0];

  // 카드를 추가할 선택된 ul
  let currentColumnUl =
    currentTarget.parentNode.parentNode.parentNode.children[2];

  // 카드 틀 li 생성
  let newCard = document.createElement('li');

  // 카드 자식 태그 생성
  let newCardDiv = document.createElement('div');
  let newCardIcon = document.createElement('div');
  let newCardTitle = document.createElement('h2');
  let newCardinfo = document.createElement('h4');

  // textarea에 입력된 값을 새 카드에 넣기
  newCardTitle.innerText = currentTextarea.value;

  // innerHTML
  newCardinfo.innerHTML = `Added by <span class="nickname">Nickname</span>`;
  newCardIcon.innerHTML = `
    <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    class="bi bi-card-text"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path
        fill-rule="evenodd"
        d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
    />
    <path
        fill-rule="evenodd"
        d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
    />
    </svg>
  `;

  //css 스타일링을 위한 classname 부여
  newCard.className = 'list-card';
  newCardIcon.className = 'icon';
  newCardTitle.className = 'list-card-title';
  newCardinfo.className = 'list-card-sub-info';

  // 차곡차곡 작은 태그부터 넣어주기
  newCardDiv.appendChild(newCardTitle);
  newCardDiv.appendChild(newCardinfo);

  newCard.appendChild(newCardIcon);
  newCard.appendChild(newCardDiv);

  currentColumnUl.appendChild(newCard);

  currentTextarea.value = '';
}

function formBtnClickHandler(e) {
  //active된 add버튼을 눌렀을 시 카드 추가
  if (
    e.target.classList.contains('add-submit-btn') &&
    e.target.classList.contains('active')
  ) {
    //this는 input이 전송한 form을 가르킨다
    addCard(this[1]);
    e.target.classList.remove('active');

    // cancel 버튼 눌렀을 시 form 숨기기
  } else if (e.target.classList.contains('cancel-btn')) {
    let currentColumn = e.target.parentNode.parentNode.parentNode;

    currentColumn.classList.remove('add-active');

    ulHeightControl(currentColumn);

    // textarea를 클릭했을 시 입력받은 값에 따라
    // add submit 버튼 색상을 변경하는 이벤트 실행
  } else if (e.target.classList.contains('note-textarea')) {
    e.target.addEventListener('input', textareaKeydownHandler);
  }
}

for (let i = 0; i < plusBtn.length; i++) {
  plusBtn[i].addEventListener('click', plusBtnClickHandler);
}

for (let i = 0; i < cardAddForms.length; i++) {
  cardAddForms[i].addEventListener('click', formBtnClickHandler);
}
