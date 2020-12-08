document.querySelector('#exec').addEventListener('click', function (e) {
  // 가로줄, 세로줄, 지뢰 값 가져오기
  const hor = parseInt(document.querySelector('#hor').value);
  const ver = parseInt(document.querySelector('#ver').value);
  const mine = parseInt(document.querySelector('#mine').value);

  console.log(hor, ver, mine);

  // table tag 특성상 세로줄(tr) 먼저 만들고
  // 세로줄(tr) 안에 가로줄(td)를 넣는다
  //   for (let i = 0; i < ver; i++) {
  //     console.log(i);
  //   }
});
