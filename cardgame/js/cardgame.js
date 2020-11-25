const row = 4;
const column = 3;
const mainContainer = document.getElementById('main-container');

function settingCard(row, column) {
  // Element 생성
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
