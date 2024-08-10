import { API_ENDPOINT } from '../utils/constants';

export const signUpUser = (data) => {
  const req = {
    email: data.email,
    fullname: data.fullname,
    role: 'innovator',
    password: data.password
  };

  return fetch(`${API_ENDPOINT}/user/create`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(req)
  }).then(r => r.json())
}

export const loginUser = (data) => {
  const req = {
    email: data.email,
    password: data.password
  };

  return fetch(`${API_ENDPOINT}/user/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(req)
  }).then(r => r.json())
}