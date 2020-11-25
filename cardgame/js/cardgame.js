const row = 4;
const column = 3;
const mainContainer = document.getElementById('main-container');

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

let color = [];

for (let i = 0; colorLists.length > 0; i += 1) {
  // 겹치지 않게 랜덤으로 색상을 뽑아내 배열을 만든다
  // concat로 새로운 배열 만들어서 기존 배열에 넣어준다
  color = color.concat(
    colorLists.splice(Math.floor(Math.random() * colorLists.length), 1)
  );
}
console.log(color);

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
    }, 3000);
  });
}

function settingCard(row, column) {
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
    mainContainer.appendChild(card);

    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  }

  // 셋팅된 카드들
  const cards = document.querySelectorAll('.card');
  startShowCard(cards);
}

settingCard(row, column);
