import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getAllSessions = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sessions`, {
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

const getSessionsByUserId = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sessions?engineer_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

const getSingleSession = (sessionId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sessions/${sessionId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createSession = (session) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(session),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateSession = (session) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sessions/${session.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(session),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSession = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sessions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getAllSessions,
  getSessionsByUserId,
  getSingleSession,
  createSession,
  updateSession,
  deleteSession,
};
