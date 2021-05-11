import { sendRequest } from './request';


export const createUserMovie = (userMovie) => {
  console.log(userMovie);
  return sendRequest('POST', '/usermovies', userMovie);
};

export const getAllUserMovies = () => {
  return sendRequest('GET', '/usermovies');
};

