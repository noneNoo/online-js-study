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
}

settingCard(row, column);
