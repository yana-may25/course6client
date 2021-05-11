import { createUser, updateUser } from '../api/user';

document.querySelector('.resetPass').addEventListener('click', async()  => 
{
  const login = document.querySelector('.login');
  const password = document.querySelector('.password');
  const codeWord = document.querySelector('.codeWord');

  const user = (login.value, password.value, codeWord.value)
  console.log(login.value);
  console.log(user);

  const createdUser = await updateUser(login.value,  codeWord.value , password.value);
  
      window.location.href = 'moviesSimple.html';
  

});


