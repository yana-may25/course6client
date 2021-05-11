import { SERVER_URL } from '../constants/request';

export async function sendRequest(methodRequest, urlRequest, objectBody = null) {
  try {
    const params = {
      method: methodRequest,
      headers: {
        'Access-Control-Allow-Origin': `${SERVER_URL}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    if (objectBody) {
      params.body = JSON.stringify(objectBody);
    }

    console.log(`${SERVER_URL}${urlRequest}`);
    const rawResponse = await fetch(`${SERVER_URL}${urlRequest}`, params);

    if (rawResponse.status === 404 || rawResponse.status === 401) {
      return null;
    }

    return rawResponse.json();
  } catch (error) {
    return error;
  }
}

export default sendRequest;
