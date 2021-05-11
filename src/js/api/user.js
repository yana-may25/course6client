import { sendRequest } from './request';

export const getAllUsers = () => {
  return sendRequest('GET', '/users');
};

export const createUser = (user) => {
  return sendRequest('POST', '/users', user);
};

export const loginUser = async (login, password) => {
    const user = await sendRequest('POST', '/login', {
        login, 
        password,
    });

    return user;
};

// my
export const updateUser = async (login,  codeWord, password) => {
  const user = await sendRequest('POST', '/users/update', {
      login, 
      codeWord,
      password,

  });

  return user;
};