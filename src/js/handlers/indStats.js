import { getIndStats, getIndTableStats } from '../api/movie';

window.addEventListener("load", async ()=>{
  const statsTable = await getIndTableStats();
  const total = await getIndStats();

  console.log(total[0][0].count1);
  const p = document.querySelector('p')
  p.insertAdjacentText(
    'beforeend',
    `${total[0][0].count1}`
  );

  statsTable[0].forEach(stat => {
    const tbody = document.querySelector('tbody')
    const tr = document.createElement('tr');
    tr.insertAdjacentHTML(
      'afterbegin',
      `<td>${stat.genre}</td>
      <td>${stat.count}</td>
      <td>${stat.avgrate}</td>`
    );
    tbody.append(tr);
  });

  
});

