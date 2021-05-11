import { getAllStats, getMaxStats, getMinStats } from '../api/stats';

window.addEventListener("load", async ()=>{
  const stats = await getAllStats();

  const statsMax = await getMaxStats();

  const statsMin = await getMinStats();

  
  statsMax[0].forEach(stat => {
    const tbody = document.querySelector('.maxtable')
    const tr = document.createElement('tr');
    tr.insertAdjacentHTML(
      'afterbegin',
      `<td>${stat.name}</td>
      <td>${stat.genre}</td>
      <td>${stat.avgrate}</td>`
    );
    tbody.append(tr);
  });
  statsMin[0].forEach(stat => {
    const tbody = document.querySelector('.mintable')
    const tr = document.createElement('tr');
    tr.insertAdjacentHTML(
      'afterbegin',
      `<td>${stat.name}</td>
      <td>${stat.genre}</td>
      <td>${stat.avgrate}</td>`
    );
    tbody.append(tr);
  });
  stats[0].forEach(stat => {
    const tbody = document.querySelector('tbody')
    const tr = document.createElement('tr');
    tr.insertAdjacentHTML(
      'afterbegin',
      `<td>${stat.genre}</td>
      <td>${stat.name}</td>
      <td>${stat.rate}</td>`
    );
    tbody.append(tr);
  });
});

