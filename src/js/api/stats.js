import { sendRequest } from './request';


export const getAllStats = () => {
  return sendRequest('GET', '/stats');
};

export const getMaxStats = () => {
  return sendRequest('GET', '/stats/max');
};

export const getMinStats = () => {
  return sendRequest('GET', '/stats/min');
};

