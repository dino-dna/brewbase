/* global fetch,Headers */

const API_BASE = 'http://localhost:3000';

const api = {
  login({ login, password }) {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return fetch(
      `${API_BASE}/login`,
      {
        body: JSON.stringify({ login, password }),
        headers,
        method: 'POST',
      }
    )
      .then(response => Promise.all([response, response.json()]))
      .then(([response, json]) => {
        if (!response.ok) {
          // TODO: Test error branching
          if (json.error) {
            throw new Error(json.error);
          } else if (response.statusText) {
            throw new Error(`Login error: ${response.statusText}`);
          } else {
            throw new Error(`Login error: ${response.status}`);
          }
        }

        return json;
      });
  },

  signup({ login, password }) {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return fetch(
      `${API_BASE}/create-account`,
      {
        body: JSON.stringify({ login, password }),
        headers,
        method: 'POST',
      }
    )
      .then(response => Promise.all([response, response.json()]))
      .then(([response, json]) => {
        if (!response.ok) {
          if (json.error) {
            throw new Error(json.error);
          } else if (response.statusText) {
            throw new Error(`Signup error: ${response.statusText}`);
          } else {
            throw new Error(`Signup error: ${response.status}`);
          }
        }

        return json;
      });
  },
};

export default api;
