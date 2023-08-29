import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getAllEngineers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/engineers`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleEngineer = (engineerId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/engineers/${engineerId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createEngineer = (engineer) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/engineers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(engineer),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateEngineer = (engineer) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/engineers/${engineer.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(engineer),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteEngineer = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/engineers/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getAllEngineers,
  getSingleEngineer,
  createEngineer,
  updateEngineer,
  deleteEngineer,
};
