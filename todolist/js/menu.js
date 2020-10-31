// 버튼 가져오기
const menuOpenBtn = document.getElementById('menu-ham-btn');
const menuCloseBtn = document.getElementById('menu-close-btn');

// sidemenu 가져오기
const sideMenu = document.getElementById('side-menu');

// menu 햄버거 버튼 눌렀을 시 class 추가
function menuOpenBtnClickHandler() {
  sideMenu.classList.add('active');
}

// menu 닫기 버튼 눌렀을 시 class 제거
function menuCloseBtnClickHandler() {
  sideMenu.classList.remove('active');
}

menuOpenBtn.addEventListener('click', menuOpenBtnClickHandler);
menuCloseBtn.addEventListener('click', menuCloseBtnClickHandler);
