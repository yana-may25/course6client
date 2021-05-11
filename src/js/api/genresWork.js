import { ERROR_MSG } from '../authorization/constants';
import { getMistakeResponse, getGenre } from '../utils/helpers';
import { BACKEND_URL } from '../utils/constants';

async function createGenre(event) {
  event.preventDefault();
  const genre = getGenre();
  const rawResponse = await fetch(`${BACKEND_URL}/genres`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(genre),
  });

  if (!rawResponse.ok) {
    ERROR_MSG.innerText = getMistakeResponse(rawResponse.status);
  } else {
    ERROR_MSG.innerText = 'Регистрация прошла успешно';
  }
}
export { createGenre };
