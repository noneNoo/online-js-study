document.querySelector('#exec').addEventListener('click', function (e) {
  // 가로줄, 세로줄, 지뢰 값 가져오기
  const hor = parseInt(document.querySelector('#hor').value);
  const ver = parseInt(document.querySelector('#ver').value);
  const mine = parseInt(document.querySelector('#mine').value);

  const tbody = document.querySelector('#table tbody');

  console.log(hor, ver, mine);

  let dataset = [];

  // 2차원 배열로 dataset 만들기
  // table tag 특성상 세로줄(tr) 먼저 만들고
  // 세로줄(tr) 안에 가로줄(td)를 넣는다
  for (let i = 0; i < ver; i++) {
    let arr = [];
    // tr 태그 생성
    const tr = document.createElement('tr');
    dataset.push(arr);
    for (let i = 0; i < hor; i++) {
      arr.push(1);
      const td = document.createElement('td');
      tr.appendChild(td);
      td.textContent = 1;
    }
    tbody.appendChild(tr);
  }
  console.log(dataset);
});
