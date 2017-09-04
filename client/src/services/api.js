/* global fetch,Headers */
import forEach from 'lodash/forEach';

const API_BASE = 'http://localhost:3000/api';

const api = {
  /**
   * Get a formatted URL.
   * @private
   *
   * @param {string} route
   * @returns {string}
   */
  getURL(route) {
    return `${API_BASE}/${route.replace(/^\/?(.*)/, '$1')}`;
  },

  /**
   * Do a request.
   * @private
   *
   * @param {Object} options
   * @param {Object} [options.data] Request payload
   * @param {Object} [options.headers] Request headers
   * @param {string} options.method HTTP method
   * @param {string} options.route API URL route
   * @returns {Promise<Object,Error>}
   */
  request({
    data,
    headers: headerParams,
    method,
    route,
  }) {
    const headers = new Headers();

    forEach(headerParams, (value, key) => {
      headers.append(key, value);
    });

    const options = {
      headers,
      method,
    };

    if (data) {
      headers.append('Content-Type', 'application/json');
      options.body = JSON.stringify(data);
    }

    return fetch(api.getURL(route), options)
      .then(response => Promise.all([response, response.json()]))
      .then(([response, json]) => {
        const formattedResponse = {
          data: json,
          headers: Array.from(response.headers.entries()).reduce(
            (memo, [key, value]) => {
              memo[key] = value; // eslint-disable-line no-param-reassign
              return memo;
            },
            {}
          ),
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        };

        if (!response.ok) {
          let message = `Error requesting ${response.url}: `;

          if (json.error) {
            message += json.error;
          } else if (response.statusText) {
            message += response.statusText;
          } else {
            message += response.status;
          }

          const error = new Error(message);
          error.response = formattedResponse;
          throw error;
        }

        return formattedResponse;
      });
  },

  login({ email, password }) {
    return api.request({
      data: {
        login: email,
        password,
      },
      method: 'POST',
      route: '/login',
    });
  },

  signup({ email, password }) {
    return api.request({
      data: {
        login: email,
        password,
      },
      method: 'POST',
      route: '/create-account',
    });
  },
};

export default api;
