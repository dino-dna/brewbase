# BrewBase

_🍻 A database for your brew._

## API setup

Some things you may want to do before anything else. And by may, I mean
definitely:

- Run `bundle install` to install required dependencies
- Create a "`beerbase_dev`" database on your local postgres installation
- Create a `.env` file in the `api/` folder and add a postgres connection string like so: `DATABASE_URL=postgres://ur_1337_username@localhost:5432/beerbase_dev`
- Run `rake db:migrate` to run all necessary migrations

## Client

The client is powered by [React Native](https://facebook.github.io/react-native/).

### Setup

1. Make sure [Node.js](https://nodejs.org/en/download/) version 6 or greater is installed ([nvm](https://github.com/creationix/nvm) recommended for managing Node.js versions in development).
2. react-native isn't compatible with `npm@5`. Make sure `npm@4` is installed:

    ```shell
    $ npm install -g npm@4.6.1
    ```
3. Install client dependencies:

    ```shell
    $ cd client
    $ npm install
    ```

### Development

To develop, change directories to `client` and start a simulator:

```shell
$ npm run ios # (Mac only, requires Xcode)
$ npm run android (Requires Android build tools)
```

You can also start the development server separately:

```shell
$ npm start
```

