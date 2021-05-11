import { createGenre} from '../api/genre';

document.querySelector('.addGenre').addEventListener('click', async () => {
  
  const genreName = document.querySelector('.genre');
  console.log(genreName);

  const genre = { genre: genreName.value } 
  const createdGenre = await createGenre(genre);
  console.log(createdGenre);
  if (!createdGenre) {
    UIkit.notification({
      message: 'Произошла ошибка',
      status: 'danger',
      pos: 'top-center',
    });
  }
  else {
    // window.location.href = 'register.html';
  }

});




