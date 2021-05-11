import { getAllUsers } from '../api/user';
import { createUser } from '../api/user';


window.addEventListener("load", async ()=>{
  const users = await getAllUsers();
  console.log(users);

  users.forEach(user => {
    const tbody = document.querySelector('tbody')
    const tr = document.createElement('tr');
    tr.insertAdjacentHTML(
      'afterbegin',
      `<td>${user.login}</td>
      <td>${user.isAdmin ? 'Да' : 'Нет'}</td>`
    );
    tbody.append(tr);
  });
});

document.querySelector('.addAdmin').addEventListener('click', async () => {
  
  const login = document.querySelector('.login');
  const password = document.querySelector('.password');
  const codeWord = document.querySelector('.codeWord');

  const user = { login: login.value, password: password.value, isAdmin: true, codeWord: codeWord.value} 

  const createdUser = await createUser(user);
  
  if (!createdUser) {
    UIkit.notification({
      message: 'Произошла ошибка',
      status: 'danger',
      pos: 'top-center',
    });
  }
  else {
    window.location.href = 'user_table.html';
  }

});
