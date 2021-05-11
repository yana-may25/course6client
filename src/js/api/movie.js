import { sendRequest } from './request';


export const createMovie = (movie) => {
  return sendRequest('POST', '/movies', movie);
};

export const getAllMovies = () => {
  return sendRequest('GET', '/movies');
};

export const deleteMovies = () => {
  console.log(localStorage.getItem('del'));
  return sendRequest('GET', '/movies/delete/' + localStorage.getItem('del'));
};

export const sortMovies = () => {
  return sendRequest('GET', '/movies/sort');
};


export const getIndStats = () => {
  return sendRequest('GET', '/movies/indstat/' + localStorage.getItem('user'));
};

export const getIndTableStats = () => {
  return sendRequest('GET', '/movies/indstattable/' + localStorage.getItem('user'));
};