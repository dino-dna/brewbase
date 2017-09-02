# BEERBOIII

### API setup
Some things you may want to do before anything else. And by may, I mean
definitely:

- Run `bundle install` to install required dependencies
- Create a "`beerbase_dev`" database on your local postgres installation
- Create a `.env` file in the `api/` folder and add a postgres connection string like so: `DATABASE_URL=postgres://ur_1337_username@localhost:5432/beerbase_dev`
- Run `rake db:migrate` to run all necessary migrations
