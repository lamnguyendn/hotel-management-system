import HttpClient from './httpClient';

let instance: HttpClient | null = null;

export const getApiClient = (): HttpClient => {
  if (instance === null) {
    instance = new HttpClient({
      baseURL: process.env.REACT_APP_API_URL,
      responseType: 'json',
      withCredentials: true,
    });
  }

  return instance;
};
