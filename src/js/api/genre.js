import { sendRequest } from './request';

export const getAllGenres = () => {
  return sendRequest('GET', '/genres');
};

export const createGenre = (genre) => {
  return sendRequest('POST', '/genres', genre);
};


