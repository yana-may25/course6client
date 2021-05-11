import { createUser, loginUser } from '../api/user';


export const authUser = async() => {
  const login = document.querySelector('.login');
  const password = document.querySelector('.password');
 
  console.log(login.value, password.value);

  const user = await loginUser(login.value, password.value);
  if (!user) {
    UIkit.notification({
      message: 'Неверный логин или пароль',
      status: 'danger',
      pos: 'top-center',
    });
  }
  else {
    if(user.isAdmin){
    localStorage.setItem('user', user.id);
   // Number(localStorage.getItem('user'));
    window.location.href = 'menu.html';}
    else{
      localStorage.setItem('user', user.id);

    window.location.href = 'moviesSimple.html';
  //  Number(localStorage.getItem('user'));
}
  }
};

document.querySelector('.logIn').addEventListener('click', authUser);

document.querySelector('.goToSignUp').addEventListener('click',  () => {
  window.location.href = 'registration.html';
});

document.querySelector('.forgotPass').addEventListener('click',()  => {
  window.location.href = 'resetPassword.html';
});


// document.querySelector('.forgotPass').addEventListener('click', async () => {
//   // window.location.href = 'register.html';
  
//   const login = document.querySelector('.login');
//   const password = document.querySelector('.password');

//   const user = { login: login.value, password: password.value } 

//   const createdUser = await createUser(user);

  
//   if (!createdUser) {
//     UIkit.notification({
//       message: 'Произошла ошибка',
//       status: 'danger',
//       pos: 'top-center',
//     });
//   }
//   else {
//     window.location.href = 'user_table.html';
//   }

// });