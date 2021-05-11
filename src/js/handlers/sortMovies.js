import { sortMovies } from '../api/movie';
import { createRating, getAllRatings, updateRating } from '../api/rating';
import { createUserMovie, getAllUserMovies } from '../api/userMovie';
import { getAllGenres } from '../api/genre';


window.addEventListener("load", async ()=>{

  const genres = await getAllGenres();
  const list = document.querySelector('select');
  genres.forEach(genre => {
    list.insertAdjacentHTML(
      'beforeend',
     `<option value=${genre.genre}>${genre.genre}</option>`
    );
  });
 
  const movies = await sortMovies();

  const comments = await getAllUserMovies();

  const ratings = await getAllRatings();

  movies[0].forEach(movie => {
    var arr = [];
    let rateSum = 0;
    let thisUserRating = 0;
    ratings.forEach(rating => {

      if(Number(rating.idmovie)===movie.idmovie){
        arr.push(rating.rate);
        rateSum+=rating.rate;
        if(rating.iduser===Number(localStorage.getItem('user'))){
          thisUserRating=rating.rate;
        }
      }
    })  

    let avgRate = rateSum/arr.length;


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
            <p class="uk-label uk-label-default">Рейтинг: </p>
            <span data-avgRating> ${avgRate} </span>
        </div>
        <div>
            <div class="uk-card-body">
                <h3><a class="uk-link-heading" 
                href="#">
                ${movie.movieName}</a></h3>
                <p>${movie.description}</p>
                <form>
                <div class="uk-margin">
                <span class="uk-label uk-label-default" data-rating=${movie.idmovie}>Ваша оценка: ${thisUserRating} </span>
                <select data-ratingForm="${movie.idmovie}" class="uk-select uk-form-width-xsmall uk-margin-left">
                <option></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </div>
        <button type="button" class="uk-button uk-button-default uk-margin-medium-left
        uk-margin-small-top " data-ratingButton="${movie.idmovie}">Подтвердить</button>
        </form>
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
           uk-margin-small-top " data-commentButton="${movie.idmovie}" >Добавить</button>
        </div>`    
    );

    container.append(card);

    const commentsBlock = document.querySelector(`ul[data-id="${movie.idmovie}"] .content`);

    document.querySelector(`button[data-commentButton="${movie.idmovie}"]`).addEventListener('click', async () => {
      const commentArea = document.querySelector(`textarea[data-area="${movie.idmovie}"]`);
      const newComment = {idmovie: movie.idmovie, iduser: Number(localStorage.getItem('user')),
       rate: 5, comment: commentArea.value}
      const comment = await createUserMovie(newComment);
      commentsBlock.insertAdjacentHTML( 'beforeend', 
      `<article class="uk-comment uk-comment-primary">
      <div class="uk-comment-body uk-margin">
      <p>${newComment.comment}</p>
     </div>
     </article>`)
      if (comment) {
        UIkit.notification({
          message: 'Ваш отзыв добавлен!',
          status: 'success',
          pos: 'top-center',
        });

      }
      else {
       // window.location.href = 'movies.html';
      }
    },

    document.querySelector(`button[data-ratingButton="${movie.idmovie}"]`).addEventListener('click', async () => {
      const ratingOption = document.querySelector(`select[data-ratingForm="${movie.idmovie}"]`);
      if(thisUserRating){
        const newRating = {idmovie: movie.idmovie, iduser: Number(localStorage.getItem('user')), rate: Number(ratingOption.value)}
        const updatedRating = await updateRating(newRating);
        const rateEl = document.querySelector(`span[data-rating="${movie.idmovie}"]`);
        rateEl.innerText = `Ваша оценка: ${newRating.rate}`;
        console.log(updatedRating);
        if (updatedRating) {
          UIkit.notification({
            message: 'Ваша оценка к фильму изменена!',
            status: 'success',
            pos: 'top-center',
          });
        }
        else {
         // window.location.href = 'movies.html';
        }
      }
      else{
        const newRating = {idmovie: movie.idmovie, iduser: Number(localStorage.getItem('user')), rate: Number(ratingOption.value)}
        const addedRating = await createRating(newRating);
        const rateEl = document.querySelector(`span[data-rating="${movie.idmovie}"]`);
        rateEl.innerText = `Ваша оценка: ${newRating.rate}`;
        if (addedRating) {
          UIkit.notification({
            message: 'Ваша оценка к фильму добавлена!',
            status: 'success',
            pos: 'top-center',
          });
        }
        else {
         // window.location.href = 'movies.html';
        }
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
    })
  ))

})
});

document.querySelector('.filter').addEventListener('click', async () => {

  const genre = document.querySelector('.genre');
  localStorage.setItem('genre', genre.value);
  window.location.href = 'filterMovies.html';

})

document.querySelector('.searchButton').addEventListener('click', async () => {

  const search = document.querySelector('.searchField');
  localStorage.setItem('searchMovie', search.value);
  window.location.href = 'searchMovies.html';

})
