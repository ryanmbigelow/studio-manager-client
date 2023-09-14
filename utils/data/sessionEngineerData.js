import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getEngineersBySessionId = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sessions/${id}/get_engineers`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createSessionEngineer = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/session_engineers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response)
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSessionEngineer = (engineerId, sessionId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/session_engineers/${engineerId}?session_id=${sessionId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  createSessionEngineer, deleteSessionEngineer, getEngineersBySessionId,
};
