import { createMovie, deleteMovies, getAllMovies } from '../api/movie';
import { getAllGenres } from '../api/genre';
import { createUserMovie, getAllUserMovies } from '../api/userMovie';


document.querySelector('.addMovie').addEventListener('click', async () => {
  
  const movieName = document.querySelector('.movieName');
  const year = document.querySelector('.year');
  const country = document.querySelector('.country');
  const genre = document.querySelector('.genre');
  const actor1 = document.querySelector('.actor1');
  const actor2 = document.querySelector('.actor2');
  const picture = document.querySelector('.picture');
  const description = document.querySelector('.description');


  const movie = { movieName: movieName.value, year: year.value,
     country: country.value, genre: genre.value,
  actor1: actor1.value, actor2: actor2.value,
   picture: picture.value, description: description.value} 
  const createdMovie = await createMovie(movie);

  
    window.location.href = 'movies.html';
  

});


document.querySelector('.delMovie').addEventListener('click', async () => {
  const movieName = document.querySelector('.selectMovies');
  localStorage.setItem('del', movieName.value);

  const createdMovie = await deleteMovies();

    window.location.href = 'movies.html';

});


window.addEventListener("load", async ()=>{
  const genres = await getAllGenres();
  const list = document.querySelector('select');
  const list1 = document.querySelector('.selectMovies');

  genres.forEach(genre => {
    list.insertAdjacentHTML(
      'afterbegin',
     `<option value=${genre.genre}>${genre.genre}</option>`
    );
  });

  const movies = await getAllMovies();

  const comments = await getAllUserMovies();
  console.log(comments);

  movies.forEach(movie => {
    list1.insertAdjacentHTML(
      'afterbegin',
     `<option value=${movie.movieName}>${movie.movieName}</option>`
    );

    const container = document.querySelector('.container')
    const card = document.createElement('div');
    card.classList.add('film');
    card.insertAdjacentHTML(
      'afterbegin',
     `<div class="uk-card uk-card-default uk-grid-collapse 
     uk-child-width-1-2@s uk-margin uk-grid" >
        <div class="uk-card-body uk-card-media-top uk-cover-container 
        uk-margin data-accordion">
            
              <img src="${movie.picture} " alt="">
             <p>Год выпуска: ${movie.year}</p>
            <p>Жанр: ${movie.genre}</p>
            <p>В главных ролях: ${movie.actor1}, ${movie.actor2}</p>
        </div>
        <div>
            <div class="uk-card-body">
                <h3><a class="uk-link-heading" 
                href="http://localhost:8080/movies/${movie.idmovie}.html">
                ${movie.movieName}</a></h3>
                <p>${movie.description}</p>
            </div>
        </div>
      </div>
      <ul uk-accordion data-id="${movie.idmovie}">
        <li>
          <h3 class="uk-accordion-title uk-margin-medium-left">Посмотреть комментарии</h3>
          <div class="uk-accordion-content content"></div>
        <li>
      </ul>
        <div class="uk-margin" >
          <textarea class="uk-textarea uk-margin-medium-left uk-width-3-4"
           placeholder="Добавьте комментарий"  data-area="${movie.idmovie}"></textarea>
          <button type="button" class="uk-button uk-button-default uk-margin-medium-left
           uk-margin-small-top " data-button="${movie.idmovie}" >Добавить</button>
        </div>`    
    );

    container.append(card);

    const commentsBlock = document.querySelector(`ul[data-id="${movie.idmovie}"] .content`);

    document.querySelector(`button[data-button="${movie.idmovie}"]`).addEventListener('click', async () => {
      const commentArea = document.querySelector(`textarea[data-area="${movie.idmovie}"]`);
      const comment = await createUserMovie(movie.idmovie, Number(localStorage.getItem('user')), 5, commentArea.value);
      console.log(comment);
      if (!comment) {
        UIkit.notification({
          message: 'Incorrect login or password',
          status: 'danger',
          pos: 'top-center',
        });
      }
      else {
       // window.location.href = 'movies.html';
      }


    },
   
    comments.forEach((comment) => {
      if (comment.idmovie === movie.idmovie) {
        commentsBlock.insertAdjacentHTML(
          'beforeend', 
           `<article class="uk-comment uk-comment-primary">
           <div class="uk-comment-body uk-margin">
           <p>${comment.comment}</p>
          </div>
          </article>`
        );
      }
    }))
  }
  );
});


