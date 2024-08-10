import { API_ENDPOINT } from '../utils/constants';

export const getAllProjects = () => {
  console.log('API_ENDPOINT', API_ENDPOINT)
  return fetch(`${API_ENDPOINT}/projects`, {
    method: 'GET',
  }).then(r => r.json())
}

export const getProjectForUser = (userId) => {

  return fetch(`${API_ENDPOINT}/projects/${userId}`, {
    method: 'GET',
  }).then(r => r.json())
}

export const updateDonation = (projectId, amount) => {

  return fetch(`${API_ENDPOINT}/projects/${projectId}/donate`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      amount
    })
  }).then(r => r.json())
}

export const createProject = (data) => {

  return fetch(`${API_ENDPOINT}/projects/create`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(r => r.json())
}