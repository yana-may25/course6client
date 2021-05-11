import { sendRequest } from './request';


export const createRating = (rating) => {
  console.log(rating);
  return sendRequest('POST', '/rating', rating);
};

export const getAllRatings = () => {
  return sendRequest('GET', '/rating');
};

export const updateRating = async (newRating) => {
  const newRate = await sendRequest('POST', '/rating/update', newRating);

  return newRate;
};