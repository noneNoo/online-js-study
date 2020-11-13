// 카드 플러스 버튼 가져오기
const plusBtn = document.getElementsByClassName('add-btn');
const cardAddForms = document.getElementsByClassName('card-add-form');
const columns = document.getElementsByClassName('card-container');
const blackFilter = document.getElementById('filter');
const popupBtnContainer = document.getElementById('popup-btns');

// card를 담을 공간
let beforeLists = [];
let doingLists = [];
let afterLists = [];

// 페이지 입장시, 로컬스토리지에 있는 list를 불러와서
function loadLists(arrayNameString, currentUl, arrayName) {
  const loadedList = localStorage.getItem(arrayNameString);

  // 로컬스토리지에 card가 있는지 확인한 후
  // 있다면?
  if (loadedList !== null) {
    // 로컬스토리지의 문자열들을 js의 객체 형식으로 변환해준다.
    const parsedList = JSON.parse(loadedList);

    // 변환된 3개의 객체를
    // 1. card를 담을 위의 원래 배열에 add해준다
    // 2. ui에 그려준다
    parsedList.forEach(function (columnLists) {
      addArrayList(arrayName, columnLists.text);
      paintCard(columnLists.text, currentUl);
    });
  }
}

// 리팩토링 필요...

// 로컬스트리지에 array를 저장하는 함수
function saveLists(arrayNameString, array) {
  // object를 string으로 변환해주는 JSON코드
  localStorage.setItem(arrayNameString, JSON.stringify(array));
}

// // 인자로 선택된 calumn을 받아서 ul값을 조절하는 함수
// // % 보다 더 좋은 방안을 모색중...
// function ulHeightControl(currentColumn) {
//   let currentUl = currentColumn.childNodes[7];

//   if (currentUl.style.height == `75.5%`) {
//     currentUl.style.height = `95%`;
//   } else {
//     currentUl.style.height = `75.5%`;
//   }
// }

// 플러스 버튼을 눌렀을 때 form 토글
function plusBtnClickHandler(e) {
  let targetColumn = e.target;
  // e.target이 column(section)을 잡을 때까지 타겟을 위임
  while (!targetColumn.classList.contains('column')) {
    targetColumn = targetColumn.parentNode;
  }

  //해당 타겟 column에 active mode 적용
  targetColumn.classList.toggle('add-active');
  ulHeightControl(targetColumn);
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

// // textarea에 keypress될 때마다 실행될 함수
// function textareaKeypressHandler(e) {
//   let addBtn = e.target.parentNode[1];
//   // 쉬프트키와 엔터키 동시 입력시, 엔터키 입력
//   if (e.key == 'Enter' && e.shiftKey) {
//     return;
//     // textarea의 value가 비어 있는데 엔터키 입력시, 엔터키 무시
//   } else if (!e.target.value && e.key == 'Enter') {
//     e.preventDefault();
//     // 버튼이 active 되었을 때 엔터키 입력시, cardAdd 함수 실행
//   } else if (e.key == 'Enter' && addBtn.classList.contains('active')) {
//     e.preventDefault();
//     addCard(addBtn);
//   }
// }

function addArrayList(arrayName, text) {
  newId = arrayName.length + 1;
  // array에 들어갈 틀
  const listObj = {
    text: text,
    id: newId,
  };
  // 배열 내보내기
  arrayName.push(listObj);
}

function paintCard(text, currentColumnUl, newId) {
  // 카드 틀 li 생성
  let newCard = document.createElement('li');

  // 카드 자식 태그 생성
  let newCardDiv = document.createElement('div');
  let newCardIcon = document.createElement('div');
  let newCardTitle = document.createElement('h2');
  let newCardinfo = document.createElement('h4');
  let newCardDeleteBtn = document.createElement('button');

  // textarea에 입력된 값을 새 카드에 넣기
  newCardTitle.innerText = text;

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

  newCardDeleteBtn.innerHTML = `
    <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    class="bi bi-x"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
    />
  </svg>
  `;

  //css 스타일링을 위한 classname 부여
  newCard.className = 'list-card';
  newCard.id = newId;
  newCardIcon.className = 'icon';
  newCardTitle.className = 'list-card-title';
  newCardinfo.className = 'list-card-sub-info';
  newCardDeleteBtn.className = 'icon card-delete-btn';

  // 차곡차곡 작은 태그부터 넣어주기
  newCardDiv.appendChild(newCardTitle);
  newCardDiv.appendChild(newCardinfo);

  newCard.appendChild(newCardIcon);
  newCard.appendChild(newCardDiv);
  newCard.appendChild(newCardDeleteBtn);

  // delete버튼에 이벤트 추가
  // newCardDeleteBtn.addEventListener('click', deleteCard);

  currentColumnUl.appendChild(newCard);
}

// delete버튼을 불러오는 함수
function delectButtonsLoad() {
  const deleteBtns = document.getElementsByClassName('card-delete-btn');

  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', deleteBtnClickHandler);
  }
}

function deleteBtnClickHandler(e) {
  let currentCard = e.target;
  while (!currentCard.classList.contains('list-card')) {
    currentCard = currentCard.parentNode;
  }
  const currentColumn = currentCard.parentNode;

  currentColumn.removeChild(currentCard);

  if (currentColumn.id == 'before-items') {
    const cleanListArray = currentColumn.filter(function (lists) {
      console.log(lists.id);
    });
  }
}

function addCard(addButton) {
  // const currentTextarea = addButton.parentNode.parentNode[0];
  // const currentColumn = addButton.parentNode.parentNode.parentNode;
  // const currentColumnUl = currentColumn.children[2];
  // // 선택된 card의 id
  // let currentNewId;
  // // 선택된 column의 id값에 따라 배열을 나눠 저장
  // if (currentColumn.id == 'before-items') {
  //   addArrayList(beforeLists, currentTextarea.value);
  //   // 선택된 array에 추가된 마지막 id값
  //   saveLists('beforeLists', beforeLists);
  // } else if (currentColumn.id == 'doing-items') {
  //   addArrayList(doingLists, currentTextarea.value);
  //   currentNewId = doingLists[doingLists.length - 1].id;
  //   saveLists('doingLists', doingLists);
  // } else if (currentColumn.id == 'after-items') {
  //   addArrayList(afterLists, currentTextarea.value);
  //   currentNewId = afterLists[afterLists.length - 1].id;
  //   saveLists('afterLists', afterLists);
  // }
  // console.log(currentNewId);
  // paintCard(currentTextarea.value, currentColumnUl, currentNewId);
  // delectButtonsLoad();
  // // textarea value값 초기화
  // // addbtn active class 해제
  // currentTextarea.value = '';
  // addButton.classList.remove('active');
}

// function formBtnClickHandler(e) {
//   //active된 add버튼을 눌렀을 시 카드 추가
//   if (
//     e.target.classList.contains('add-submit-btn') &&
//     e.target.classList.contains('active')
//   ) {
//     //this는 input이 전송한 form을 가르킨다
//     addCard(this[1]);
//     e.target.classList.remove('active');

//     // cancel 버튼 눌렀을 시 form 숨기기
//   } else if (e.target.classList.contains('cancel-btn')) {
//     let currentColumn = e.target.parentNode.parentNode.parentNode;

//     currentColumn.classList.remove('add-active');

//     ulHeightControl(currentColumn);

//     // textarea를 클릭했을 시 입력받은 값에 따라
//     // add submit 버튼 색상을 변경하는 이벤트 실행
//   } else if (e.target.classList.contains('note-textarea')) {
//     e.target.addEventListener('input', textareaKeyInputHandler);
//     e.target.addEventListener('keydown', textareaKeypressHandler);
//   }
// }

// 페이지 로딩시 자동실행 함수
function init() {
  loadLists('beforeLists', columns[0], beforeLists);
  loadLists('doingLists', columns[1], doingLists);
  loadLists('afterLists', columns[2], afterLists);
  delectButtonsLoad();
}

for (let i = 0; i < plusBtn.length; i++) {
  plusBtn[i].addEventListener('click', plusBtnClickHandler);
}

for (let i = 0; i < cardAddForms.length; i++) {
  cardAddForms[i].addEventListener('click', formBtnClickHandler);
}
init();
