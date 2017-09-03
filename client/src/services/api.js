/* global fetch */

const API_BASE = 'http://localhost:3000';

const api = {
  login({ login, password }) {
    return fetch(
      `${API_BASE}/login`,
      {
        body: JSON.stringify({ login, password }),
        method: 'POST',
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error creating account: ${response.statusText}`);
        }

        return response.json();
      });
  },

  signup({ login, password }) {
    return fetch(
      `${API_BASE}/create-account`,
      {
        body: JSON.stringify({ login, password }),
        method: 'POST',
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error signing up: ${response.statusText}`);
        }

        return response.json();
      });
  },
};

export default api;
