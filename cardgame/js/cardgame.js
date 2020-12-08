const backgroundFilter = document.getElementById('filter');

const row = 4;
const column = 3;

// 최근 포커스한 두 개의 카드를 담을 배열
let focusCard = [];

// 짝맞춰진 카드를 담을 배열
// 이 배열 안에 담긴 카드들은 뒤집어지지 않게 처리한다
let processedCards = [];
let clickFlag;

let startTime;

const colorLists = [
  'red',
  'red',
  'orange',
  'orange',
  'green',
  'green',
  'yellow',
  'yellow',
  'pink',
  'pink',
  'purple',
  'purple',
];

let colorBackupArray = colorLists.slice();

let color = [];

// 카드를 섞는 함수
function shuffleCard() {
  for (let i = 0; colorBackupArray.length > 0; i += 1) {
    // 겹치지 않게 랜덤으로 색상을 뽑아내 배열을 만든다
    // concat로 랜덤한 색이 붙은 새 배열을 만들어서 기존 배열에 넣어준다
    color = color.concat(
      colorBackupArray.splice(
        Math.floor(Math.random() * colorBackupArray.length),
        1
      )
    );
  }
}

// 게임 시작시 모든 카드를 보여주는 함수
function startShowCard(cardArray) {
  // 카드를 순서대로 보여주기
  cardArray.forEach(function (card, index) {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 50 * index);

    // 3초후 모든 카드 뒤집기
    setTimeout(() => {
      card.classList.remove('flipped');
      clickFlag = true;
      startTime = new Date();
    }, 3000);
  });
}

// 카드 HTML, CSS, 클릭이벤트를 셋팅해주는 함수
function settingCard(row, column) {
  // 카드 세팅중 클릭이벤트 방지
  clickFlag = false;
  for (let i = 0; i < row * column; i++) {
    const card = document.createElement('article');
    const cardInner = document.createElement('div');
    const cardFront = document.createElement('section');
    const cardBack = document.createElement('section');

    // 새 Element에 class 부여
    card.className = 'card';
    cardInner.className = 'card-inner';
    cardFront.className = 'card-front';
    cardBack.className = 'card-back';

    // 카드 뒷면에 색상 부여
    cardBack.style.backgroundColor = color[i];

    // Element 조립하기
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    document.querySelector('#main-container').appendChild(card);

    // 카드 하나하나에 클릭이벤트 부여
    card.addEventListener('click', () => {
      // 선택한 카드가 processedCard배열에 없을시
      if (clickFlag && !processedCards.includes(card)) {
        card.classList.toggle('flipped');
        focusCard.push(card);
        // console.log(focusCard);

        // 포커스된 카드가 2개일 경우
        if (focusCard.length == 2) {
          let firstBack = focusCard[0].querySelector('.card-back');
          let secondBack = focusCard[1].querySelector('.card-back');

          // 두 카드의 색이 같을시
          if (
            firstBack.style.backgroundColor == secondBack.style.backgroundColor
          ) {
            // 같은 카드를 두번 골랐을 시
            if (focusCard[0] == focusCard[1]) {
              focusCard = [];
              return;
            }
            // 완료 배열에 넣어주기
            processedCards.push(focusCard[0]);
            processedCards.push(focusCard[1]);
            // 카드 비워주기
            focusCard = [];

            // 모든 카드가 짝맞추어졌을 때
            if (processedCards.length == row * column) {
              const endTime = new Date();
              // 게임이 끝난 시간 측정
              const currentTime = (endTime - startTime) / 1000;
              document.getElementById(
                'game-time'
              ).innerHTML = `${currentTime}초`;
              backgroundFilter.classList.add('active');

              const retryBtn = document.getElementById('re-try');

              // 다시하기를 눌렀을 시
              retryBtn.addEventListener('click', function (e) {
                backgroundFilter.classList.remove('active');
                // HTML 초기화
                document.querySelector('#main-container').innerHTML = '';
                // 배열 초기화
                colorBackupArray = colorLists.slice();
                color = [];
                processedCards = [];
                
                // 게임 재시작
                shuffleCard();
                settingCard(row, column);
              });
            }

            // 두 카드의 색이 다를시
          } else {
            // 클릭 이벤트 잠깐 방지
            clickFlag = false;
            setTimeout(function () {
              // 카드를 다시 뒤집을 수 있게 하기
              focusCard[0].classList.remove('flipped');
              focusCard[1].classList.remove('flipped');
              // 포커스 카드 비워주기
              focusCard = [];
              clickFlag = true;
            }, 1000);
          }
        }
      }
    });
  }

  // 셋팅된 카드들
  const cards = document.querySelectorAll('.card');
  startShowCard(cards);
}

shuffleCard();
settingCard(row, column);
