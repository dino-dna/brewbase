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
2. Make sure [Yarn is installed](https://yarnpkg.com/en/docs/install).
3. Install client dependencies:

    ```shell
    $ cd client
    $ yarn
    ```

### Development

To develop, change directories to `client` and start a simulator:

```shell
$ yarn run ios # (Mac only, requires Xcode)
$ yarn run android (Requires Android build tools)
```

You can also start the development server separately:

```shell
$ yarn start
```

