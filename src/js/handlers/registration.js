import { createUser, loginUser } from '../api/user';

document.querySelector('.signUp').addEventListener('click', async () => {
   
  
  const login = document.querySelector('.login');
  const password = document.querySelector('.password');
  const codeWord = document.querySelector('.codeWord');

  const user = { login: login.value, password: password.value, codeWord: codeWord.value } 

  const createdUser = await createUser(user);
  console.log(createdUser);

  
  if (!createdUser) {
    UIkit.notification({
      message: 'Произошла ошибка',
      status: 'danger',
      pos: 'top-center',
    });
  }
    
  else {
    localStorage.setItem('user', user.id);
     window.location.href = 'moviesSimple.html';
  }

});