const columns = document.getElementsByClassName('column');
const backgroundFilter = document.getElementById('filter');

// card를 담을 공간
let beforeArray = [];
let doingArray = [];
let afterArray = [];

function filterCleanArray(arrayName, currentCard) {
  // array에서 currentCard의 id를 걸러서
  // 새로운 배열을 리턴
  const cleanArray = arrayName.filter(function (lists) {
    return lists.id !== parseInt(currentCard.id);
  });

  return cleanArray;
}

// closure 개념 공부!
// 파라미터로 이전 이벤트의 변수를 가져오기 위해서?
// 1. closure 이용하기
// function alertBtnClickHandler(currentBtn) {
//   return function (e) {
//     if (e.target.id == 'yes-btn') {
//       deleteCard(currentBtn);
//       console.log(currentBtn);
//     } else if (e.target.id == 'no-btn') {
//     }
//   };
// }

function deleteAlert(e) {
  backgroundFilter.classList.add('active');

  // 버튼이 타겟될 때까지 이벤트위임
  let currentBtn = e.target;
  while (!currentBtn.classList.contains('card-delete-btn')) {
    currentBtn = currentBtn.parentNode;
  }

  const alertBtns = document.getElementById('popup-btns');
  alertBtns.addEventListener('click', function (e) {
    if (e.target.id == 'yes-btn') {
      deleteCard(currentBtn);
      backgroundFilter.classList.remove('active');
    } else if (e.target.id == 'no-btn') {
      backgroundFilter.classList.remove('active');
    }
  });
}

function deleteCard(currentBtn) {
  const currentCard = currentBtn.parentNode;
  const currentUl = currentCard.parentNode;
  const currentColumn = currentUl.parentNode;

  // 먼저 paint된 card를 지워준다
  currentUl.removeChild(currentCard);

  // currentColumn에 따라
  //    기존 배열 대신 filter된 배열을 넣어줌
  //    로컬스토리지에 저장
  if (currentColumn.id == 'before-items') {
    beforeArray = filterCleanArray(beforeArray, currentCard);
    saveLocalstorage('beforeArray', beforeArray);
  } else if (currentColumn.id == 'doing-items') {
    doingArray = filterCleanArray(doingArray, currentCard);
    saveLocalstorage('doingArray', doingArray);
  } else if (currentColumn.id == 'after-items') {
    afterArray = filterCleanArray(afterArray, currentCard);
    saveLocalstorage('afterArray', afterArray);
  }
}

function loadLocalstorage(arrayNameString, currentColumn) {
  // 로컬스토리지의 배열을 가져올 경우,
  // 배열이 JSON형식으로 불러와짐
  const loadedLists = localStorage.getItem(arrayNameString);

  // 로컬스토리지에 저장된 리스트가 있는지 검사
  // 있다면?
  if (loadedLists !== null) {
    // JSON 형식을 array타입으로 바꿔주는 코드
    const parsedLists = JSON.parse(loadedLists);

    parsedLists.forEach(function (lists) {
      paintCard(lists.text, currentColumn);
    });
  }
}

// 로컬스토리지에 배열을 저장하는 함수
function saveLocalstorage(arrayNameString, arrayName) {
  localStorage.setItem(arrayNameString, JSON.stringify(arrayName));
}

// array를 push해주는 함수
function addArray(arrayName, newId, text) {
  // 함수 안에 newid를 정의할 경우 밖에서 undefined가 뜬다... Why...?
  const arrayObj = {
    text: text,
    id: newId,
  };

  arrayName.push(arrayObj);
}

function paintCard(text, currentColumn) {
  //array의 마지막 길이에 id 부여
  let newId;

  if (currentColumn.id == 'before-items') {
    newId = beforeArray.length + 1;
    addArray(beforeArray, newId, text);
    saveLocalstorage('beforeArray', beforeArray);
  } else if (currentColumn.id == 'doing-items') {
    newId = doingArray.length + 1;
    addArray(doingArray, newId, text);
    saveLocalstorage('doingArray', doingArray);
  } else if (currentColumn.id == 'after-items') {
    newId = afterArray.length + 1;
    addArray(afterArray, newId, text);
    saveLocalstorage('afterArray', afterArray);
  }

  // 카드 틀 li 생성
  const newCard = document.createElement('li');

  // 카드 자식 태그 생성
  const newCardDiv = document.createElement('div');
  const newCardIcon = document.createElement('div');
  const newCardTitle = document.createElement('h2');
  const newCardinfo = document.createElement('h4');
  const newCardDeleteBtn = document.createElement('button');

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
  newCard.draggable = 'true';
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
  newCardDeleteBtn.addEventListener('click', deleteAlert);

  // ul태그 잡기
  const currentUl = currentColumn.children[2];
  currentUl.appendChild(newCard);

  // textarea 초기화
  const currentTextarea = currentColumn.children[1][0];
  currentTextarea.value = '';
}

function init() {
  loadLocalstorage('beforeArray', columns[0]);
  loadLocalstorage('doingArray', columns[1]);
  loadLocalstorage('afterArray', columns[2]);
}
init();
