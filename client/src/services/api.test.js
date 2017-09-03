import last from 'lodash/last';

import api from './api';

describe('API service', () => {
  const email = 'super@user.net';
  const errorStatus = 500;
  const errorStatusText = 'Internal errorzzz';
  const json = {};
  const password = 'secretsss';

  const getErrorResponse = () => () => Promise.resolve({
    ok: false,
    status: errorStatus,
    statusText: errorStatusText,
  });

  beforeAll(() => {
    global.fetch = jest
      .fn(() => Promise.resolve({
        ok: true,
        json() {
          return json;
        },
      }));
  });

  afterAll(() => {
    delete global.fetch;
  });

  describe('login', () => {
    test('error', () => {
      global.fetch.mockImplementationOnce(getErrorResponse());

      expect.assertions(2);

      return api.login({
        login: email,
        password,
      })
        .catch((error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toMatch(new RegExp(errorStatusText));
        });
    });

    test('success', () => {
      expect.assertions(4);

      return api.login({
        login: email,
        password,
      })
        .then((response) => {
          const [url, { body, method }] = last(global.fetch.mock.calls);

          expect(method).toBe('POST');
          expect(url).toMatch(/\/login$/);
          expect(JSON.parse(body)).toEqual({
            login: email,
            password,
          });
          expect(response).toBe(json);
        });
    });
  });

  describe('signup', () => {
    test('error', () => {
      global.fetch.mockImplementationOnce(getErrorResponse());

      expect.assertions(2);

      return api.signup({
        login: email,
        password,
      })
        .catch((error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toMatch(new RegExp(errorStatusText));
        });
    });

    test('success', () => {
      expect.assertions(4);

      return api.signup({
        login: email,
        password,
      })
        .then((response) => {
          const [url, { body, method }] = last(global.fetch.mock.calls);

          expect(url).toMatch(/\/create-account$/);
          expect(JSON.parse(body)).toEqual({
            login: email,
            password,
          });
          expect(method).toBe('POST');
          expect(response).toBe(json);
        });
    });
  });
});
